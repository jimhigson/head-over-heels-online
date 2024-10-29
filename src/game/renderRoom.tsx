import { RoomState } from "@/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { Container } from "pixi.js";
import { RenderOptions } from "./gameMain";
import { iterateToContainer } from "./iterateToContainer";
import { mainPaletteSwapFilters } from "./render/paletteSwapFilters";
import { renderFloor } from "./render/renderFloor";
import { renderItems } from "./render/renderItems";

function* renderRoomGenerator<RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): Generator<Container, undefined, undefined> {
  yield* renderFloor(room, options);
  yield iterateToContainer(renderItems(room, options));
}
export const renderRoom = <P extends PlanetName, RoomId extends string>(
  room: RoomState<P, RoomId>,
  options: RenderOptions<RoomId>,
) => {
  // NB: floor could be a tiling sprite and a graphics map:
  //  * https://pixijs.com/8.x/examples/sprite/tiling-sprite
  //  * https://pixijs.com/8.x/examples/masks/graphics
  const roomContainer = new Container();

  for (const container of renderRoomGenerator(room, options)) {
    roomContainer.addChild(container);
  }

  roomContainer.filters = mainPaletteSwapFilters(room);

  return roomContainer;
};
