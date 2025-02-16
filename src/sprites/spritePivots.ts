import type { Xyz } from "../utils/vectors/vectors";

export const blockSizePx = { w: 16, d: 16, h: 12 };
export const blockSizeXyzPx: Xyz = { x: 16, y: 16, z: 12 };
// given. This means that doors facing towards the camera need to be given negative x or y (value of -0.5)

export const doorLegsPivotY = { x: 0, y: 36 };
//export const barrierPivot = { x: { x: 18, y: 22 }, y: { x: 6, y: 22 } };
