import { Container } from "pixi.js";
import { sortByZPairs, zEdges } from "./sortZ/sortItemsByDrawOrder";
import { createItemRenderer } from "./item/itemRender/createItemRenderer";
import type { GraphEdges } from "./sortZ/toposort/toposort";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { positionRoom, showRoomScrollBounds } from "./positionRoom";
import { store } from "../../store/store";
import type {
  ItemTickContext,
  Renderer,
  RoomRenderContext,
  RoomTickContext,
} from "./Renderer";
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

export class RoomRenderer<RoomId extends string, RoomItemId extends string>
  implements
    Renderer<
      RoomRenderContext<RoomId, RoomItemId>,
      RoomTickContext<RoomId, RoomItemId>,
      SoundAndGraphicsOutput
    >
{
  /**
   * renders all items *except* the floor edge, since the floor edge is the only
   * item that is colourised differently when colourisation is turned off
   */
  #itemsContainer: Container = new Container({ label: "items" });
  #floorEdgeContainer: Container = new Container({ label: "floorEdge" });
  #container: Container = new Container({
    children: [this.#itemsContainer, this.#floorEdgeContainer],
  });
  #sound: AudioNode = audioCtx.createGain();
  public readonly output: Required<SoundAndGraphicsOutput> = {
    sound: this.#sound,
    graphics: this.#container,
  };
  #everRendered: boolean = false;
  /**
   * store the edges of the behind/front graph between frames so we can incrementally update it
   */
  #incrementalZEdges: GraphEdges<string> = new Map();
  #itemRenderers: Map<
    RoomItemId,
    ItemSoundAndGraphicsRenderer<ItemInPlayType, RoomId, RoomItemId>
  > = new Map();
  #roomScroller: ReturnType<typeof positionRoom>;

  constructor(
    public readonly renderContext: RoomRenderContext<RoomId, RoomItemId>,
  ) {
    const {
      gameMenus: {
        userSettings: { displaySettings },
        upscale,
      },
    } = store.getState();

    this.#container.label = `RoomRenderer(${renderContext.room.id})`;

    this.initFilters(renderContext.colourised, renderContext.room.color);

    const showBoundingBoxes =
      displaySettings?.showBoundingBoxes ??
      defaultUserSettings.displaySettings.showBoundingBoxes;

    if (showBoundingBoxes !== "none") {
      // these aren't really bounding boxes, but it is useful to be abl to turn them on and I don't want to add
      // any more switches:
      this.#container.addChild(
        showRoomScrollBounds(renderContext.room.roomJson),
      );
    }

    this.#roomScroller = positionRoom(
      renderContext.room,
      this.#container,
      upscale.gameEngineScreenSize,
    );
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
      : new RevertColouriseFilter(getColorScheme(colour).main.original);
  }

  #tickItems(tickContext: ItemTickContext<RoomId, RoomItemId>) {
    const { room } = this.renderContext;

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
          item,
        });

        this.#itemRenderers.set(item.id as RoomItemId, itemRenderer);

        const addToContainer =
          item.type === "floorEdge" ?
            this.#floorEdgeContainer
          : this.#itemsContainer;

        const { graphics, sound } = itemRenderer.output;

        if (graphics) {
          // item has a visual presence:
          addToContainer.addChild(graphics);
          if (item.fixedZIndex) {
            graphics.zIndex = item.fixedZIndex;
          }
        }

        if (sound) {
          // item has a sound presence:
          sound.connect(this.#sound);
        }
      }
      itemRenderer.tick(tickContext);
    }

    // remove any renderers for items that no longer exist in the room:
    for (const [itemId, itemRenderer] of this.#itemRenderers.entries()) {
      if (room.items[itemId] === undefined) {
        itemRenderer.destroy();
        this.#itemRenderers.delete(itemId as RoomItemId);
      }
    }
  }

  #tickItemsZIndex(tickContext: RoomTickContext<RoomId, RoomItemId>) {
    const { order } = sortByZPairs(
      zEdges(
        this.renderContext.room.items,
        tickContext.movedItems,
        this.#incrementalZEdges,
      ),
      this.renderContext.room.items,
    );

    for (let i = 0; i < order.length; i++) {
      const itemRenderer = this.#itemRenderers.get(order[i] as RoomItemId);
      if (itemRenderer === undefined) {
        throw new Error(
          `Item id=${order[i]} does not have a renderer - cannot assign a z-index`,
        );
      }
      // TODO: verify that this will always have graphics
      itemRenderer.output.graphics!.zIndex = order.length - i;
    }
  }

  tick(givenTickContext: RoomTickContext<RoomId, RoomItemId>) {
    const tickContext =
      this.#everRendered ? givenTickContext : (
        {
          ...givenTickContext,
          // if we have never rendered before, consider that all items have moved:
          movedItems: new Set(iterateRoomItems(this.renderContext.room.items)),
        }
      );

    this.#roomScroller(
      selectCurrentPlayableItem(this.renderContext.gameState),
      tickContext.deltaMS,
      !this.#everRendered,
    );

    this.#tickItems(tickContext);

    if (!this.#everRendered || tickContext.movedItems.size > 0) {
      this.#tickItemsZIndex(tickContext);
    }

    this.#everRendered = true;
  }

  destroy() {
    this.#container.destroy({ children: true });
    this.#sound.disconnect();
    this.#itemRenderers.forEach((itemRenderer) => {
      itemRenderer.destroy();
    });
  }
}
