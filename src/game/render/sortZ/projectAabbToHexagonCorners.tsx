import { type Xyz, addXyz } from "../../../utils/vectors/vectors";
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
export const projectAabbToHexagonCorners = (position: Xyz, aabb: Xyz) => {
  const bottomCentre = projectWorldXyzToScreenXy(position);
  const topLeft = projectWorldXyzToScreenXy(
    addXyz(position, { x: aabb.x, z: aabb.z }),
  );
  const topRight = projectWorldXyzToScreenXy(
    addXyz(position, { y: aabb.y, z: aabb.z }),
  );
  return { bottomCentre, topLeft, topRight };
};
