import { Container } from "pixi.js";
import { type WritableDeep } from "type-fest";

import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { roomSpatialIndexKey } from "../../../../model/RoomState";
import { type Xy } from "../../../../utils/vectors/vectors";
import {
  type CollideableItem,
  collisionItemWithIndex,
} from "../../../collision/aabbCollision";
import { isItemType } from "../../../physics/itemPredicates";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { ItemAppearancePixiRenderer } from "../../item/itemRender/ItemAppearancePixiRenderer";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { projectWorldXyzToScreenX } from "../../projections";
import { type ItemAppearanceOutsideView } from "../itemAppearanceOutsideView";

/**
 * how the mirror looks up other items' appearances to draw their
 * reflections - injected by appearanceForItem to avoid a circular import
 */
export type AppearanceLookup = (
  item: UnionOfAllItemInPlayTypes<string, string>,
) => ItemAppearanceOutsideView<ItemInPlayType> | undefined;

/**
 * the x/y footprint searched (via the room's spatial index) for items that
 * might reflect, before the precise per-item filtering. Its far (xmax/ymax)
 * corner is aligned to the mirror's back corner, so it reaches towards the
 * camera where reflections appear; its z spans the mirror's full height. Tune
 * freely.
 */
const reflectionSearchSize: Xy = {
  x: 2 * blockSizePx.x,
  y: 2 * blockSizePx.y,
};

/** reusable pseudo-item for the index search, to avoid per-frame allocation */
const reflectionSearchBuffer: WritableDeep<CollideableItem> = {
  id: "mirrorReflectionSearch",
  state: { position: { x: 0, y: 0, z: 0 } },
  aabb: { x: 0, y: 0, z: 0 },
};

/**
 * x+y (the axis normal to a 45° mirror) of how far into the mirror item the
 * reflection happens. 0 means to actually project as if the mirror were on the
 * near corner - technically incorrect, but looks better in-game
 */
const reflectingPlaneInNormal = 0;

/**
 * reflections are projected at this fraction of the item's true depth, so they
 * sit on the small glass and slide gently off it rather than flying across
 */
const reflectionDepthCondense = 0.5;

/**
 * items that never show in reflections: room structure, invisible/utility
 * items, and other mirrors (so two facing mirrors cannot recurse)
 */
const isUnreflectedItemType = isItemType(
  "floor",
  "wall",
  "doorFrame",
  "doorLegs",
  "portal",
  "stopAutowalk",
  "blocker",
  "particle",
  "soundEffect",
  "outOfBounds",
  "emitter",
  "timer",
  "floatingText",
  "bubbles",
  "mirror",
  "lightBeam",
);

const isReflectedItemType = (item: UnionOfAllItemInPlayTypes<string, string>) =>
  !isUnreflectedItemType(item);

type ReflectionRenderer = ItemAppearancePixiRenderer<
  ItemInPlayType,
  object,
  Container
>;

/**
 * a reflected item's renderer plus the tick count it was last seen reflected on,
 * so departed items can be swept (mark-and-sweep) without a parallel set
 */
type ReflectionEntry = {
  renderer: ReflectionRenderer;
  lastSeenTick: number;
};

/**
 * the live appearance renderers for the items currently showing in a mirror's
 * reflection, keyed by the reflected item object (not its id, so an item
 * replaced by a new object with the same id gets a fresh renderer). Kept across
 * ticks (in the mirror's render props) so each reflected item has a stateful
 * renderer that animates and reuses its rendering between frames, rather than
 * being rebuilt from scratch. Each reflected item draws its real self with
 * `isReflection: true`, so the appearance flips its own facing and uses the
 * reflection spritesheet.
 */
export class ReflectionRenderers {
  /** the (masked) container holding every reflected item's rendered output */
  readonly container = new Container({
    label: "reflections",
    sortableChildren: true,
  });
  readonly #reflectedItemRenderers = new Map<
    UnionOfAllItemInPlayTypes<string, string>,
    ReflectionEntry
  >();
  /**
   * a monotonic per-tick counter; each entry is stamped with it when seen, so
   * the post-pass can drop entries not seen this tick (mark-and-sweep)
   */
  #tickCount = 0;
  readonly #mirror: ItemTypeUnion<"mirror", string, string>;
  readonly #renderContext: ItemRenderContext<"mirror">;
  readonly #appearanceLookup: AppearanceLookup;

  constructor(
    mirror: ItemTypeUnion<"mirror", string, string>,
    renderContext: ItemRenderContext<"mirror">,
    appearanceLookup: AppearanceLookup,
  ) {
    this.#mirror = mirror;
    this.#renderContext = renderContext;
    this.#appearanceLookup = appearanceLookup;
  }

  #removeReflectedItem(
    item: UnionOfAllItemInPlayTypes<string, string>,
    renderer: ReflectionRenderer,
  ) {
    renderer.destroy();
    this.container.removeChild(renderer.output);
    this.#reflectedItemRenderers.delete(item);
  }

  /**
   * find the items in front of the (face-on) pane via the room's spatial index
   * and reconcile the per-item renderers with them - creating renderers for
   * newly-arrived items, dropping departed ones - then tick and presentationally
   * place each. Collection and reconciliation share a single pass, so no
   * per-frame list of reflected items is allocated.
   */
  tick(tickContext: ItemTickContext) {
    const mirror = this.#mirror;
    const {
      state: { position: mirrorPosition },
      config: { times },
    } = mirror;

    const timesZ = times?.z ?? 1;
    // search further for taller mirrors
    const searchSizeX = reflectionSearchSize.x * timesZ;
    const searchSizeY = reflectionSearchSize.y * timesZ;

    // search only items overlapping a box in front of the mirror, via the
    // spatial index, rather than scanning every item in the room. The box's far
    // (xmax, ymax) corner is the mirror's own back corner, so it reaches towards
    // the camera, and it spans the mirror's full height - collisionItemWithIndex
    // does the precise x/y/z overlap:
    reflectionSearchBuffer.state.position.x =
      mirrorPosition.x + mirror.aabb.x - searchSizeX;
    reflectionSearchBuffer.state.position.y =
      mirrorPosition.y + mirror.aabb.y - searchSizeY;
    reflectionSearchBuffer.state.position.z = mirrorPosition.z;
    reflectionSearchBuffer.aabb.x = searchSizeX;
    reflectionSearchBuffer.aabb.y = searchSizeY;
    reflectionSearchBuffer.aabb.z = mirror.aabb.z;

    // the mirror's own extent on screen-x (iso screen-x = y - x), used to skip
    // items whose projection has no screen-x overlap with it - their reflection
    // would fall entirely off the glass:
    const mirrorScreenXMin = projectWorldXyzToScreenX({
      x: mirrorPosition.x + mirror.aabb.x,
      y: mirrorPosition.y,
    });
    const mirrorScreenXMax = projectWorldXyzToScreenX({
      x: mirrorPosition.x,
      y: mirrorPosition.y + mirror.aabb.y,
    });

    // stamp every entry seen this tick with this count, so the sweep below can
    // drop entries not seen this tick (mark-and-sweep, no parallel set):
    const thisTick = ++this.#tickCount;

    for (const item of collisionItemWithIndex(
      reflectionSearchBuffer,
      this.#renderContext.room[roomSpatialIndexKey],
      isReflectedItemType,
    )) {
      const itemPosition = item.state.position;

      // skip items that project entirely to one side of the mirror on screen-x:
      const itemScreenXMin = projectWorldXyzToScreenX({
        x: itemPosition.x + item.aabb.x,
        y: itemPosition.y,
      });
      const itemScreenXMax = projectWorldXyzToScreenX({
        x: itemPosition.x,
        y: itemPosition.y + item.aabb.y,
      });
      if (
        itemScreenXMax <= mirrorScreenXMin ||
        itemScreenXMin >= mirrorScreenXMax
      ) {
        continue;
      }

      let entry = this.#reflectedItemRenderers.get(item);
      if (entry === undefined) {
        // create a new renderer for the reflection:
        const appearance = this.#appearanceLookup(item);
        if (appearance === undefined) {
          throw new Error(`no appearance for reflected item "${item.id}"`);
        }
        const renderer = new ItemAppearancePixiRenderer(
          {
            ...this.#renderContext,
            item,
            isReflection: true,
          },
          appearance,
        );
        entry = { renderer, lastSeenTick: thisTick };
        this.#reflectedItemRenderers.set(item, entry);
        this.container.addChild(renderer.output);
      } else {
        // update the existing renderer for the reflection:
        entry.lastSeenTick = thisTick;
      }
      const { renderer } = entry;
      try {
        renderer.tick(tickContext);
      } catch (cause) {
        throw new Error("failed to render reflected item", { cause });
      }

      /*
       * place the reflection by projecting the item as its mirror image behind
       * the mirror's reflecting plane
       */
      const posRelativeToMirrorX = itemPosition.x - mirrorPosition.x;
      const posRelativeToMirrorY = itemPosition.y - mirrorPosition.y;
      const posRelativeToMirrorZ = itemPosition.z - mirrorPosition.z;

      // how far in front of the mirror we are on a normal to the plane, √ of this would be the true distance
      const manhattanDistanceNormalToMirrorPos =
        reflectingPlaneInNormal - (posRelativeToMirrorX + posRelativeToMirrorY);

      const manhattanDistanceNormalToReflectingPlane =
        reflectingPlaneInNormal +
        reflectionDepthCondense * manhattanDistanceNormalToMirrorPos;

      const { output } = renderer;
      output.x = projectWorldXyzToScreenX({
        x: posRelativeToMirrorX,
        y: posRelativeToMirrorY,
      });
      output.y =
        -manhattanDistanceNormalToReflectingPlane / 2 - posRelativeToMirrorZ;
      // simpler version of the 'in front of' relationshipo
      output.zIndex = -manhattanDistanceNormalToReflectingPlane;
    }

    // remove no longer reflected items:
    for (const [item, entry] of this.#reflectedItemRenderers) {
      if (entry.lastSeenTick !== thisTick) {
        this.#removeReflectedItem(item, entry.renderer);
      }
    }
  }
}
