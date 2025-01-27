import { Container } from "pixi.js";
import { objectValues } from "iter-tools";
import { sortByZPairs, zEdges } from "./sortZ/sortItemsByDrawOrder";
import { createItemRenderer } from "./item/createItemRenderer";
import type { GraphEdges } from "./sortZ/toposort/toposort";
import type { GameState } from "../gameState/GameState";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { positionRoom, showRoomScrollBounds } from "./positionRoom";
import type { UnknownItemInPlay } from "../../model/ItemInPlay";
import type { RoomState } from "../../model/modelTypes";
import type { SceneryName } from "../../sprites/planets";
import { store } from "../../store/store";
import type { DisplaySettings } from "../../store/gameMenusSlice";
import type { Upscale } from "./calculateUpscale";
import type { RenderContext, Renderer } from "./Renderer";
import { RevertColouriseFilter } from "./filters/RevertColouriseFilter";
import { getColorScheme } from "../hintColours";
import { noFilters } from "./filters/paletteSwapFilters";
import type { ZxSpectrumRoomColour } from "../../originalGame";

export class RoomRenderer<RoomId extends string, ItemId extends string>
  implements Renderer
{
  #container: Container;
  #everRendered: boolean = false;
  /**
   * store the edges of the behind/front graph between frames so we can incrementally update it
   */
  #incrementalZEdges: GraphEdges<string> = new Map();
  #itemRenderers: Map<
    ItemId,
    | Renderer
    // createItemRenderer explicitly declined to create an instance for this item
    | "not-needed"
  > = new Map();
  #roomScroller: ReturnType<typeof positionRoom>;
  #displaySettings: DisplaySettings;
  #upscale: Upscale;
  #roomState: RoomState<SceneryName, RoomId, ItemId>;
  #gameState: GameState<RoomId>;
  #paused: boolean;

  constructor(
    gameState: GameState<RoomId>,
    roomState: RoomState<SceneryName, RoomId, ItemId>,
    paused: boolean,
  ) {
    const {
      userSettings: { displaySettings },
      upscale,
    } = store.getState();

    this.#displaySettings = displaySettings;
    this.#upscale = upscale;
    this.#roomState = roomState;
    this.#gameState = gameState;
    this.#paused = paused;

    this.#container = new Container({
      label: `RoomRenderer(${roomState.id})`,
    });

    this.initFilters(!paused && displaySettings.colourise, roomState.color);

    if (displaySettings.showBoundingBoxes !== "none") {
      // these aren't really bounding boxes, but it is useful to be abl to turn them on and I don't want to add
      // any more switches:
      this.#container.addChild(showRoomScrollBounds(roomState.roomJson));
    }

    this.#roomScroller = positionRoom(
      roomState,
      this.#container,
      upscale.gameEngineScreenSize,
    );
  }

  /**
   * set the top-level filters for the room - either to revert colourisation or leave it in
   * modern-mode
   */
  initFilters(colourise: boolean, colour: ZxSpectrumRoomColour) {
    console.log("initing filters for room renderer", colourise, colour);

    this.#container.filters =
      colourise ? noFilters : (
        new RevertColouriseFilter(getColorScheme(colour).main.original)
      );
  }

  #tickItems(renderContext: RenderContext) {
    for (const item of objectValues(this.#roomState.items)) {
      let itemRenderer = this.#itemRenderers.get(item.id as ItemId);

      if (itemRenderer !== undefined /* equivalent to #itemRenderers.has */) {
        if (itemRenderer === "not-needed") {
          // we have previously recorded that this item needs no renderer
          continue;
        }
      } else {
        // have never ticked this item before - either first tick in the room or item was introduced to the
        // room since the last tick
        itemRenderer = createItemRenderer(
          item as UnknownItemInPlay<RoomId, ItemId>,
          this.#roomState,
          this.#gameState,
        );
        if (itemRenderer === "not-needed") {
          // createItemRenderer declined to create a render for this item - record that:
          this.#itemRenderers.set(item.id as ItemId, "not-needed");
          continue;
        }
        this.#itemRenderers.set(item.id as ItemId, itemRenderer);
        this.#container.addChild(itemRenderer.container);
        if (item.fixedZIndex) {
          itemRenderer.container.zIndex = item.fixedZIndex;
        }
      }
      itemRenderer.tick(renderContext);
    }

    // remove any renderers for items that no longer exist in the room:
    for (const [itemId, itemRenderer] of this.#itemRenderers.entries()) {
      if (this.#roomState.items[itemId] === undefined) {
        if (itemRenderer !== "not-needed") itemRenderer.destroy();
        this.#itemRenderers.delete(itemId as ItemId);
      }
    }
  }

  #tickItemsZIndex(renderContext: RenderContext) {
    const { order } = sortByZPairs(
      zEdges(
        this.#roomState.items,
        renderContext.movedItems,
        this.#incrementalZEdges,
      ),
      this.#roomState.items,
    );

    for (let i = 0; i < order.length; i++) {
      const itemRenderer = this.#itemRenderers.get(order[i] as ItemId);
      if (itemRenderer === undefined || itemRenderer === "not-needed") {
        throw new Error(
          `Item id=${order[i]} does not have a renderer - cannot assign a z-index`,
        );
      }
      itemRenderer.container.zIndex = order.length - i;
    }
  }

  tick(givenRenderContext: RenderContext) {
    const renderContext =
      this.#everRendered ? givenRenderContext : (
        {
          ...givenRenderContext,
          // if we have never rendered before, consider that all items have moved:
          movedItems: new Set(objectValues(this.#roomState.items)),
        }
      );

    this.#roomScroller(
      selectCurrentPlayableItem(this.#gameState),
      renderContext.deltaMS,
      !this.#everRendered,
    );

    this.#tickItems(renderContext);

    if (!this.#everRendered || renderContext.movedItems.size > 0) {
      this.#tickItemsZIndex(renderContext);
    }

    this.#everRendered = true;
  }

  destroy() {
    this.#container.destroy({ children: true });
    this.#itemRenderers.forEach((itemRenderer) => {
      if (itemRenderer !== "not-needed") itemRenderer.destroy();
    });
  }

  get displaySettings() {
    return this.#displaySettings;
  }

  get upscale() {
    return this.#upscale;
  }

  get everRendered() {
    return this.#everRendered;
  }

  get container() {
    return this.#container;
  }

  get roomState() {
    return this.#roomState;
  }

  get paused() {
    return this.#paused;
  }
}
