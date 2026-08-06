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
import { participatesInDrawOrder } from "../sortZ/fixedZIndexes";
import { toposort } from "../sortZ/toposort/toposort";
import { updateZEdges } from "../sortZ/updateZEdges";
import { VisualIndex } from "../sortZ/VisualIndex";
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
   * store the edges of the behind/front graph between frames so we can incrementally update it
   */
  #zEdges: ItemZGraph<RoomId, RoomItemId> = new Map();

  #itemRenderers: Map<
    // keying by the item, not the item's id because ids are only guaranteed to be unique at a given
    // time, but a new item with the same id could be added on the frame after one was removed,
    // and they should not be treated as the same
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    ItemRenderPipeline<ItemInPlayType>
  > = new Map();

  /**
   * every spatial item's render box at this renderer's camera angle (`null` =
   * deliberately no box - the item renders true to its physical aabb).
   * Reconciled against the room's items each tick; entries never go stale
   * because anything whose physical aabb changes in-life (eg lightBeams)
   * derives null
   */
  #renderBoxes = new Map<
    UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    null | RenderBox
  >();

  /**
   * see {@link ItemLeafRenderContext.filterCache}: shared keyed filters for
   * this room's item renderers. Survives {@link #changeCameraAngle}; every
   * filter in it is destroyed with this renderer
   */
  #filterCache: FilterCache = new Map();

  /** items indexed by their draw position on screen, used for draw-order edge finding */
  #visualIndex: VisualIndex<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>;

  readonly renderContext: RoomRenderContext<RoomId, RoomItemId>;

  constructor(renderContext: RoomRenderContext<RoomId, RoomItemId>) {
    this.renderContext = renderContext;
    this.#appliedQuarterAngle = nearestQuarterAngle(
      renderContext.general.cameraAngle,
    );

    if (import.meta.env.DEV) {
      // share for e2e/agents:
      window.__e2e_zGraph = this.#zEdges;
    }
    // the visual index projects with the camera angle; the quarter-flip
    // check in tick replaces it wholesale, so the angle is fixed for the
    // index's lifetime:
    this.#visualIndex = new VisualIndex<
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
  #changeCameraAngle(cameraQuarterAngle: Xy) {
    this.#appliedQuarterAngle = cameraQuarterAngle;

    // render boxes are per-angle: clear IN PLACE (the same map object is on
    // the item render contexts) and let the next tick's reconcile rederive:
    this.#renderBoxes.clear();

    // projections are per-angle; a fresh index repopulates from the next
    // tick's updateManyItems:
    this.#visualIndex = new VisualIndex(cameraQuarterAngle);

    // the draw-order graph is per-angle; clear IN PLACE (shared with item
    // contexts) and rebuild from the all-moved tick (the caller re-projects
    // every item on the tick it detects the flip):
    this.#zEdges.clear();
  }

  /**
   * bring #renderBoxes into step with the room's current spatial items:
   * derive for items that have appeared, evict items that have gone. Boxes
   * are fixed per (item, angle) and the map is cleared wholesale on angle
   * change, so membership is the only upkeep
   */
  #reconcileRenderBoxes(
    spatialItems: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
  ) {
    for (const item of this.#renderBoxes.keys()) {
      if (!spatialItems.has(item)) {
        this.#renderBoxes.delete(item);
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
          ) ?? null,
        );
      }
    }
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

  #tickItems(roomTickContext: RoomTickContext<RoomId, RoomItemId>) {
    const { room } = this.renderContext;

    const itemTickContext: ItemTickContext = {
      ...roomTickContext,
      lastRenderRoomTime: this.#lastRenderRoomTime,
    };

    type Item = UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;

    const tickedItems = new Set<Item>();

    /*
     * for broken links, the front items
     * have to be ticked first. This is because the back items may use them as
     * a mask, so if they're done second they may capture the front item's
     * container to a texture before it updates
     */
    const tickItemWithGuard = (item: Item) => {
      if (tickedItems.has(item)) {
        // already ticked, nothing to do
        return;
      }
      const edges = this.#zEdges.get(item);
      if (edges) {
        for (const [front, broken] of edges.entries()) {
          if (broken) {
            // tick front first
            tickItemWithGuard(front);
          }
        }
      }
      this.#tickItem(itemTickContext, item);
      tickedItems.add(item);
    };

    for (const item of roomItemsIterable(room.items)) {
      tickItemWithGuard(item);
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

      if (
        !participatesInDrawOrder(item, this.renderContext.general.cameraAngle)
      ) {
        // non-rendering items (static fixed-z items, plus walls hidden at this
        // angle - whose appearance declines, leaving an empty container) are
        // never draw-order sorted, so must not receive a z-index. They are
        // still in the sort's node set (spatialItems), so skip them here:
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

  tick(givenTickContext: RoomTickContext<RoomId, RoomItemId>) {
    // detect the mid-rotation quarter flip FIRST, before any item ticks:
    // the rebuilt sort/masks must be in place before warp snapshots re-bake
    const cameraQuarterAngle = nearestQuarterAngle(
      this.renderContext.general.cameraAngle,
    );
    const angleChanged = cameraQuarterAngle !== this.#appliedQuarterAngle;
    if (angleChanged) {
      this.#changeCameraAngle(cameraQuarterAngle);
    }

    /*
     * the given tick context, except override to consider everything to
     * have moved if this is the first rendering or the camera angle just
     * changed in place (everything re-projects)
     */
    const tickContext =
      this.#everRendered && !angleChanged ?
        givenTickContext
      : {
          ...givenTickContext,
          movedOrResizedItems: new Set(
            roomItemsIterable(this.renderContext.room.items).filter(isSpatial),
          ),
        };

    const {
      renderContext: { room },
    } = this;

    const spatialItems = new Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>(
      roomItemsIterable(room.items).filter(isSpatial),
    );

    const { timingRecord } = tickContext;
    let subPhaseStartMs = timingRecord === undefined ? 0 : performance.now();

    // derive render boxes for newly-present items before the visual index
    // (re)projects, since projection reads the boxes:
    this.#reconcileRenderBoxes(spatialItems);

    if (timingRecord !== undefined) {
      subPhaseStartMs = recordPerf(
        timingRecord,
        "reconcileRenderBoxes",
        subPhaseStartMs,
      );
    }

    // bring the render-position index fully up to date (membership and moved
    // items' projections) before computing z-edges from it:
    this.#visualIndex.updateManyItems(
      spatialItems,
      tickContext.movedOrResizedItems,
      this.#renderBoxes,
    );

    if (timingRecord !== undefined) {
      subPhaseStartMs = recordPerf(
        timingRecord,
        "updateVisualIndex",
        subPhaseStartMs,
      );
    }

    try {
      // it it important that we sort before rendering. This is because sorting updates
      // this.#brokenLinks, which will be used in this.#tickItems to update the rendering,
      // which can be influenced by the broken links (by showing masking)
      updateZEdges(
        spatialItems,
        this.#visualIndex,
        tickContext.movedOrResizedItems,
        // this.#incrementalZEdges will be updated in-place by the zEdges function to match
        // the current ordering state of the room, starting from the previous ordering state
        this.#zEdges,
        this.#renderBoxes,
      );
    } catch (e) {
      throw new Error(
        `error updating Z edges for moved/resized items: ${tickContext.movedOrResizedItems
          .values()
          .map((item) => item.id)
          .toArray()
          .join(", ")}`,
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

    // spatialItems (room-item order) as the canonical tie-break: the same
    // room state always sorts the same, regardless of movement history:
    const order = toposort(this.#zEdges, spatialItems);

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

    this.#tickItems(tickContext);

    if (timingRecord !== undefined) {
      recordPerf(timingRecord, "tickItems", subPhaseStartMs);
    }

    if (!this.#everRendered || tickContext.movedOrResizedItems.size > 0) {
      this.#tickItemsZIndex(order);
    }

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
