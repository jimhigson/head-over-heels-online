import type { Xyz } from "../../../../../../utils/vectors/vectors";
import { roomGridSizeXY, roomGridSizeZ } from "./mapConstants";

export const roomWorldPosition = (gridPosition: Xyz): Xyz => ({
  x: gridPosition.x * roomGridSizeXY,
  y: gridPosition.y * roomGridSizeXY,
  z: gridPosition.z * roomGridSizeZ,
});
