import { RoomState } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { RenderOptions } from "./RenderOptions";
import { iterateToContainer } from "./iterateToContainer";
import { mainPaletteSwapFilters } from "./render/paletteSwapFilters";
import { renderItems } from "./render/renderItems";

export const renderRoom = <P extends PlanetName, RoomId extends string>(
  room: RoomState<P, RoomId>,
  options: RenderOptions<RoomId>,
) => {
  const roomContainer = iterateToContainer(renderItems(room, options));

  roomContainer.filters = mainPaletteSwapFilters(room);

  return roomContainer;
};
