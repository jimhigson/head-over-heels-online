import type { IRenderLayer } from "pixi.js";
import type { SetRequired } from "type-fest";

import { Container, RenderLayer } from "pixi.js";

import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlay";
import type { ZxSpectrumRoomColour } from "../../originalGame";
import type { ItemRenderPipeline } from "./item/itemRender/createItemRenderer";
import type { ItemTickContext } from "./ItemRenderContexts";
import type { RoomRenderContext, RoomTickContext } from "./RoomRenderContexts";
import type { RoomRendererType } from "./RoomRendererType";
import type { SoundAndGraphicsOutput } from "./SoundAndGraphicsOutput";

import { iterateRoomItems, roomSpatialIndexKey } from "../../model/RoomState";
import { audioCtx } from "../../sound/audioCtx";
import { defaultUserSettings } from "../../store/slices/gameMenus/defaultUserSettings";
import { zxSpectrumDimmed } from "../../utils/colour/halfBrite";
import { getColorScheme } from "../hintColours";
import { RevertColouriseFilter } from "./filters/RevertColouriseFilter";
import { dimLut, noFilters } from "./filters/standardFilters";
import { createItemRenderer } from "./item/itemRender/createItemRenderer";
import { type ZGraph } from "./sortZ/GraphEdges";
import { toposort } from "./sortZ/toposort/toposort";
import { updateZEdges } from "./sortZ/updateZEdges";

export class RoomRenderer<RoomId extends string, RoomItemId extends string>
  implements RoomRendererType<RoomId, RoomItemId>
{
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
  #colourClashLayer: IRenderLayer | undefined;

  /**
   * render into this layer to appear over everything, event the room occlusion
   */
  #frontLayer: IRenderLayer = new RenderLayer({
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
  #zEdges: ZGraph<RoomItemId> = new Map();

  #itemRenderers: Map<RoomItemId, ItemRenderPipeline<ItemInPlayType>> =
    new Map();

  constructor(
    public readonly renderContext: RoomRenderContext<RoomId, RoomItemId>,
  ) {
    const {
      general: { colourised, soundSettings },
    } = renderContext;

    this.initFilters(colourised, renderContext.room.color);

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
    if (!colourised) {
      this.#colourClashLayer = new RenderLayer({
        sortableChildren: false,
      });
      this.output.graphics.addChild(this.#colourClashLayer);
    }
    // layer in front of all else - for floating text, etc
    this.output.graphics.addChild(this.#frontLayer);
  }

  /**
   * set the top-level filters for the room - either to revert colourisation or leave it in
   * modern-mode
   */
  initFilters(colourise: boolean, colour: ZxSpectrumRoomColour) {
    this.#itemsContainer.filters =
      colourise ?
        colour.shade === "dimmed" ?
          dimLut
        : noFilters
      : new RevertColouriseFilter(
          colour.shade === "dimmed" ?
            zxSpectrumDimmed(getColorScheme(colour).main.original)
          : getColorScheme(colour).main.original,
        );
  }

  #getItemRenderPipeline = (itemId: string) => {
    return this.#itemRenderers.get(itemId as RoomItemId);
  };

  #tickItem(
    itemTickContext: ItemTickContext,
    item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ) {
    let itemRenderer = this.#itemRenderers.get(item.id as RoomItemId);

    if (itemRenderer === undefined) {
      // have never ticked this item before - either first tick in the room or item was introduced to the
      // room since the last tick
      itemRenderer = createItemRenderer({
        ...this.renderContext,
        colourClashLayer: this.#colourClashLayer,
        frontLayer: this.#frontLayer,
        item,
        zEdges: this.#zEdges,
        getItemRenderPipeline: this.#getItemRenderPipeline,
      });

      this.#itemRenderers.set(item.id as RoomItemId, itemRenderer);

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

    const tickedItemIds = new Set<RoomItemId>();

    /*
     * for broken links, the front items
     * have to be ticked first. This is because the back items may use them as
     * a mask, so if they're done second they may capture the front item's
     * container to a texture before it updates
     */
    const tickItemWithGuard = (itemId: RoomItemId) => {
      if (tickedItemIds.has(itemId)) {
        // already ticked, nothing to do
        return;
      }
      const edges = this.#zEdges.get(itemId);
      if (edges) {
        for (const [front, broken] of edges.entries()) {
          if (broken) {
            // tick front first
            tickItemWithGuard(front);
          }
        }
      }
      this.#tickItem(itemTickContext, room.items[itemId]);
      tickedItemIds.add(itemId);
    };

    for (const itemId in room.items) {
      tickItemWithGuard(itemId);
    }

    // remove any renderers for items that no longer exist in the room:
    let destroyedItemRenderers = false;
    for (const [itemId, itemRenderer] of this.#itemRenderers.entries()) {
      if (room.items[itemId] === undefined) {
        itemRenderer.top.destroy();
        this.#itemRenderers.delete(itemId as RoomItemId);
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

  #tickItemsZIndex(order: RoomItemId[]) {
    for (let i = 0; i < order.length; i++) {
      const itemRenderer = this.#itemRenderers.get(order[i] as RoomItemId);
      if (itemRenderer === undefined) {
        throw new Error(
          `Item id=${order[i]} does not have a renderer - cannot assign a z-index`,
        );
      }

      const graphicsOutput = itemRenderer.top.output.graphics;
      if (!graphicsOutput) {
        throw new Error(
          `order ${order[i]} was given a z-order by sorting, but item has no graphics`,
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
          movedItems: new Set(iterateRoomItems(this.renderContext.room.items)),
        }
      );

    const {
      renderContext: { room },
    } = this;

    // it it important that we sort before rendering. This is because sorting updates
    // this.#brokenLinks, which will be used in this.#tickItems to update the rendering,
    // which can be influenced by the broken links (by showing masking)
    updateZEdges<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>, RoomItemId>(
      room.items,
      room[roomSpatialIndexKey],
      tickContext.movedItems,
      // this.#incrementalZEdges will be updated in-place by the zEdges function to match
      // the current ordering state of the room, starting from the previous ordering state
      this.#zEdges,
    );

    const order = toposort(this.#zEdges);

    this.#tickItems(tickContext);

    if (!this.#everRendered || tickContext.movedItems.size > 0) {
      this.#tickItemsZIndex(order);
    }

    this.#lastRenderRoomTime = this.renderContext.room.roomTime;
  }

  destroy() {
    this.output.graphics.label = this.output.graphics.label + "DESTROYED";
    this.output.graphics.destroy({ children: true });
    this.output.sound?.disconnect();
    this.#itemRenderers.forEach((itemRenderer) => {
      itemRenderer.top.destroy();
    });
    this.#destroyed = true;
  }

  get destroyed() {
    return this.#destroyed;
  }
}
