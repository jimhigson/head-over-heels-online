import { type RenderBoxes } from "../../../game/render/renderBox/makeItemRenderBoxAtCameraAngle";
import {
  projectApparentBottomCentre,
  projectApparentTopLeft,
  projectApparentTopRight,
} from "../../../game/render/sortZ/projectAabbCorners";
import {
  addXyz,
  originXyz,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import { type Tool } from "../interactivity/Tool";

const itemVisibleBounds = (
  item: EditorUnionOfAllItemInPlayTypes,
  tool: Tool,
  allowOutsideRender: boolean,
  renderBoxes: RenderBoxes<EditorUnionOfAllItemInPlayTypes>,
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

  const renderBox = renderBoxes.get(item);
  return {
    position: addXyz(
      item.state.position,
      renderBox?.renderAabbOffset ?? originXyz,
    ),
    aabb: renderBox?.renderAabb ?? item.aabb,
  };
};

const pointIntersectsAABB = (
  /**
   * the pointer screen location
   */
  { x: pX, y: pY }: Xy,
  position: Xyz,
  // using aabb, not renderAabb, so doors can be placed on walls above where they render
  aabb: Xyz,
  cameraAngle: Xy,
) => {
  const bottomCentre = projectApparentBottomCentre(position, aabb, cameraAngle);
  const topLeft = projectApparentTopLeft(position, aabb, cameraAngle);
  const topRight = projectApparentTopRight(position, aabb, cameraAngle);

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
  "intersects-rendered" | "intersects-unrendered";
export type PointerItemMaybeIntersection =
  "non-intersecting" | PointerItemIntersection;

export const pointIntersectsItemAABB = (
  pointerXy: Xy,
  tool: Tool,
  item: EditorUnionOfAllItemInPlayTypes,
  cameraAngle: Xy,
  /** the drawn extents, from the editor's room renderer */
  renderBoxes: RenderBoxes<EditorUnionOfAllItemInPlayTypes>,
): PointerItemMaybeIntersection => {
  const { position: renderPos, aabb: renderAabb } = itemVisibleBounds(
    item,
    tool,
    false,
    renderBoxes,
  );

  if (pointIntersectsAABB(pointerXy, renderPos, renderAabb, cameraAngle)) {
    return "intersects-rendered";
  }

  // can place items on walls above where they render, to allow items to be placed high in levels:
  // however, this is a lower precedence than if the pointer is also over something visible
  const allowOutsideRender = tool.type === "item" && item.type === "wall";

  if (allowOutsideRender) {
    const { position, aabb } = itemVisibleBounds(item, tool, true, renderBoxes);
    if (pointIntersectsAABB(pointerXy, position, aabb, cameraAngle)) {
      return "intersects-unrendered";
    }
  }

  return "non-intersecting";
};
