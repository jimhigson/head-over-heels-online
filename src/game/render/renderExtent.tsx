import type { AnyRoomJson } from "../../model/RoomJson";
import { projectBlockXyzToScreenXy } from "./projections";
import { roomSidesWithDoors } from "./roomSidesWithDoors";

export const floorBlockMinMax = (roomJson: AnyRoomJson) => {
  const sidesWithDoors = roomSidesWithDoors(roomJson);

  const blockXMin = sidesWithDoors.right ? -0.5 : 0;
  const blockXMax = roomJson.size.x + (sidesWithDoors.left ? 0.5 : 0);
  const blockYMin = sidesWithDoors.towards ? -0.5 : 0;
  const blockYMax = roomJson.size.y + (sidesWithDoors.away ? 0.5 : 0);

  return {
    blockXMin,
    blockXMax,
    blockYMin,
    blockYMax,
    sidesWithDoors,
  };
};

export const floorRenderExtent = (roomJson: AnyRoomJson) => {
  const { blockXMax, blockXMin, blockYMax, blockYMin, sidesWithDoors } =
    floorBlockMinMax(roomJson);

  // track the points where the left-most and right-most visible walls will be rendered:
  const edgeLeftX = projectBlockXyzToScreenXy({
    x: roomJson.size.x + (sidesWithDoors.right ? 0.5 : 0),
    y: -blockYMin,
  }).x;
  const edgeRightX = projectBlockXyzToScreenXy({
    x: -blockXMin,
    y: roomJson.size.y + (sidesWithDoors.towards ? 0.5 : 0),
  }).x;
  const topEdgeY = projectBlockXyzToScreenXy({
    x: roomJson.size.x,
    y: roomJson.size.y,
  }).y;

  const frontSide = projectBlockXyzToScreenXy({ x: blockXMin, y: blockYMin }); // aka the origin, ground-level
  const backSide = projectBlockXyzToScreenXy({ x: blockXMax, y: blockYMax }); // aka opposite the origin, ground level

  return {
    blockXMin,
    blockXMax,
    blockYMin,
    blockYMax,
    edgeLeftX,
    edgeRightX,
    topEdgeY,
    frontSide,
    backSide,
    sidesWithDoors,
  };
};
