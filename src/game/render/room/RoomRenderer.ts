import { Container, RenderLayer } from "pixi.js";
import { type SetRequired } from "type-fest";

import {
  type ItemInPlayType,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import {
  roomItemsIterable,
  roomSpatialIndexKey,
} from "../../../model/RoomState";
import { zxSpectrumColor } from "../../../originalGame";
import { audioCtx } from "../../../sound/audioCtx";
import { soundsFadeDurationSec } from "../../../sound/soundUtils/stopWithFade";
import { defaultUserSettings } from "../../../store/slices/userSettings/defaultUserSettings";
import { isSpatial } from "../../physics/itemPredicates";
import {
  createItemRenderer,
  type ItemRenderPipeline,
} from "../item/itemRender/createItemRenderer";
import { type DecorateItemMaybeRenderer } from "../item/itemRender/DecorateItemRenderer";
import { type ItemTickContext, type ItemZGraph } from "../ItemRenderContexts";
import { toposort } from "../sortZ/toposort/toposort";
import { updateZEdges } from "../sortZ/updateZEdges";
import { type SoundAndGraphicsOutput } from "../SoundAndGraphicsOutput";
import { type DecorateRoomRenderer } from "./DecorateRoomRenderer";
import {
  type RoomRenderContext,
  type RoomTickContext,
} from "./RoomRenderContexts";
import { type RoomRendererType } from "./RoomRendererType";

export class RoomRenderer<RoomId extends string, RoomItemId extends string>
  implements RoomRendererType<RoomId, RoomItemId>
{
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
   * render into this layer to appear over everything, event the room occlusion
   */
  #frontLayer: RenderLayer = new RenderLayer({
    sortableChildren: false,
  });

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

  readonly renderContext: RoomRenderContext<RoomId, RoomItemId>;

  constructor(renderContext: RoomRenderContext<RoomId, RoomItemId>) {
    this.renderContext = renderContext;
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
      this.#colourClashLayer = new RenderLayer({
        sortableChildren: false,
      });
      this.output.graphics.addChild(this.#colourClashLayer);
    }
    // layer in front of all else - for floating text, etc
    this.output.graphics.addChild(this.#frontLayer);

    if (spriteOption.uncolourised) {
      this.#itemsContainer.tint = zxSpectrumColor(room.color);
    }
  }

  #getItemRenderPipeline = (item: UnionOfAllItemInPlayTypes) => {
    return this.#itemRenderers.get(
      item as UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    );
  };

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

      const graphicsOutput = itemRenderer.top.output.graphics;
      if (!graphicsOutput) {
        throw new Error(
          `order ${item.id} was given a z-order by sorting, but item has no graphics`,
        );
      }

      graphicsOutput!.zIndex = i;
    }
  }

  get #everRendered() {
    return this.#lastRenderRoomTime !== undefined;
  }

  tick(givenTickContext: RoomTickContext<RoomId, RoomItemId>) {
    /*
     * the given tick context, except override to consider everything to
     * have moved if this is the first rendering
     */
    const tickContext =
      this.#everRendered ? givenTickContext : (
        {
          ...givenTickContext,
          // if we have never rendered before, consider that all items have moved:
          movedOrResizedItems: new Set(
            roomItemsIterable(this.renderContext.room.items).filter(isSpatial),
          ),
        }
      );

    const {
      renderContext: { room },
    } = this;

    const itemsSet = new Set(roomItemsIterable(room.items).filter(isSpatial));

    try {
      // it it important that we sort before rendering. This is because sorting updates
      // this.#brokenLinks, which will be used in this.#tickItems to update the rendering,
      // which can be influenced by the broken links (by showing masking)
      updateZEdges(
        itemsSet,
        room[roomSpatialIndexKey],
        tickContext.movedOrResizedItems,
        // this.#incrementalZEdges will be updated in-place by the zEdges function to match
        // the current ordering state of the room, starting from the previous ordering state
        this.#zEdges,
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

    const order = toposort(this.#zEdges);

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
    }

    this.#tickItems(tickContext);

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
      const soundsFadeDurationMs = soundsFadeDurationSec * 1000;
      setTimeout(() => {
        sound.disconnect();
      }, soundsFadeDurationMs);
    }
    this.#itemRenderers.forEach((itemRenderer) => {
      itemRenderer.top.destroy();
    });
    this.#destroyed = true;
  }

  get destroyed() {
    return this.#destroyed;
  }
}
