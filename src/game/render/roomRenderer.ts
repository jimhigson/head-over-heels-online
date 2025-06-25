import type { IRenderLayer } from "pixi.js";
import { Container, RenderLayer } from "pixi.js";
import { sortByZPairs, zEdges } from "./sortZ/sortItemsByDrawOrder";
import { createItemRenderer } from "./item/itemRender/createItemRenderer";
import type { GraphEdges } from "./sortZ/toposort/toposort";
import type { ItemTickContext } from "./ItemRenderContexts";
import type { RoomRenderContext, RoomTickContext } from "./RoomRenderContexts";
import type { SoundAndGraphicsOutput } from "./SoundAndGraphicsOutput";
import { RevertColouriseFilter } from "./filters/RevertColouriseFilter";
import { getColorScheme } from "../hintColours";
import type { ZxSpectrumRoomColour } from "../../originalGame";
import { defaultUserSettings } from "../../store/defaultUserSettings";
import { iterateRoomItems } from "../../model/RoomState";
import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { ItemSoundAndGraphicsRenderer } from "./item/itemRender/ItemSoundAndGraphicsRenderer";
import { audioCtx } from "../../sound/audioCtx";
import { dimLut, noFilters } from "./filters/standardFilters";
import type { SetRequired } from "type-fest";
import type { RoomRendererType } from "./RoomRendererType";
import { iterateToContainer } from "../iterateToContainer";
import { roomRendererOcclusions } from "./roomRendererOcclusions";
import { zxSpectrumDimmed } from "../../utils/colour/halfBrite";

export class RoomRenderer<RoomId extends string, RoomItemId extends string>
  implements RoomRendererType<RoomId, RoomItemId>
{
  #destroyed = false;

  /**
   * renders all items *except* the room edge, since the floor edge is the only
   * item that is colourised differently when colourisation is turned off
   */
  #itemsContainer: Container = new Container({ label: "items" });
  /**
   * render into this layer to simulate zxs colour clash; only needed
   * when not colourised
   */
  #colourClashLayer: IRenderLayer | undefined;

  /**
   * container for the cutoff-off for the left and right edge, to prevent
   * rendering inaccessible corners or rooms
   */
  #occlusionContainer: Container = new Container({
    label: "occlusion",
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
  #incrementalZEdges: GraphEdges<string> = new Map();
  #itemRenderers: Map<
    RoomItemId,
    ItemSoundAndGraphicsRenderer<ItemInPlayType>
  > = new Map();

  constructor(
    public readonly renderContext: RoomRenderContext<RoomId, RoomItemId>,
  ) {
    const {
      general: { colourised, soundSettings },
      room,
    } = renderContext;

    this.initFilters(colourised, renderContext.room.color);

    const mute = soundSettings.mute ?? defaultUserSettings.soundSettings.mute;

    const soundOutput: AudioNode | undefined =
      mute ? undefined : audioCtx.createGain();

    iterateToContainer(roomRendererOcclusions(room), this.#occlusionContainer);

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
    this.output.graphics.addChild(this.#occlusionContainer);
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

  #tickItems(roomTickContext: RoomTickContext<RoomId, RoomItemId>) {
    const { room } = this.renderContext;

    const itemTickContext: ItemTickContext = {
      ...roomTickContext,
      lastRenderRoomTime: this.#lastRenderRoomTime,
    };

    for (const item of iterateRoomItems(room.items)) {
      let itemRenderer = this.#itemRenderers.get(item.id as RoomItemId);

      if (
        itemRenderer ===
        undefined /* equivalent to if( this.#itemRenderers.has(item.id) ) */
      ) {
        // have never ticked this item before - either first tick in the room or item was introduced to the
        // room since the last tick
        itemRenderer = createItemRenderer({
          ...this.renderContext,
          colourClashLayer: this.#colourClashLayer,
          item,
        });

        this.#itemRenderers.set(item.id as RoomItemId, itemRenderer);

        const { graphics, sound } = itemRenderer.output;

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
        itemRenderer.tick(itemTickContext);
      } catch (e) {
        throw new Error(
          `RoomRenderer caught error while ticking Renderer for item "${item.id}" - item in play object is:
           ${JSON.stringify(item, null, 2)}`,
          { cause: e },
        );
      }
    }

    // remove any renderers for items that no longer exist in the room:
    let destroyedItemRenderers = false;
    for (const [itemId, itemRenderer] of this.#itemRenderers.entries()) {
      if (room.items[itemId] === undefined) {
        itemRenderer.destroy();
        this.#itemRenderers.delete(itemId as RoomItemId);
        destroyedItemRenderers = true;
      }
    }
    if (this.#colourClashLayer && destroyedItemRenderers) {
      // removing an item renderer could have removed from the scene graph something that is
      // in a render layer
      for (const c of this.#colourClashLayer.renderLayerChildren) {
        if (c.parent === null) {
          // c is not in the scene graph, remove from render layer too:
          this.#colourClashLayer.detach(c);
        }
      }
    }
  }

  #tickItemsZIndex(roomTickContext: RoomTickContext<RoomId, RoomItemId>) {
    const ze = zEdges(
      this.renderContext.room.items,
      roomTickContext.movedItems,
      // this.#incrementalZEdges will be updated in-place by the zEdges function to match
      // the current ordering state of the room, starting from the previous ordering state
      this.#incrementalZEdges,
    );

    const { order } = sortByZPairs(ze, this.renderContext.room.items);

    for (let i = 0; i < order.length; i++) {
      const itemRenderer = this.#itemRenderers.get(order[i] as RoomItemId);
      if (itemRenderer === undefined) {
        throw new Error(
          `Item id=${order[i]} does not have a renderer - cannot assign a z-index`,
        );
      }

      const graphicsOutput = itemRenderer.output.graphics;
      if (graphicsOutput) graphicsOutput!.zIndex = order.length - i;
      else
        throw new Error(
          `order ${order[i]} was given a z-order by sorting, but item has no graphics`,
        );
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

    this.#tickItems(tickContext);

    if (!this.#everRendered || tickContext.movedItems.size > 0) {
      this.#tickItemsZIndex(tickContext);
    }

    this.#lastRenderRoomTime = this.renderContext.room.roomTime;
  }

  destroy() {
    this.output.graphics.label = this.output.graphics.label + "DESTROYED";
    this.output.graphics.destroy({ children: true });
    this.output.sound?.disconnect();
    this.#itemRenderers.forEach((itemRenderer) => {
      itemRenderer.destroy();
    });
    this.#destroyed = true;
  }

  get destroyed() {
    return this.#destroyed;
  }
}
