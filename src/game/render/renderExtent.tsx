import { AnyRoom } from "../../modelTypes";
import { wallTileSize } from "../../sprites/pixiSpriteSheet";
import { xyzBlockPosition } from "./renderWorld";

export const renderExtent = (room: AnyRoom) => {
  const blockXMin = room.doors.right ? -0.5 : 0;
  const blockXMax = room.size.x + (room.doors.left ? 0.5 : 0);
  const blockYMin = room.doors.towards ? -0.5 : 0;
  const blockYMax = room.size.y + (room.doors.towards ? 0.5 : 0);

  const rightSide = xyzBlockPosition(blockXMin, blockYMax);
  const leftSide = xyzBlockPosition(blockXMax, blockYMin);
  const frontSide = xyzBlockPosition(blockXMin, blockYMin); // aka the origin, ground-level
  const backSide = xyzBlockPosition(blockXMax, blockYMax); // aka opposite the origin, top of wall
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
