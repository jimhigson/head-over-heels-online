export const blockSizePx = { w: 16, d: 16, h: 12 }; // doors are position so the face we can see (maybe facing away from the room) is on the position
// given. This means that doors facing towards the camera need to be given negative x or y (value of -0.5)

export const doorTexturePivot = {
  near: {
    x: { x: 16, y: 56 },
    y: { x: 8, y: 56 },
  },
  far: {
    x: { x: 8, y: 52 },
    y: { x: 16, y: 52 },
  },
};
export const doorLegsPivotY = { x: 0, y: 36 };
export const barrierPivot = { x: { x: 8, y: 24 }, y: { x: 6, y: 22 } };