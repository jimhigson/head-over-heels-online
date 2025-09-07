import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import {
  projectWorldXyzToScreenX,
  projectWorldXyzToScreenXy,
  projectWorldXyzToScreenY,
} from "../projections";

export type ProjectionOnAxes = {
  xAxisProjectionMin: number;
  xAxisProjectionMax: number;
  yAxisProjectionMin: number;
  yAxisProjectionMax: number;
  zAxisProjectionMin: number;
  zAxisProjectionMax: number;
};

/**
 * of the six visible corners of the projected cuboid aabb, we need to find three to describe
 * the bounds of the rendered shape
 *                  c111  ---top
 *                  /\
 *       c101 = tl /  \ tr = c011
 *           left |    | right
 *           c100 |    |c010
 *                 \  /
 *                  \/
 *                  bc  ---bottom
 */

// Individual corner projection functions
export const projectBottomCentre = (position: Xyz) =>
  projectWorldXyzToScreenXy(position);

export const projectTopLeft = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, { x: aabb.x, z: aabb.z }));

export const projectTopRight = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, { y: aabb.y, z: aabb.z }));

export const projectTop = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenY(addXyz(position, aabb));

export const projectBottom = (position: Xyz) =>
  projectWorldXyzToScreenY(position);

export const projectLeft = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenX(addXyz(position, { x: aabb.x }));

export const projectRight = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenX(addXyz(position, { y: aabb.y }));

// All 8 corners: cXYZ where X,Y,Z are 0 or 1
export const projectC000 = (position: Xyz) =>
  projectWorldXyzToScreenXy(position);

export const projectC001 = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, { z: aabb.z }));

export const projectC010 = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, { y: aabb.y }));

export const projectC011 = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, { y: aabb.y, z: aabb.z }));

export const projectC100 = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, { x: aabb.x }));

export const projectC101 = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, { x: aabb.x, z: aabb.z }));

export const projectC110 = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, { x: aabb.x, y: aabb.y }));

export const projectC111 = (position: Xyz, aabb: Xyz) =>
  projectWorldXyzToScreenXy(addXyz(position, aabb));

export const projectCorner = (position: Xyz, aabb: Xyz, cornerVector: Xyz) =>
  projectWorldXyzToScreenXy(
    addXyz(position, {
      x: cornerVector.x * aabb.x,
      y: cornerVector.y * aabb.y,
      z: cornerVector.z * aabb.z,
    }),
  );

export const projectAabbAxes = (
  writeInto: object,
  position: Xyz,
  aabb: Xyz,
): ProjectionOnAxes => {
  const topLeft = projectTopLeft(position, aabb);
  const topRight = projectTopRight(position, aabb);
  const bottomCentre = projectBottomCentre(position);

  const writeIntoTyped = writeInto as ProjectionOnAxes;

  /** get the C of the sloped line a line running along the x-axis would project to
   * a (projected) line along the (world) x axis of the projected is described by:
   *       y = x/2 - c
   *  ∴    c = y + x/2
   * a greater c means projected higher on the screen -ie, a higher value in y and/or z (world-x is orthogonal)
   */
  writeIntoTyped.xAxisProjectionMin = topRight.y - topRight.x / 2;
  writeIntoTyped.xAxisProjectionMax = bottomCentre.y - bottomCentre.x / 2;

  /** get the C of the sloped line a line running along the y-axis would project to
   * a (projected) line along the (world) y axis of the projected is described by:
   *       y = x/2 - c
   *  ∴    c = y - x/2
   * a greater c means projected higher on the screen -ie, a higher value in y and/or z (world-x is orthogonal)
   */
  writeIntoTyped.yAxisProjectionMin = topLeft.y + topLeft.x / 2;
  writeIntoTyped.yAxisProjectionMax = bottomCentre.y + bottomCentre.x / 2;

  // get the x of the vertical line a line running along the z-axis would project to
  // (this is equivalent to .left and .right)
  writeIntoTyped.zAxisProjectionMin = topLeft.x;
  writeIntoTyped.zAxisProjectionMax = topRight.x;

  return writeIntoTyped;
};
