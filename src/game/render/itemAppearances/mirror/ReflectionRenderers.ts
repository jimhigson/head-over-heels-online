import { Container } from "pixi.js";
import { type WritableDeep } from "type-fest";

import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../../model/ItemInPlay";
import { roomSpatialIndexKey } from "../../../../model/RoomState";
import { nearestQuarterAngle } from "../../../../utils/vectors/cameraAngleVectors";
import { rotateXy } from "../../../../utils/vectors/rotateXy";
import { type Xy } from "../../../../utils/vectors/vectors";
import {
  type CollideableItem,
  collisionItemWithIndex,
} from "../../../collision/aabbCollision";
import { isItemType } from "../../../physics/itemPredicates";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { type ItemLeafPixiRenderer } from "../../item/itemRender/ItemPixiRenderer";
import {
  type ItemLeafTickContext,
  type ItemRenderContext,
} from "../../ItemRenderContexts";
import {
  projectFootprintScreenXExtent,
  projectWorldXyzToScreenXy,
} from "../../projections";
import { nearCornerOffsetWorldXyz } from "../adjustNearCornerForCameraAngle";

/**
 * the x/y reach searched around the mirror (via the room's spatial index) for
 * items that might reflect, before the precise per-item filtering; the search
 * z spans the mirror's full height. Tune freely.
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

type ReflectionRenderer = ItemLeafPixiRenderer<ItemInPlayType>;

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

  constructor(
    mirror: ItemTypeUnion<"mirror", string, string>,
    renderContext: ItemRenderContext<"mirror">,
  ) {
    this.#mirror = mirror;
    this.#renderContext = renderContext;
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
  tick(tickContext: ItemLeafTickContext) {
    const mirror = this.#mirror;
    const {
      state: { position: mirrorPosition },
      config: { times },
    } = mirror;
    const { cameraAngle } = this.#renderContext.general;
    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);

    const timesZ = times?.z ?? 1;
    // search further for taller mirrors
    const searchSizeX = reflectionSearchSize.x * timesZ;
    const searchSizeY = reflectionSearchSize.y * timesZ;

    // search only items overlapping a box around the mirror, via the spatial
    // index, rather than scanning every item in the room. Which world side of
    // the mirror faces the camera depends on the camera angle, so the box
    // covers both sides (the in-front test below drops the behind items); it
    // spans the mirror's full height - collisionItemWithIndex does the precise
    // x/y/z overlap:
    reflectionSearchBuffer.state.position.x = mirrorPosition.x - searchSizeX;
    reflectionSearchBuffer.state.position.y = mirrorPosition.y - searchSizeY;
    reflectionSearchBuffer.state.position.z = mirrorPosition.z;
    reflectionSearchBuffer.aabb.x = mirror.aabb.x + 2 * searchSizeX;
    reflectionSearchBuffer.aabb.y = mirror.aabb.y + 2 * searchSizeY;
    reflectionSearchBuffer.aabb.z = mirror.aabb.z;

    // the mirror's own extent on screen-x, used to skip items whose projection
    // has no screen-x overlap with it - their reflection would fall entirely
    // off the glass:
    const { left: mirrorScreenXMin, right: mirrorScreenXMax } =
      projectFootprintScreenXExtent(
        mirrorPosition,
        mirror.aabb,
        cameraQuarterAngle,
      );

    // the mirror's camera-near corner - the reflecting plane passes through it
    // (as it does at the base angle, where it is the mirror's origin), and the
    // mirror's near-corner container offset (which wraps this reflections
    // container) is subtracted back out of the placements below:
    const mirrorNearCornerWorld = nearCornerOffsetWorldXyz(
      mirror,
      cameraQuarterAngle,
    );
    const mirrorNearCornerCam = rotateXy(
      mirrorNearCornerWorld,
      cameraQuarterAngle,
    );
    const mirrorNearCornerOffset = projectWorldXyzToScreenXy(
      mirrorNearCornerWorld,
      cameraQuarterAngle,
    );

    // stamp every entry seen this tick with this count, so the sweep below can
    // drop entries not seen this tick (mark-and-sweep, no parallel set):
    const thisTick = ++this.#tickCount;

    for (const item of collisionItemWithIndex(
      reflectionSearchBuffer,
      this.#renderContext.room[roomSpatialIndexKey],
      isReflectedItemType,
    )) {
      const itemPosition = item.state.position;

      // the reflection maths below is written for the camera-facing (screen
      // face-on) pane; in camera-frame coordinates that pane is always the
      // awayRight diagonal, whichever world orientation it is:
      const relativeToMirrorCam = rotateXy(
        {
          x: itemPosition.x - mirrorPosition.x,
          y: itemPosition.y - mirrorPosition.y,
        },
        cameraQuarterAngle,
      );

      // how far in front of the reflecting plane (through the mirror's
      // camera-near corner) the item is, on a normal to the plane (√ of this
      // would be the true distance). Items behind the glass don't reflect:
      const manhattanDistanceNormalToMirrorPos =
        reflectingPlaneInNormal +
        (mirrorNearCornerCam.x + mirrorNearCornerCam.y) -
        (relativeToMirrorCam.x + relativeToMirrorCam.y);
      if (manhattanDistanceNormalToMirrorPos < 0) {
        continue;
      }

      // skip items that project entirely to one side of the mirror on screen-x:
      const { left: itemScreenXMin, right: itemScreenXMax } =
        projectFootprintScreenXExtent(
          itemPosition,
          item.aabb,
          cameraQuarterAngle,
        );
      if (
        itemScreenXMax <= mirrorScreenXMin ||
        itemScreenXMin >= mirrorScreenXMax
      ) {
        continue;
      }

      let entry = this.#reflectedItemRenderers.get(item);
      if (entry === undefined) {
        // create a new renderer for the reflection - drawn as its real self with
        // `isReflection: true`, so it flips its facing and uses the reflection
        // spritesheet:
        const renderer = this.#renderContext.createItemLeafPixiRenderer({
          ...this.#renderContext,
          item,
          isReflection: true,
        });
        if (renderer === undefined) {
          throw new Error(`no renderer for reflected item "${item.id}"`);
        }
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
      const posRelativeToMirrorZ = itemPosition.z - mirrorPosition.z;

      const manhattanDistanceNormalToReflectingPlane =
        reflectingPlaneInNormal +
        reflectionDepthCondense * manhattanDistanceNormalToMirrorPos;

      // the real item's art gets the near-corner offset from its position
      // renderer; the reflection renders the appearance without one, so takes
      // the same offset here to keep the reflected art directly above the
      // original:
      const itemNearCornerOffset = projectWorldXyzToScreenXy(
        nearCornerOffsetWorldXyz(item, cameraQuarterAngle),
        cameraQuarterAngle,
      );

      const { output } = renderer;
      // base projection of the camera-frame offset = the camera-aware
      // projection of the world offset:
      output.x =
        relativeToMirrorCam.y -
        relativeToMirrorCam.x +
        itemNearCornerOffset.x -
        mirrorNearCornerOffset.x;
      output.y =
        -manhattanDistanceNormalToReflectingPlane / 2 -
        posRelativeToMirrorZ +
        itemNearCornerOffset.y -
        mirrorNearCornerOffset.y;
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
