import type { EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import type { Tool } from "../../Tool";

import { projectAabbCorners } from "../../../game/render/sortZ/projectAabbCorners";
import {
  lengthXy,
  subXy,
  visibleCornerVectorsXyz,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";

export const cornerTolerancePx = 3;

/**
 * get the corner of the item being pointed at
 */
export const pointerIntersectionCorner = (
  item: EditorUnionOfAllItemInPlayTypes,
  { x, y }: Xy,
  _tool: Tool,
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
  const projections = projectAabbCorners(
    item.state.position,
    // using aabb, not renderAabb, so doors can be placed on walls above where they render
    item.aabb,
  );

  return visibleCornerVectorsXyz.find((cornerVector) => {
    const projectedCorner = projections.projectCorner(cornerVector);
    const distanceToProjectedCorner = lengthXy(
      subXy(projectedCorner, { x, y }),
    );
    return distanceToProjectedCorner < cornerTolerancePx;
  });
};
