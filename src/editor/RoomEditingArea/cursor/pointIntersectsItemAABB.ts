import { type RenderBoxes } from "../../../game/render/renderBox/makeItemRenderBoxAtCameraAngle";
import {
  projectApparentBottomCentre,
  projectApparentTopLeft,
  projectApparentTopRight,
} from "../../../game/render/sortZ/projectAabbCorners";
import { isWallDirectionHiddenAtAngle } from "../../../model/json/WallJsonConfig";
import {
  addXyz,
  boxWithSize,
  originXyz,
  type Xy,
  type XyzBox,
} from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import { type Tool } from "../interactivity/Tool";

/**
 * the box an item draws into, or undefined when it draws nothing that can be
 * pointed at
 */
const itemDrawnBox = (
  item: EditorUnionOfAllItemInPlayTypes,
  cameraAngle: Xy,
  renderBoxes: RenderBoxes<EditorUnionOfAllItemInPlayTypes>,
): Readonly<XyzBox> | undefined => {
  if (!renderBoxes.has(item)) {
    // not in the render world (or asked for before the room renderer had
    // reconciled its boxes) - nothing is drawn, so nothing to point at.
    // Membership is the only way to tell this from an item that is in the
    // render world but needs no box, since both read back as undefined
    return undefined;
  }

  const renderBox = renderBoxes.get(item);

  if (renderBox === undefined) {
    // no box was needed: the item draws true to its physical box. Hidden walls
    // are the exception - they get no box because they draw nothing at all, and
    // a wall's physical box reaches up out of the room, which would otherwise
    // swallow every pointer position above the room's floor
    return (
        item.type === "wall" &&
          isWallDirectionHiddenAtAngle(item.config.direction, cameraAngle)
      ) ?
        undefined
      : item.state.box;
  }

  return boxWithSize(
    addXyz(item.state.box, renderBox.renderAabbOffset ?? originXyz),
    renderBox.renderAabb,
  );
};

const pointIntersectsAABB = (
  /**
   * the pointer screen location
   */
  { x: pX, y: pY }: Xy,
  /** the box to test against - the drawn extent, or the physical box for
   * walls (so doors can be placed on walls above where they render) */
  box: Readonly<XyzBox>,
  cameraAngle: Xy,
) => {
  const bottomCentre = projectApparentBottomCentre(box, cameraAngle);
  const topLeft = projectApparentTopLeft(box, cameraAngle);
  const topRight = projectApparentTopRight(box, cameraAngle);

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

/**
 * takes an item @param item and returns if/how the point given in
 * @param pointerXy intersects it
 */
export const pointIntersectsItemAABB = (
  pointerXy: Xy,
  tool: Tool,
  item: EditorUnionOfAllItemInPlayTypes,
  cameraAngle: Xy,
  /** the drawn extents, from the editor's room renderer */
  renderBoxes: RenderBoxes<EditorUnionOfAllItemInPlayTypes>,
): PointerItemMaybeIntersection => {
  const drawnBox = itemDrawnBox(item, cameraAngle, renderBoxes);

  if (
    drawnBox !== undefined &&
    pointIntersectsAABB(pointerXy, drawnBox, cameraAngle)
  ) {
    return "intersects-rendered";
  }

  // can place items on walls above where they render, to allow items to be placed high in levels:
  // however, this is a lower precedence than if the pointer is also over something visible
  const allowOutsideRender = tool.type === "item" && item.type === "wall";

  if (allowOutsideRender) {
    // a wall's physical box reaches up out of the room, so pointing high on it
    // still lands on the wall:
    if (pointIntersectsAABB(pointerXy, item.state.box, cameraAngle)) {
      return "intersects-unrendered";
    }
  }

  return "non-intersecting";
};
