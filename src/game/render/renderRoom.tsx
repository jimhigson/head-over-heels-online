import { RoomState, UnknownRoomState } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { RenderOptions } from "../RenderOptions";
import { mainPaletteSwapFilters } from "./paletteSwapFilters";
import { Container } from "pixi.js";
import { renderFloor } from "./renderFloor";
import { sortItemsByDrawOrder } from "./sortItemsByDrawOrder";
import { renderExtent } from "./renderExtent";
import { moveSpriteToItemProjection, renderItem } from "./renderItems";
import { itemRenderingInContainerAlongsideBBRendering } from "./itemRenderingInContainerAlongsideBBRendering";

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
    const { renders } = item;

    if (renders) {
      const renderContainer = new Container();
      item.renderContainer = renderContainer;
      renderItem(item, room);
    }

    const renderItemBBs =
      options.showBoundingBoxes === "all" ||
      (options.showBoundingBoxes === "non-wall" && item.type !== "wall");

    item.positionContainer =
      renderItemBBs ?
        // rendering gets wrapped in an additional container that also contains the bb rendering
        itemRenderingInContainerAlongsideBBRendering(item)
        // position container and item container are one and the same. Note that for
        // non-rendering items, this is setting positionContainer to undefined
      : item.renderContainer;

    if (
      options.showBoundingBoxes !== "none" &&
      item.renderContainer !== undefined
    ) {
      item.renderContainer.alpha = 0.4;
    }

    if (options.onItemClick && item.renderContainer !== undefined) {
      item.renderContainer.eventMode = "static";
      item.renderContainer.on("pointertap", () => {
        options.onItemClick!(item);
      });
    }

    if (item.positionContainer !== undefined) {
      moveSpriteToItemProjection(item);
      itemsContainer.addChild(item.positionContainer);
    }
  }

  sortItemsByDrawOrder(room.items);

  roomContainer.addChild(itemsContainer);

  roomContainer.filters = mainPaletteSwapFilters(room);

  centreRoomInRendering(room, roomContainer);

  return roomContainer;
};

/*

  for (const item of room.items) {
    if (item.renders && options.showBoundingBoxes === false) {
      // normal case in gameplay
      const itemContainer = new Container();
      if (options.onItemClick) {
        itemContainer.eventMode = "static";
        itemContainer.on("pointertap", () => {
          options.onItemClick!(item);
        });
      }

      item.positionContainer = itemContainer;
      item.renderContainer = itemContainer;

      //assignContainerToItem(item, room, options);
      //assertItemHasContainers(item);
      itemsContainer.addChild(itemContainer);
    }
  }

  */
