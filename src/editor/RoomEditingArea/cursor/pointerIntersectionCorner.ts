import {
  apparentHiddenCornerVector,
  projectCorner,
} from "../../../game/render/sortZ/projectAabbCorners";
import {
  allCornerVectorsXyz,
  lengthXy,
  subXy,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import { type Tool } from "../interactivity/Tool";

const cornerTolerancePx = 3;

/**
 * get the corner of the item being pointed at, as a physical (world-space)
 * corner vector
 */
export const pointerIntersectionCorner = (
  item: EditorUnionOfAllItemInPlayTypes,
  { x, y }: Xy,
  _tool: Tool,
  cameraAngle: Xy,
): undefined | Xyz => {
  // TODO: may also need a special case like this:
  // if (
  //   tool.type === "item" &&
  //   tool.item.type === "door" &&
  //   item.type === "wall"
  // ) {
  //   // for placing doors on walls, only consider the face of the wall
  //   // that is towards the room:
  //   return oppositeDirection(item.config.direction);
  // }
  /*
   * find [corner]
   *            .[1,1,1]
   *           / \
   *          /   \
   *         /     \
   *        /       \
   *       /        [0,1,1]
   * [1,0,1]         /|
   *      | \       / |
   *      |  \x   y/  |
   *      |   \   /   |
   * [1,0,0]   \ /    |[0,1,0]
   *       \  [0,0,1]/
   *        \   |z  /
   *         \  |  /
   *          \ | /
   *           \|/
   *            V
   *           [0,0,0]
   */
  // the base-level corner behind the box at this camera angle is the only one
  // that can't be pointed at:
  const hiddenCorner = apparentHiddenCornerVector(cameraAngle);

  return allCornerVectorsXyz
    .filter(
      (cornerVector) =>
        !(
          cornerVector.x === hiddenCorner.x &&
          cornerVector.y === hiddenCorner.y &&
          cornerVector.z === hiddenCorner.z
        ),
    )
    .find((cornerVector) => {
      const projectedCorner = projectCorner(
        item.state.position,
        // using aabb, not renderAabb, so doors can be placed on walls above where they render
        item.aabb,
        cornerVector,
        cameraAngle,
      );
      const distanceToProjectedCorner = lengthXy(
        subXy(projectedCorner, { x, y }),
      );
      return distanceToProjectedCorner < cornerTolerancePx;
    });
};
