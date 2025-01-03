import type { RoomState } from "@/model/modelTypes";
import { Container } from "pixi.js";
import type { ItemInPlayType, UnknownItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import { sortByZPairs, zEdges } from "./sortZ/sortItemsByDrawOrder";
import { ItemRenderer } from "./ItemRenderer";
import type { MovedItems } from "../mainLoop/progressGameState";
import type { GraphEdges } from "./sortZ/toposort/toposort";
import type { GameState } from "../gameState/GameState";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { positionRoom, showRoomScrollBounds } from "./positionRoom";

export type RenderContext = {
  movedItems: MovedItems;
  progression: number;
  deltaMS: number;
};

export const RoomRenderer = <RoomId extends string, ItemId extends string>(
  gameState: GameState<RoomId>,
  room: RoomState<PlanetName, RoomId, ItemId>,
) => {
  // stash a reference to the render options this room renderer is using - if these change it is not
  // our responsibility to react to that change
  const { renderOptions } = gameState;

  // nothing in a room can ever be under the floor, so we can render
  // it outside of the normal object loop
  const roomContainer = new Container({ label: `RoomRenderer(${room.id})` });

  if (gameState.renderOptions.showBoundingBoxes !== "none") {
    // these aren't really bounding boxes, but it is useful to be abl to turn them on and I don't want to add
    // any more switches:
    roomContainer.addChild(showRoomScrollBounds(room.roomJson));
  }

  let everRendered = false;

  // store the edges of the behind/front graph between frames so we can incrementally update it
  const incrementalZEdges: GraphEdges<string> = new Map();

  // where we render all the items in the room
  const itemRenderers: Map<
    ItemId,
    | ItemRenderer<ItemInPlayType, RoomId, ItemId>
    /** an explicit null value means ItemRenderer explicitly declined to create
    an instance for this item */
    | null
  > = new Map();

  const scrollRoom = positionRoom(
    room,
    roomContainer,
    gameState.renderOptions.upscale.effectiveSize,
  );

  return {
    get container() {
      return roomContainer;
    },
    get room() {
      return room;
    },
    /** update the rendering of all items in the room */
    tick(givenRenderContext: RenderContext) {
      /* for the first render, we consider that all items have moved */
      const renderContext =
        everRendered ? givenRenderContext : (
          {
            ...givenRenderContext,
            movedItems: new Set(objectValues(room.items)),
          }
        );

      scrollRoom(
        selectCurrentPlayableItem(gameState),
        renderContext.deltaMS,
        !everRendered,
      );

      /*if (renderContext.movedItems.size > 0)
        console.log(
          "roomrenderer.tick: movedItems are",
          renderContext.movedItems,
        );
        */

      for (const item of objectValues(room.items)) {
        let itemRenderer = itemRenderers.get(item.id as ItemId);
        if (itemRenderer === null) {
          // ItemRenderer decided not to render this item
          continue;
        }

        if (itemRenderer === undefined) {
          // don't already have a renderer for this item so make one
          itemRenderer = ItemRenderer(
            // this cast shouldn't be needed - maybe look into why room.items isn't properly typed with the room's ItemId
            item as UnknownItemInPlay<RoomId, ItemId>,
            room,
            renderOptions,
          );
          if (itemRenderer === undefined) {
            // ItemRenderer declined to render this item
            itemRenderers.set(item.id as ItemId, null);
            continue;
          }
          itemRenderers.set(item.id as ItemId, itemRenderer);
          roomContainer.addChild(itemRenderer.container);
        }
        itemRenderer.tick(renderContext);
      }
      // remove any renderers for items that no longer exist in the room:
      for (const [itemId, itemRenderer] of itemRenderers.entries()) {
        if (room.items[itemId] === undefined) {
          if (itemRenderer !== null) itemRenderer.destroy();

          itemRenderers.delete(itemId as ItemId);
        }
      }
      if (!everRendered || renderContext.movedItems.size > 0) {
        // something has moved so re-sort the room's items:
        const { order } = sortByZPairs(
          zEdges(room.items, renderContext.movedItems, incrementalZEdges),
          room.items,
        );

        for (let i = 0; i < order.length; i++) {
          const itemRenderer = itemRenderers.get(order[i] as ItemId);
          if (itemRenderer === undefined) {
            throw new Error(
              `Item id=${order[i]} does not have a renderer - cannot assign a z-index`,
            );
          }
          itemRenderer!.container.zIndex = order.length - i;
        }
      }
      everRendered = true;
    },
    destroy() {
      roomContainer.destroy({ children: true });
      itemRenderers.forEach((itemRenderer) => {
        if (itemRenderer !== null) itemRenderer.destroy();
      });
    },
    get renderOptions() {
      return renderOptions;
    },
    get everRendered() {
      return everRendered;
    },
  };
};

export type RoomRenderer<
  RoomId extends string,
  ItemId extends string,
> = ReturnType<typeof RoomRenderer<RoomId, ItemId>>;
