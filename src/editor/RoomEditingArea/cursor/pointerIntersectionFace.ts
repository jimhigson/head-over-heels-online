import type { Xyz } from "../../../utils/vectors/vectors";
import type { EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import type { Tool } from "../../Tool";

import {
  projectBottomCentre,
  projectTopLeft,
  projectTopRight,
} from "../../../game/render/sortZ/projectAabbCorners";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { scaleXyz, type Xy } from "../../../utils/vectors/vectors";

const up = { z: 1, x: 0, y: 0 };
const towards = { z: 0, x: 0, y: -1 };
const right = { z: 0, x: -1, y: 0 };

/**
 * if we already know that the pointer intersects an item, get the face the pointer is over
 */
export const pointerIntersectionFace = (
  item: EditorUnionOfAllItemInPlayTypes,
  { x, y }: Xy,
  tool: Tool,
): Xyz => {
  if (
    tool.type === "item" &&
    tool.item.type === "door" &&
    item.type === "wall"
  ) {
    const wallDirection = item.config.direction;
    // for placing doors on walls, only consider the face of the wall
    // that is going into the room
    return scaleXyz(unitVectors[wallDirection], -1);
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
  // using aabb, not renderAabb, so doors can be placed on walls above where they render
  const { position } = item.state;
  const { aabb } = item;

  const bottomCentre = projectBottomCentre(position);
  const topLeft = projectTopLeft(position, aabb);
  const topRight = projectTopRight(position, aabb);

  const aboveXLine = y < topLeft.y - (topLeft.x - x) / 2;

  if (aboveXLine) {
    const aboveYLine = y < topRight.y - (x - topRight.x) / 2;

    return aboveYLine ? up : right;
  } else {
    const leftOfZLine = x < bottomCentre.x;

    return leftOfZLine ? towards : right;
  }
};
