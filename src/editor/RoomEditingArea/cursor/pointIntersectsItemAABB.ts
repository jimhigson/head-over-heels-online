import type { EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import type { Tool } from "../interactivity/Tool";

import {
  projectBottomCentre,
  projectTopLeft,
  projectTopRight,
} from "../../../game/render/sortZ/projectAabbCorners";
import {
  addXyz,
  originXyz,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";

const itemVisibleBounds = (
  item: EditorUnionOfAllItemInPlayTypes,
  tool: Tool,
  allowOutsideRender: boolean,
): {
  position: Xyz;
  aabb: Xyz;
} => {
  if (allowOutsideRender) {
    // putting items on walls is a special case since we want to be able
    // to point high on walls, above where they render
    return {
      position: item.state.position,
      aabb: item.aabb,
    };
  }

  return {
    position: addXyz(item.state.position, item.renderAabbOffset ?? originXyz),
    aabb: item.renderAabb ?? item.aabb,
  };
};

export const pointIntersectsAABB = (
  /**
   * the pointer screen location
   */
  { x: pX, y: pY }: Xy,
  position: Xyz,
  // using aabb, not renderAabb, so doors can be placed on walls above where they render
  aabb: Xyz,
) => {
  const bottomCentre = projectBottomCentre(position);
  const topLeft = projectTopLeft(position, aabb);
  const topRight = projectTopRight(position, aabb);

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

export type PointerItemIntersection =
  | "intersects-rendered"
  | "intersects-unrendered";
export type PointerItemMaybeIntersection =
  | "non-intersecting"
  | PointerItemIntersection;

export const pointIntersectsItemAABB = (
  pointerXy: Xy,
  tool: Tool,
  item: EditorUnionOfAllItemInPlayTypes,
): PointerItemMaybeIntersection => {
  const { position: renderPos, aabb: renderAabb } = itemVisibleBounds(
    item,
    tool,
    false,
  );

  if (pointIntersectsAABB(pointerXy, renderPos, renderAabb)) {
    return "intersects-rendered";
  }

  // can place items on walls above where they render, to allow items to be placed high in levels:
  // however, this is a lower precedence than if the pointer is also over something visible
  const allowOutsideRender = tool.type === "item" && item.type === "wall";

  if (allowOutsideRender) {
    const { position, aabb } = itemVisibleBounds(item, tool, true);
    if (pointIntersectsAABB(pointerXy, position, aabb)) {
      return "intersects-unrendered";
    }
  }

  return "non-intersecting";
};
