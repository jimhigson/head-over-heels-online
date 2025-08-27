import type { Xyz } from "../../../../../../utils/vectors/vectors";

import { roomGridSizeXY, roomGridSizeZ } from "./mapConstants";

export const roomWorldPosition = (gridPosition: Partial<Xyz>): Xyz => ({
  x: (gridPosition.x ?? 0) * roomGridSizeXY,
  y: (gridPosition.y ?? 0) * roomGridSizeXY,
  z: (gridPosition.z ?? 0) * roomGridSizeZ,
});
