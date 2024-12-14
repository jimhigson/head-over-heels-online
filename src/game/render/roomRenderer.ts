import type { RoomState, UnknownRoomState } from "@/model/modelTypes";
import type { RenderOptions } from "../RenderOptions";
import { Container } from "pixi.js";
import { floorRenderExtent } from "./renderExtent";
import type { ItemInPlayType, UnknownItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import { sortByZPairs, zEdges } from "./sortZ/sortItemsByDrawOrder";
import { ItemRenderer } from "./ItemRenderer";
import type { MovedItems } from "../mainLoop/progressGameState";
import type { GraphEdges } from "./sortZ/toposort/toposort";

const centreRoomInRendering = (
  room: UnknownRoomState,
  container: Container,
): void => {
  const { leftSide, rightSide, frontSide, top } = floorRenderExtent(
    room.roomJson,
  );

  const renderingMedianX = (rightSide.x + leftSide.x) / 2;
  const renderingMedianY = (top + frontSide.y) / 2;

  container.x = -renderingMedianX;
  container.y = -renderingMedianY;
};

export type RenderContext = {
  movedItems: MovedItems;
  progression: number;
};

export const RoomRenderer = <RoomId extends string, ItemId extends string>(
  room: RoomState<PlanetName, RoomId, ItemId>,
  renderOptions: RenderOptions<RoomId>,
) => {
  // nothing in a room can ever be under the floor, so we can render
  // it outside of the normal object loop
  const roomContainer = new Container({ label: `room(${room.id})` });
  const itemsContainer = new Container({ label: `items(room(${room.id}))` });

  let isFirstRender = true;
  // store the edges of the behind/front graph between frames so we can incrementally update it
  const incrementalZEdges: GraphEdges<string> = new Map();

  roomContainer.addChild(itemsContainer);

  centreRoomInRendering(room, roomContainer);

  // where we render all the items in the room
  const itemRenderers: Map<
    string,
    ItemRenderer<ItemInPlayType, RoomId, ItemId>
  > = new Map();

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
        isFirstRender ?
          {
            movedItems: new Set(objectValues(room.items)),
            progression: 0,
          }
        : givenRenderContext;

      for (const item of objectValues(room.items)) {
        let itemRenderer = itemRenderers.get(item.id);

        if (itemRenderer === undefined) {
          // don't already have a renderer for this item so make one
          itemRenderer = ItemRenderer(
            // this cast shouldn't be needed - maybe look into why room.items isn't properly typed with the room's ItemId
            item as UnknownItemInPlay<RoomId, ItemId>,
            room,
            renderOptions,
          );
          itemRenderers.set(item.id, itemRenderer);
          itemsContainer.addChild(itemRenderer.container);
        }
        itemRenderer.tick(renderContext);
      }
      // remove any renderers for items that no longer exist in the room:
      for (const itemRenderer of itemRenderers.values()) {
        if (!room.items[itemRenderer.item.id]) {
          itemRenderers.delete(itemRenderer.item.id);
          itemRenderer.destroy();
        }
      }
      if (isFirstRender || renderContext.movedItems.size > 0) {
        // something has moved so re-sort the room's items:
        const { order } = sortByZPairs(
          zEdges(room.items, renderContext.movedItems, incrementalZEdges),
          room.items,
        );

        for (let i = 0; i < order.length; i++) {
          const itemRenderer = itemRenderers.get(order[i]);
          if (itemRenderer === undefined) {
            throw new Error(
              `Item id=${order[i]} does not have a renderer - cannot assign a z-index`,
            );
          }
          itemRenderer.container.zIndex = order.length - i;
        }
      }
      isFirstRender = false;
    },
    destroy() {
      roomContainer.destroy({ children: true });
      itemRenderers.forEach((itemRenderer) => {
        itemRenderer.destroy();
      });
    },
    get renderOptions() {
      return renderOptions;
    },
  };
};

export type RoomRenderer<
  RoomId extends string,
  ItemId extends string,
> = ReturnType<typeof RoomRenderer<RoomId, ItemId>>;
