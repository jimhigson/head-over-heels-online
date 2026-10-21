/**
 * the standard zooms: what stepping goes through, and what a zoom gesture
 * settles on when it ends. Must be integers, or the outline/hover effect in the editor
 * warps the rendering at non-integer zoom levels
 */
export const zoomLadder = [1, 2, 3, 4, 6, 8, 11, 16];

/**
 * the standard zoom closest to `zoom`, by ratio rather than difference, so
 * 2.4 settles on 2 but 13 on 11
 */
export const nearestLadderZoom = (zoom: number): number =>
  zoomLadder.reduce((nearest, step) =>
    Math.abs(Math.log(step / zoom)) < Math.abs(Math.log(nearest / zoom)) ?
      step
    : nearest,
  );
