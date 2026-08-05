import { Container, type Filter, RenderLayer } from "pixi.js";
import { type SetRequired } from "type-fest";

import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import { roomItemsIterable } from "../../../model/RoomState";
import { zxSpectrumColor } from "../../../originalGame";
import { audioCtx } from "../../../sound/audioCtx";
import { soundsFadeDurationSec } from "../../../sound/soundUtils/stopWithFade";
import { defaultUserSettings } from "../../../store/slices/userSettings/defaultUserSettings";
import { Graph } from "../../../utils/graph/Graph";
import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../../utils/vectors/vectors";
import {
  type SceneGraphPhaseRecorder,
  type SceneGraphSubPhase,
} from "../../mainLoop/frameTiming/FrameTimingStats";
import { isSpatial } from "../../physics/itemPredicates";
import { PaletteSwapFilter } from "../filters/PaletteSwapFilter";
import { createItemLeafPixiRenderer } from "../item/itemRender/createItemLeafPixiRenderer";
import {
  createItemRenderer,
  type ItemRenderPipeline,
} from "../item/itemRender/createItemRenderer";
import { type DecorateItemMaybeRenderer } from "../item/itemRender/DecorateItemRenderer";
import { type ItemTickContext, type ItemZGraph } from "../ItemRenderContexts";
import {
  makeItemRenderBoxAtCameraAngle,
  type RenderBox,
  type RenderBoxes,
} from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { DrawOrderBroadPhase } from "../sortZ/DrawOrderBroadPhase";
import { participatesInDrawOrder } from "../sortZ/fixedZIndexes";
import { updateZEdges } from "../sortZ/updateZEdges";
import { type SoundAndGraphicsOutput } from "../SoundAndGraphicsOutput";
import { type DecorateRoomRenderer } from "./DecorateRoomRenderer";
import {
  type RoomRenderContext,
  type RoomTickContext,
} from "./RoomRenderContexts";
import { type RoomRendererType } from "./RoomRendererType";

/** shared, keyed filters that item renderers/appearances stash and reuse */
export type FilterCache = Map<string, Filter>;

/**
 * report the time since the previous sub-phase boundary to the timing
 * record, and return the new boundary time. Only called while the fps
 * display is on (the tick context carries no recorder otherwise)
 */
const recordPerf = (
  timingRecord: SceneGraphPhaseRecorder,
  subPhase: SceneGraphSubPhase,
  /** the previous boundary: when this sub-phase started */
  subPhaseStartMs: number,
): number => {
  const now = performance.now();
  timingRecord.recordSceneGraphSubPhase(subPhase, now - subPhaseStartMs);
  return now;
};

export class RoomRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements RoomRendererType<RoomId, RoomItemId> {
  static itemDecorators: DecorateItemMaybeRenderer[][] = [];
  static roomDecorators: DecorateRoomRenderer[][] = [];

  #destroyed = false;

  /**
   * renders all items *except* the room edge, since the floor edge is the only
   * item that is colourised differently when colourisation is turned off
   */
  #itemsContainer: Container = new Container({
    label: "items",
    // items can be skipped if not visible - gives a small performance boost
    // on scenes with lots of items and scrolling
    cullableChildren: true,
  });
  /**
   * render into this layer to simulate zxs colour clash; only needed
   * when not colourised
   */
  #colourClashLayer: RenderLayer | undefined;

  /**
   * render into this layer to appear over everything, even the room occlusion
   */
  #frontLayer: RenderLayer = Object.assign(
    new RenderLayer({
      sortableChildren: false,
    }),
    { label: "frontLayer" },
  );

  public readonly output: SetRequired<SoundAndGraphicsOutput, "graphics">;
  /**
   * the roomTime when the renderer was last rendered - this can be useful when things
   * happen in sub-ticks, to know if they are relevant to the current render (ie if
   * they happened since the last render) */
  #lastRenderRoomTime: number | undefined = undefined;
  /**
   * the room's progression count as of the last render (undefined before the
   * first): items stamped after it have moved/resized/entered since this
   * renderer last saw them
   */
  #renderedOnProgression: number | undefined = undefined;
  /**
   * Holder for the z-graph, maintained as an attribute to avoid malloc, updated in-place
   */
  #zEdges: ItemZGraph<RoomId, RoomItemId> = new Graph();

  #itemRenderers: Map<
    // keying by the item, not the item's id because ids are only guaranteed to be unique at a given
    // time, but a new item with the same id could be added on the frame after one was removed,
    // they should not be treated like the same object
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    ItemRenderPipeline<ItemInPlayType>
  > = new Map();

  /**
   * every spatial item's render box at this renderer's nearest-quarter-camera
   * angle. Most items have none and render true to their physical aabb: they
   * are stored with an explicit `undefined`, so `has` still says which items
   * have been derived for this angle while `get` gives readers the one answer
   */
  #renderBoxes = new Map<
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    RenderBox | undefined
  >();

  /**
   * see {@link ItemLeafRenderContext.filterCache}: shared keyed filters for
   * this room's item renderers. Survives between ticks, filters must be sharable
   * between renderers, ie renderers should not change properties on filters such
   * as .enabled or this would impact other renderers, probably unintentionally
   */
  #filterCache: FilterCache = new Map();

  /**
   * processes our per-frame screen projections and the
   * decides the overlapping candidate pairs for edges in the z-graph
   */
  #broadPhase: DrawOrderBroadPhase<
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>
  >;

  readonly renderContext: RoomRenderContext<RoomId, RoomItemId>;

  constructor(renderContext: RoomRenderContext<RoomId, RoomItemId>) {
    this.renderContext = renderContext;
    this.#appliedQuarterAngle = nearestQuarterAngle(
      renderContext.general.cameraAngle,
    );
    // the broad phase projects at the continuous angle passed each tick;
    // only its participation angle is per-quarter (set on a quarter flip):
    this.#broadPhase = new DrawOrderBroadPhase<
      UnionOfAllItemInPlayTypes<RoomId, RoomItemId>
    >(this.#appliedQuarterAngle);
    const {
      general: { spriteOption, soundSettings },
      room,
    } = renderContext;

    const mute = soundSettings.mute ?? defaultUserSettings.soundSettings.mute;

    const soundOutput: AudioNode | undefined =
      mute ? undefined : audioCtx.createGain();

    this.output = {
      sound: soundOutput,
      graphics: new Container({
        label: `RoomRenderer(${renderContext.room.id})`,
      }),
    };

    this.output.graphics.addChild(this.#itemsContainer);
    if (spriteOption.uncolourised) {
      this.#colourClashLayer = Object.assign(
        new RenderLayer({
          sortableChildren: false,
        }),
        { label: "colourClashLayer" },
      );
      this.output.graphics.addChild(this.#colourClashLayer);
    }
    // layer in front of all else - for floating text, etc
    this.output.graphics.addChild(this.#frontLayer);

    if (spriteOption.uncolourised) {
      this.#itemsContainer.tint = zxSpectrumColor(room.color);
    }
  }

  /**
   * this renderer's per-angle render boxes, read-only - lets consumers of the
   * rendering (eg editor pointer picking) see the same drawn extents the
   * renderer sorts and draws with
   */
  get renderBoxes(): RenderBoxes<
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>
  > {
    return this.#renderBoxes;
  }

  #getItemRenderPipeline = (item: UnionOfAllItemInPlayTypes) => {
    return this.#itemRenderers.get(
      item as UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    );
  };

  /**
   * the quarter angle this renderer's per-angle structures were last built
   * for. When {@link nearestQuarterAngle} of the render angle flips away from
   * it mid-rotation (the midpoint of a rotation, or an instant angle
   * change), {@link #changeCameraAngle} rebuilds those structures IN PLACE
   * instead of the renderer being destroyed and rebuilt
   */
  #appliedQuarterAngle: Xy;

  /**
   * switch this renderer to a new discrete camera angle IN PLACE. Everything
   * per-angle resets; item renderers survive and react to the changed angle
   * on their next tick, re-rendering only what resolves differently.
   * Runs at the very top of {@link tick}, before
   * any item ticks, so the rebuilt sort/masks are in place before warp
   * snapshots re-bake
   */
  #changeCameraQuarterAngle(cameraQuarterAngle: Xy) {
    this.#appliedQuarterAngle = cameraQuarterAngle;

    // clear render boxes to be rebuilt:
    this.#renderBoxes.clear();

    // draw-order participation is per-quarter-angle; the projections and the
    // z-graph rebuild themselves from scratch every tick regardless:
    this.#broadPhase.setQuarterAngle(cameraQuarterAngle);
  }

  /**
   * bring #renderBoxes into step with the room's current spatial items:
   * derive for items that have appeared, evict items that have gone. Boxes
   * are fixed per (item, angle) and the map is cleared wholesale on angle
   * change, so membership is the only upkeep.
   *
   * @returns whether any item entered or left - the progression count cannot
   * say, since a departing item stamps nothing on its way out
   */
  #reconcileRenderBoxes(
    spatialItems: ReadonlySet<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
  ): boolean {
    let membershipChanged = false;
    for (const item of this.#renderBoxes.keys()) {
      if (!spatialItems.has(item)) {
        this.#renderBoxes.delete(item);
        membershipChanged = true;
      }
    }
    const { spritesheetMeta } = this.renderContext.general;
    const cameraQuarterAngle = this.#appliedQuarterAngle;
    for (const item of spatialItems) {
      if (!this.#renderBoxes.has(item)) {
        this.#renderBoxes.set(
          item,
          makeItemRenderBoxAtCameraAngle(
            item,
            cameraQuarterAngle,
            spritesheetMeta,
          ),
        );
        membershipChanged = true;
      }
    }
    return membershipChanged;
  }

  #tickItem(
    itemTickContext: ItemTickContext,
    item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ) {
    let itemRenderer = this.#itemRenderers.get(item);

    if (itemRenderer === undefined) {
      // have never ticked this item before - either first tick in the room or item was introduced to the
      // room since the last tick
      itemRenderer = createItemRenderer(
        {
          ...this.renderContext,
          colourClashLayer: this.#colourClashLayer,
          frontLayer: this.#frontLayer,
          item,
          zEdges: this.#zEdges,
          getItemRenderPipeline: this.#getItemRenderPipeline,
          createItemLeafPixiRenderer,
          renderBoxes: this.#renderBoxes,
          filterCache: this.#filterCache,
          isReflection: false,
        },
        RoomRenderer.itemDecorators,
      );

      this.#itemRenderers.set(item, itemRenderer);

      const { graphics, sound } = itemRenderer.top.output;

      if (graphics) {
        // item has a visual presence:
        this.#itemsContainer.addChild(graphics);
        if (item.fixedZIndex) {
          graphics.zIndex = item.fixedZIndex;
        }
      }

      if (sound) {
        if (!this.output.sound) {
          throw new Error(
            "item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted",
          );
        }
        // item has a sound presence:
        sound.connect(this.output.sound);
      }
    }
    try {
      itemRenderer.top.tick(itemTickContext);
    } catch (e) {
      throw new Error(
        `RoomRenderer: error while ticking item "${item.id}"\nin room "${this.renderContext.room.id}"\nitem in play object is:
           \n${JSON.stringify(item, null, 2)}`,
        { cause: e },
      );
    }
  }

  /** the items ticked so far this tick - cleared at the start of each */
  #tickedItems = new Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>();

  /**
   * tick one item, but only after recursing into the fronts of its broken
   * edges: a back item bakes those fronts' renderings into its cyclic masks,
   * so they have to be up to date first, or it captures their containers to a
   * texture before they update.
   *
   * An instance field rather than a local closure so it is created once, not
   * per tick, and the tick context rides through the graph's iterator as an
   * opaque value so nothing needs capturing.
   */
  #tickBrokenFirst = (
    item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    itemTickContext: ItemTickContext,
  ) => {
    if (this.#tickedItems.has(item)) {
      // already ticked (or on the recursion path right now), nothing to do
      return;
    }
    // marked BEFORE recursing into broken edge fronts, so a cycle among the
    // broken edges themselves terminates:
    this.#tickedItems.add(item);
    this.#zEdges.forEachBrokenEdgeFrom(
      item,
      itemTickContext,
      this.#tickBrokenFirst,
    );
    this.#tickItem(itemTickContext, item);
  };

  #tickItems(roomTickContext: RoomTickContext, cameraAngleChanged: boolean) {
    const { room } = this.renderContext;

    const itemTickContext: ItemTickContext = {
      ...roomTickContext,
      lastRenderRoomTime: this.#lastRenderRoomTime,
      renderedOnProgression: this.#renderedOnProgression,
      cameraAngleChanged,
    };

    this.#tickedItems.clear();
    for (const item of roomItemsIterable(room.items)) {
      this.#tickBrokenFirst(item, itemTickContext);
    }

    // remove any renderers for items that no longer exist in the room:
    let destroyedItemRenderers = false;
    for (const [item, itemRenderer] of this.#itemRenderers.entries()) {
      if (room.items[item.id] !== item) {
        // item no longer in the room
        itemRenderer.top.destroy();
        this.#itemRenderers.delete(item);
        destroyedItemRenderers = true;
      }
    }

    if (destroyedItemRenderers) {
      this.#sanitiseRenderLayers();
    }
  }

  /**
   * prevent crashes in pixi.js engine by making sure render layers are empty after item
   * renderers are destroyed
   */
  #sanitiseRenderLayers() {
    if (this.#colourClashLayer) {
      // removing an item renderer could have removed from the scene graph something that is
      // in a render layer
      for (const c of this.#colourClashLayer.renderLayerChildren) {
        if (c.parent === null) {
          // c is not in the scene graph, remove from render layer too:
          this.#colourClashLayer.detach(c);
        }
      }
    }
    // removing an item renderer could have removed from the scene graph something that is
    // in a render layer
    for (const c of this.#frontLayer.renderLayerChildren) {
      if (c.parent === null) {
        // c is not in the scene graph, remove from render layer too:
        this.#frontLayer.detach(c);
      }
    }
  }

  #tickItemsZIndex(order: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>[]) {
    for (let i = 0; i < order.length; i++) {
      const item = order[i];
      const itemRenderer = this.#itemRenderers.get(item);
      if (itemRenderer === undefined) {
        throw new Error(
          `Item id=${item.id} does not have a renderer - cannot assign a z-index`,
        );
      }

      if (!participatesInDrawOrder(item, this.#appliedQuarterAngle)) {
        // non-rendering items (static fixed-z items, plus walls hidden at this
        // angle - whose appearance declines, leaving an empty container) are
        // never draw-order sorted, so must not receive a z-index. They are
        // still in the sort's node set (spatialItems), so skip them here.
        // Participation is quarter-quantised (isWallDirectionHiddenAtAngle
        // assumes a quarter angle), so use the applied quarter, not the
        // continuous camera angle which sweeps mid-transition:
        continue;
      }

      const graphicsOutput = itemRenderer.top.output.graphics;
      if (!graphicsOutput) {
        // a participating item can still legitimately produce no graphics (eg an
        // item whose renderer has only sibling shadow renderers): nothing to
        // receive a z-index, so skip it:
        continue;
      }

      graphicsOutput.zIndex = i;
    }
  }

  get #everRendered() {
    return this.#lastRenderRoomTime !== undefined;
  }

  tick(givenTickContext: RoomTickContext) {
    // detect the mid-rotation quarter flip FIRST, before any item ticks:
    // the rebuilt sort/masks must be in place before warp snapshots re-bake
    const { cameraAngle } = this.renderContext.general;
    const quarterAngle = nearestQuarterAngle(cameraAngle);
    if (quarterAngle !== this.#appliedQuarterAngle) {
      this.#changeCameraQuarterAngle(quarterAngle);
    }

    // the sort geometry follows the continuous camera angle θ; when it
    // changes (every frame of a camera transition) every item re-projects
    // and the whole graph re-derives - a trigger physics knows nothing
    // about, so the renderer raises it itself. A fresh broad phase (first
    // render) has NaN geometry, so always reads as changed here:
    const geometryAngleChanged =
      cameraAngle.x !== this.#broadPhase.geometryAngle.x ||
      cameraAngle.y !== this.#broadPhase.geometryAngle.y;

    const {
      renderContext: { room },
    } = this;

    const spatialItems = new Set(
      roomItemsIterable(room.items).filter(isSpatial),
    );

    const { timingRecord } = givenTickContext;
    let subPhaseStartMs = timingRecord === undefined ? 0 : performance.now();

    // derive render boxes for newly-present items before the broad phase
    // (re)projects, since projection reads the boxes:
    const membershipChanged = this.#reconcileRenderBoxes(spatialItems);

    if (timingRecord !== undefined) {
      subPhaseStartMs = recordPerf(
        timingRecord,
        "reconcileRenderBoxes",
        subPhaseStartMs,
      );
    }

    // bring the broad phase fully up to date (membership, and every item's
    // projection at the continuous render angle) before computing z-edges
    // from it:
    this.#broadPhase.updateManyItems(
      spatialItems,
      this.#renderBoxes,
      cameraAngle,
    );

    if (timingRecord !== undefined) {
      subPhaseStartMs = recordPerf(
        timingRecord,
        "updateBroadPhase",
        subPhaseStartMs,
      );
    }

    try {
      // it it important that we sort before rendering. This is because sorting updates
      // the broken links, which will be used in this.#tickItems to update the rendering,
      // which can be influenced by the broken links (by showing masking)
      updateZEdges(
        spatialItems,
        this.#broadPhase,
        // rebuilt in place (same instance, reused buffers) so the item
        // render contexts sharing it by reference stay current:
        this.#zEdges,
        this.#renderBoxes,
      );
    } catch (e) {
      throw new Error(
        `error updating Z edges in room "${this.renderContext.room.id}"`,
        { cause: e },
      );
    }

    if (timingRecord !== undefined) {
      subPhaseStartMs = recordPerf(
        timingRecord,
        "updateZEdges",
        subPhaseStartMs,
      );
    }

    // spatialItems (room-item order) is the graph's canonical node order, so
    // ties between unconstrained items - and which edge of a cycle is broken
    // - are a pure function of the room state, never of movement history:
    const order = this.#zEdges.topologicalSortInPlace();

    if (timingRecord !== undefined) {
      subPhaseStartMs = recordPerf(timingRecord, "toposort", subPhaseStartMs);
    }

    if (!this.#everRendered) {
      // these only get to render once (never tick again)
      for (const group of RoomRenderer.roomDecorators) {
        for (const decorator of group) {
          const container = decorator(this.renderContext);
          if (container) {
            this.output.graphics.addChild(container);
          }
        }
      }
      if (timingRecord !== undefined) {
        // one-off decorator construction is not part of any sub-phase: reset
        // the boundary so it doesn't inflate the first frame's tickItems
        subPhaseStartMs = performance.now();
      }
    }

    this.#tickItems(givenTickContext, geometryAngleChanged);

    if (timingRecord !== undefined) {
      recordPerf(timingRecord, "tickItems", subPhaseStartMs);
    }

    if (
      !this.#everRendered ||
      // anything moved/resized/entered since the last render:
      this.#renderedOnProgression !== room.progression ||
      // items leaving put nothing on the progression count:
      membershipChanged ||
      // mid-turn the θ projections shift the whole order every frame:
      geometryAngleChanged
    ) {
      this.#tickItemsZIndex(order);
    }

    this.#renderedOnProgression = room.progression;
    this.#lastRenderRoomTime = this.renderContext.room.roomTime;
  }

  destroy() {
    this.output.graphics.label = this.output.graphics.label + "DESTROYED";
    this.output.graphics.destroy({ children: true });
    const { sound } = this.output;
    if (sound) {
      const soundsFadeDurationMs = soundsFadeDurationSec * 1_000;
      setTimeout(() => {
        sound.disconnect();
      }, soundsFadeDurationMs);
    }
    this.#itemRenderers.forEach((itemRenderer) => {
      itemRenderer.top.destroy();
    });
    for (const filter of this.#filterCache.values()) {
      if (filter instanceof PaletteSwapFilter) {
        filter.destroy({ destroyLutTexture: true });
      } else {
        filter.destroy();
      }
    }
    this.#filterCache.clear();
    this.#destroyed = true;
  }

  get destroyed() {
    return this.#destroyed;
  }
}
