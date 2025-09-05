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
export const projectAabbCorners = (position: Xyz, aabb: Xyz) => {
  return {
    get bottomCentre() {
      return this.c000;
    },
    get topLeft() {
      return this.c101;
    },
    get topRight() {
      return this.c011;
    },
    // All 8 corners: cXYZ where X,Y,Z are 0 or 1
    get c000() {
      return projectWorldXyzToScreenXy(position);
    },
    get bottom() {
      return projectWorldXyzToScreenY(position);
    },
    get c001() {
      return projectWorldXyzToScreenXy(addXyz(position, { z: aabb.z }));
    },
    get c010() {
      return projectWorldXyzToScreenXy(addXyz(position, { y: aabb.y }));
    },
    get right() {
      return projectWorldXyzToScreenX(addXyz(position, { y: aabb.y }));
    },
    get c011() {
      return projectWorldXyzToScreenXy(
        addXyz(position, { y: aabb.y, z: aabb.z }),
      );
    },
    get c100() {
      return projectWorldXyzToScreenXy(addXyz(position, { x: aabb.x }));
    },
    get left() {
      return projectWorldXyzToScreenX(addXyz(position, { x: aabb.x }));
    },
    get c101() {
      return projectWorldXyzToScreenXy(
        addXyz(position, { x: aabb.x, z: aabb.z }),
      );
    },
    get c110() {
      return projectWorldXyzToScreenXy(
        addXyz(position, { x: aabb.x, y: aabb.y }),
      );
    },
    get c111() {
      return projectWorldXyzToScreenXy(addXyz(position, aabb));
    },
    get top() {
      return projectWorldXyzToScreenY(addXyz(position, aabb));
    },

    projectCorner(cornerVector: Xyz) {
      return projectWorldXyzToScreenXy(
        addXyz(position, {
          x: cornerVector.x * aabb.x,
          y: cornerVector.y * aabb.y,
          z: cornerVector.z * aabb.z,
        }),
      );
    },

    get allAxesProjections(): ProjectionOnAxes {
      const { topLeft, topRight, bottomCentre } = this;

      return {
        /** get the C of the sloped line a line running along the x-axis would project to
         * a (projected) line along the (world) x axis of the projected is described by:
         *  [y = x/2 - c]
         *  = [c = y + x/2]
         * a greater c means projected higher on the screen -ie, a higher value in y and/or z (world-x is orthogonal)
         */
        xAxisProjectionMin: topLeft.y + topLeft.x / 2,
        xAxisProjectionMax: bottomCentre.y + bottomCentre.x / 2,

        /** get the C of the sloped line a line running along the y-axis would project to
         * a (projected) line along the (world) y axis of the projected is described by:
         *  [y = x/2 - c]
         *  [c = y - x/2]
         * a greater c means projected higher on the screen -ie, a higher value in y and/or z (world-x is orthogonal)
         */
        yAxisProjectionMin: topRight.y - topRight.x / 2,
        yAxisProjectionMax: bottomCentre.y - bottomCentre.x / 2,

        // get the x of the vertical line a line running along the z-axis would project to
        // (this is equivalent to .left and .right)
        zAxisProjectionMin: topLeft.x,
        zAxisProjectionMax: topRight.x,
      };
    },
  };
};
