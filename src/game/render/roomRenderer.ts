import { Container } from "pixi.js";
import { sortByZPairs, zEdges } from "./sortZ/sortItemsByDrawOrder";
import { createItemRenderer } from "./item/itemRender/createItemRenderer";
import type { GraphEdges } from "./sortZ/toposort/toposort";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { positionRoom, showRoomScrollBounds } from "./positionRoom";
import { store } from "../../store/store";
import type {
  ItemRenderContext,
  ItemTickContext,
  Renderer,
  RoomRenderContext,
  RoomTickContext,
} from "./Renderer";
import { RevertColouriseFilter } from "./filters/RevertColouriseFilter";
import { getColorScheme } from "../hintColours";
import { noFilters } from "./filters/standardFilters";
import type { ZxSpectrumRoomColour } from "../../originalGame";
import { defaultUserSettings } from "../../store/defaultUserSettings";
import { iterateRoomItems } from "../../model/RoomState";
import type { ItemInPlayType } from "../../model/ItemInPlay";

export class RoomRenderer<RoomId extends string, RoomItemId extends string>
  implements
    Renderer<
      RoomRenderContext<RoomId, RoomItemId>,
      RoomTickContext<RoomId, RoomItemId>
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
  #everRendered: boolean = false;
  /**
   * store the edges of the behind/front graph between frames so we can incrementally update it
   */
  #incrementalZEdges: GraphEdges<string> = new Map();
  #itemRenderers: Map<
    RoomItemId,
    | Renderer<
        ItemRenderContext<ItemInPlayType, RoomId, RoomItemId>,
        ItemTickContext<RoomId, RoomItemId>
      >
    // createItemRenderer explicitly declined to create an instance for this item
    | "not-needed"
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
      colourise ? noFilters : (
        new RevertColouriseFilter(getColorScheme(colour).main.original)
      );
  }

  #tickItems(tickContext: ItemTickContext<RoomId, RoomItemId>) {
    const { room } = this.renderContext;

    for (const item of iterateRoomItems(room.items)) {
      let itemRenderer = this.#itemRenderers.get(item.id as RoomItemId);

      if (
        itemRenderer !==
        undefined /* equivalent to if( this.#itemRenderers.has(item.id) ) */
      ) {
        if (itemRenderer === "not-needed") {
          // we have previously recorded that this item needs no renderer
          continue;
        }
      } else {
        // have never ticked this item before - either first tick in the room or item was introduced to the
        // room since the last tick
        itemRenderer = createItemRenderer({
          ...this.renderContext,
          item,
        });

        if (itemRenderer === "not-needed") {
          // createItemRenderer declined to create a render for this item - record that:
          this.#itemRenderers.set(item.id as RoomItemId, "not-needed");
          continue;
        }
        this.#itemRenderers.set(item.id as RoomItemId, itemRenderer);

        const addToContainer =
          item.type === "floorEdge" ?
            this.#floorEdgeContainer
          : this.#itemsContainer;

        addToContainer.addChild(itemRenderer.container);
        if (item.fixedZIndex) {
          itemRenderer.container.zIndex = item.fixedZIndex;
        }
      }
      itemRenderer.tick(tickContext);
    }

    // remove any renderers for items that no longer exist in the room:
    for (const [itemId, itemRenderer] of this.#itemRenderers.entries()) {
      if (room.items[itemId] === undefined) {
        if (itemRenderer !== "not-needed") itemRenderer.destroy();
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
      if (itemRenderer === undefined || itemRenderer === "not-needed") {
        throw new Error(
          `Item id=${order[i]} does not have a renderer - cannot assign a z-index`,
        );
      }
      itemRenderer.container.zIndex = order.length - i;
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
    this.#itemRenderers.forEach((itemRenderer) => {
      if (itemRenderer !== "not-needed") itemRenderer.destroy();
    });
  }

  get container() {
    return this.#container;
  }
}
