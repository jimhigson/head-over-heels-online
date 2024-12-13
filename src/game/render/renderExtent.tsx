import { wallTileSize } from "@/sprites/textureSizes";
import { projectBlockXyzToScreenXy } from "./projectToScreen";
import { roomSidesWithDoors } from "./roomSidesWithDoors";
import type { AnyRoomJson } from "@/model/RoomJson";

export const floorRenderExtent = (roomJson: AnyRoomJson) => {
  const sidesWithDoors = roomSidesWithDoors(roomJson);

  const blockXMin = sidesWithDoors.right ? -0.5 : 0;
  const blockXMax = roomJson.size.x + (sidesWithDoors.left ? 0.5 : 0);
  const blockYMin = sidesWithDoors.towards ? -0.5 : 0;
  const blockYMax = roomJson.size.y + (sidesWithDoors.away ? 0.5 : 0);

  const rightSide = projectBlockXyzToScreenXy({ x: blockXMin, y: blockYMax });
  const leftSide = projectBlockXyzToScreenXy({ x: blockXMax, y: blockYMin });
  const frontSide = projectBlockXyzToScreenXy({ x: blockXMin, y: blockYMin }); // aka the origin, ground-level
  const backSide = projectBlockXyzToScreenXy({ x: blockXMax, y: blockYMax }); // aka opposite the origin, top of wall
  const top = backSide.y + wallTileSize.h;

  return {
    blockXMin,
    blockXMax,
    blockYMin,
    blockYMax,
    rightSide,
    leftSide,
    frontSide,
    backSide,
    top,
    sidesWithDoors,
  };
};
