import type { UnknownRoomState } from "@/model/modelTypes";
import type { RenderOptions } from "../RenderOptions";
import { mainPaletteSwapFilters } from "./filters/paletteSwapFilters";
import { Container } from "pixi.js";
import { renderFloor } from "./renderFloor";
import { renderExtent } from "./renderExtent";
import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";

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

export const roomInitialRender = <RoomId extends string>(
  gameState: GameState<RoomId>,
  _options: RenderOptions<RoomId>,
) => {
  const room = currentRoom(gameState);

  // nothing in a room can ever be under the floor, so we can render
  // it outside of the normal object loop
  const roomContainer = new Container();

  roomContainer.addChild(renderFloor(room));

  // NOTE: items are not rendered here - they will render themselves in the normal tick renderings

  roomContainer.filters = mainPaletteSwapFilters(room);

  centreRoomInRendering(room, roomContainer);

  return roomContainer;
};
