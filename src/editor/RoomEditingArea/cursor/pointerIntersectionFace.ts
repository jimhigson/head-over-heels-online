import {
  projectApparentBottomCentre,
  projectApparentTopLeft,
  projectApparentTopRight,
} from "../../../game/render/sortZ/projectAabbCorners";
import { rotateXyzByInverseCameraAngle } from "../../../utils/vectors/cameraAngleVectors";
import { scaleXyz, type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import { type Tool } from "../interactivity/Tool";

const up = { z: 1, x: 0, y: 0 };
/** the apparent (camera-space) face on the screen-lower-left of an item */
const towards = { z: 0, x: 0, y: -1 };
/** the apparent (camera-space) face on the screen-right of an item */
const right = { z: 0, x: -1, y: 0 };

/**
 * if we already know that the pointer intersects an item, get the face the
 * pointer is over, as a physical (world-space) face normal - at rotated camera
 * angles the apparent face under the pointer belongs to a different physical
 * face of the item
 */
export const pointerIntersectionFace = (
  item: EditorUnionOfAllItemInPlayTypes,
  { x, y }: Xy,
  tool: Tool,
  cameraAngle: Xy,
): Xyz => {
  if (
    tool.type === "item" &&
    tool.item.type === "door" &&
    item.type === "wall"
  ) {
    const wallDirection = item.config.direction;
    // for placing doors on walls, only consider the face of the wall
    // that is going into the room
    return scaleXyz(wallDirection, -1);
  }

  /*
   * normal case - consider the three visible plans of the aabb:
   * up, towards and right
   *
   * find <face> by finding the side on each of 3 lines based on 3 [corners]:
   *            .
   *           / \
   *          /   \
   *         /     \
   *        /       \
   *  [tl] /  <up>   \ [tr]
   *      |\         /|
   *      | \       / |
   *      |  \x   y/  |
   *      |   \   /   |
   *      |<Tw>\ /<Rt>|             z
   *       \    V    /              |
   *        \   |z  /            x\ | /y
   *         \  |  /               \|/
   *          \ | /                 v
   *           \|/
   *            V
   *           [bc]
   */
  // using the physical box, not renderAabb, so doors can be placed on walls above where they render
  const { box } = item.state;

  const bottomCentre = projectApparentBottomCentre(box, cameraAngle);
  const topLeft = projectApparentTopLeft(box, cameraAngle);
  const topRight = projectApparentTopRight(box, cameraAngle);

  const aboveXLine = y < topLeft.y - (topLeft.x - x) / 2;

  const apparentFace =
    aboveXLine ?
      y < topRight.y - (x - topRight.x) / 2 ?
        up
      : right
    : x < bottomCentre.x ? towards
    : right;

  return rotateXyzByInverseCameraAngle(apparentFace, cameraAngle);
};
