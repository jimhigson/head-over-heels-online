import { RoomState, UnknownRoomState } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { RenderOptions } from "../RenderOptions";
import { mainPaletteSwapFilters } from "./paletteSwapFilters";
import { assignContainerToItem } from "./renderItems";
import { Container } from "pixi.js";
import { renderFloor } from "./renderFloor";
import { assertItemHasContainers } from "@/model/ItemInPlay";
import { sortItemsByDrawOrder } from "./sortItemsByDrawOrder";
import { renderExtent } from "./renderExtent";

const centreRoomInRendering = (
  room: UnknownRoomState,
  container: Container,
): void => {
  const { leftSide, rightSide, frontSide, top } = renderExtent(room);

  const renderingMedianX = (rightSide.x + leftSide.x) / 2;
  const renderingMedianY = (top + frontSide.y) / 2;

  container.x = -renderingMedianX;
  container.y = -renderingMedianY;
};

export const renderRoom = <P extends PlanetName, RoomId extends string>(
  room: RoomState<P, RoomId>,
  options: RenderOptions<RoomId>,
) => {
  // nothing in a room can ever be under the floor, so we can render
  // it outside of the normal object loop
  const roomContainer = new Container();

  roomContainer.addChild(renderFloor(room));

  const itemsContainer = new Container();

  for (const item of room.items) {
    if (item.renders) {
      assignContainerToItem(item, room, options);
      assertItemHasContainers(item);
      itemsContainer.addChild(item.positionContainer);
    }
  }

  sortItemsByDrawOrder(room.items);

  roomContainer.addChild(itemsContainer);

  roomContainer.filters = mainPaletteSwapFilters(room);

  centreRoomInRendering(room, roomContainer);

  return roomContainer;
};
