import type { RoomState, UnknownRoomState } from "@/model/modelTypes";
import type { RenderOptions } from "../RenderOptions";
import { Container } from "pixi.js";
import { floorRenderExtent } from "./renderExtent";
import type { ItemInPlayType } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import { sortByZPairs, zPairs } from "./sortZ/sortItemsByDrawOrder";
import { ItemRenderer } from "./ItemRenderer";

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

export const RoomRenderer = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  renderOptions: RenderOptions<RoomId>,
) => {
  // nothing in a room can ever be under the floor, so we can render
  // it outside of the normal object loop
  const roomContainer = new Container({ label: `room(${room.id})` });
  const itemsContainer = new Container({ label: `items(room(${room.id}))` });

  roomContainer.addChild(itemsContainer);

  centreRoomInRendering(room, roomContainer);

  // where we render all the items in the room
  const itemRenderers: Map<
    string,
    ItemRenderer<ItemInPlayType, RoomId>
  > = new Map();

  return {
    get container() {
      return roomContainer;
    },
    get room() {
      return room;
    },
    /** update the rendering of all items in the room */
    tick(progression: number) {
      let resortZ = false;
      for (const item of objectValues(room.items)) {
        let itemRenderer = itemRenderers.get(item.id);

        if (itemRenderer === undefined) {
          // don't already have a renderer for this item so make one
          itemRenderer = ItemRenderer(item, room, renderOptions);
          itemRenderers.set(item.id, itemRenderer);
          itemsContainer.addChild(itemRenderer.container);
        }

        resortZ = itemRenderer.tick(progression) || resortZ;

        // it is up the the item to decide if it will rerender
      }
      // remove any renderers for items that no longer exist in the room:
      for (const itemRenderer of itemRenderers.values()) {
        if (!room.items[itemRenderer.item.id]) {
          itemRenderers.delete(itemRenderer.item.id);
          itemRenderer.destroy();
        }
      }
      if (resortZ) {
        // re-sort the room's items:
        const { order } = sortByZPairs(
          zPairs(objectValues(room.items)),
          room.items,
        );

        for (let i = 0; i < order.length; i++) {
          const itemRenderer = itemRenderers.get(order[i]);
          if (itemRenderer === undefined) {
            throw new Error(
              `Item id=${order[i]} does not have a renderer - cannot assign a z-index`,
            );
          }
          itemRenderer.container.zIndex = i;
        }
      }
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

export type RoomRenderer<RoomId extends string> = ReturnType<
  typeof RoomRenderer<RoomId>
>;
