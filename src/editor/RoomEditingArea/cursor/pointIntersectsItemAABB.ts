import { projectAabbCorners } from "../../../game/render/sortZ/projectAabbCorners";
import type { Xy } from "../../../utils/vectors/vectors";
import type { EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import type { Tool } from "../../Tool";
import { itemVisibleBounds } from "./findPointerPointingAt";

export const pointIntersectsItemAABB =
  (
    /**
     * the pointer screen location
     */
    { x: pX, y: pY }: Xy,
    tool: Tool,
  ) =>
  (item: EditorUnionOfAllItemInPlayTypes) => {
    const { position, aabb } = itemVisibleBounds(item, tool);

    const { bottomCentre, topLeft, topRight } = projectAabbCorners(
      position,
      // using aabb, not renderAabb, so doors can be placed on walls above where they render
      aabb,
    );

    /*
     * check against each of 6 lines based on 3 [corners]:
     *
     *       /\
     *   y1 /  \ x2
     *[tl] /    \ [tr]
     *    |      |
     * z1 |      | z2
     *    |      |
     *     \    /
     *   x1 \  / y2
     *       \/
     *      [bc]
     */
    if (pX < topLeft.x) {
      // z1
      return false;
    }
    if (pX > topRight.x) {
      // z2
      return false;
    }
    if (pY < topRight.y - (topRight.x - pX) / 2) {
      // x2
      return false;
    }
    if (pY < topLeft.y - (pX - topLeft.x) / 2) {
      // y1
      return false;
    }
    if (pY > bottomCentre.y - (pX - bottomCentre.x) / 2) {
      // y2
      return false;
    }
    if (pY > bottomCentre.y - (bottomCentre.x - pX) / 2) {
      // x1
      return false;
    }
    return true;
  };
