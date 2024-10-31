import { UnknownRoomState } from "../../model/modelTypes";
import { wallTileSize } from "@/sprites/textureSizes";
import { projectBlockXyzToScreenXy } from "./projectToScreen";
import { roomSidesWithDoors } from "./roomSidesWithDoors";

export const renderExtent = (loadedRoom: UnknownRoomState) => {
  const sidesWithDoors = roomSidesWithDoors(loadedRoom);

  const blockXMin = sidesWithDoors.right ? -0.5 : 0;
  const blockXMax = loadedRoom.size.x + (sidesWithDoors.left ? 0.5 : 0);
  const blockYMin = sidesWithDoors.towards ? -0.5 : 0;
  const blockYMax = loadedRoom.size.y + (sidesWithDoors.away ? 0.5 : 0);

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
  };
};
