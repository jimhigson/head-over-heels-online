import type { UnknownRoomState } from "@/model/modelTypes";
import type { RenderOptions } from "../RenderOptions";
import { mainPaletteSwapFilters } from "./filters/paletteSwapFilters";
import { Container } from "pixi.js";
import { renderFloor } from "./renderFloor";
import { sortItemsByDrawOrder } from "./sortItemsByDrawOrder";
import { renderExtent } from "./renderExtent";
import { moveSpriteToItemProjection, renderItem } from "./renderItems";
import { itemRenderingInContainerAlongsideBBRendering } from "./itemRenderingInContainerAlongsideBBRendering";
import { objectValues } from "iter-tools";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import { RevertColouriseFilter } from "@/filters/colorReplace/RevertColouriseFilter";
import { shades } from "@/hintColours";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";

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

const assignMouseActions = <RoomId extends string>(
  item: UnknownItemInPlay<RoomId>,
  options: RenderOptions<RoomId>,
  room: UnknownRoomState,
) => {
  if (item.renderContainer !== undefined) {
    if (options.onItemClick && item.renderContainer !== undefined) {
      item.renderContainer.eventMode = "static";
      item.renderContainer.on("pointertap", () => {
        options.onItemClick!(item);
      });
    }

    item.renderContainer.on("pointerenter", () => {
      item.renderContainer!.filters = new RevertColouriseFilter(
        shades[room.color].original,
      );
    });

    item.renderContainer.on("pointerleave", () => {
      item.renderContainer!.filters = [];
    });
  }
};

export const renderCurrentRoom = <RoomId extends string>(
  gameState: GameState<RoomId>,
  options: RenderOptions<RoomId>,
) => {
  const room = currentRoom(gameState);

  // nothing in a room can ever be under the floor, so we can render
  // it outside of the normal object loop
  const roomContainer = new Container();

  roomContainer.addChild(renderFloor(room));

  const itemsContainer = new Container();

  for (const item of objectValues(room.items)) {
    const { renders } = item;

    if (renders) {
      const renderContainer = new Container();
      item.renderContainer = renderContainer;
      renderItem(item, gameState);
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
      item.renderContainer.alpha = 0.25;
    }

    assignMouseActions(item, options, room);

    if (item.positionContainer !== undefined) {
      moveSpriteToItemProjection(item);
      itemsContainer.addChild(item.positionContainer);
    }
  }

  sortItemsByDrawOrder(objectValues(room.items));

  roomContainer.addChild(itemsContainer);

  roomContainer.filters = mainPaletteSwapFilters(room);

  centreRoomInRendering(room, roomContainer);

  return roomContainer;
};
