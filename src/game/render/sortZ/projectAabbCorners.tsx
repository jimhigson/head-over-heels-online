import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../projections";

/**
 * of the six visible corners of the projected cuboid aabb, we need to find three to describe
 * the bounds of the rendered shape
 *
 *     /\
 * tl /  \ tr
 *   |    |
 *   |    |
 *    \  /
 *     \/
 *     bc
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
    get c001() {
      return projectWorldXyzToScreenXy(addXyz(position, { z: aabb.z }));
    },
    get c010() {
      return projectWorldXyzToScreenXy(addXyz(position, { y: aabb.y }));
    },
    get c011() {
      return projectWorldXyzToScreenXy(
        addXyz(position, { y: aabb.y, z: aabb.z }),
      );
    },
    get c100() {
      return projectWorldXyzToScreenXy(addXyz(position, { x: aabb.x }));
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
    projectCorner(cornerVector: Xyz) {
      return projectWorldXyzToScreenXy(
        addXyz(position, {
          x: cornerVector.x * aabb.x,
          y: cornerVector.y * aabb.y,
          z: cornerVector.z * aabb.z,
        }),
      );
    },
  };
};
