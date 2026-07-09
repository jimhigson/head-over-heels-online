import { type SetRequired } from "type-fest";

import { type RenderBoxes } from "../../../game/render/renderBox/makeItemRenderBoxAtCameraAngle";
import { type ZGraph } from "../../../game/render/sortZ/GraphEdges";
import { toposort } from "../../../game/render/sortZ/toposort/toposort";
import { updateZEdges } from "../../../game/render/sortZ/updateZEdges";
import { VisualIndex } from "../../../game/render/sortZ/VisualIndex";
import { type Xy } from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import { type PointerItemIntersection } from "./pointIntersectsItemAABB";

const isFixedZIndexItem = (
  i: EditorUnionOfAllItemInPlayTypes,
): i is SetRequired<EditorUnionOfAllItemInPlayTypes, "fixedZIndex"> =>
  i.fixedZIndex !== undefined;

export const frontItemFromPointerIntersections = (
  intersections: Array<
    [EditorUnionOfAllItemInPlayTypes, PointerItemIntersection]
  >,
  cameraAngle: Xy,
  /** the drawn extents, from the editor's room renderer */
  renderBoxes: RenderBoxes<EditorUnionOfAllItemInPlayTypes>,
): EditorUnionOfAllItemInPlayTypes | undefined => {
  const someIntersectRendered = intersections.some(
    ([, int]) => int === "intersects-rendered",
  );

  const items =
    someIntersectRendered ?
      // if any items are intersecting rendered, throw out all that are intersecting
      // non-rendered (rendered takes precedence)
      intersections
        .filter(([, int]) => int === "intersects-rendered")
        .map(([item]) => item)
      // all are intersecting non-rendered, so consider order amongst all the non-rendered items:
    : intersections.map(([item]) => item);

  if (items.every(isFixedZIndexItem)) {
    // all items have fixed z-index (don't work in topographic sort) - return
    // the highest from them:
    // this is how doors can get put on invisible walls, because they have fixed z-indexes
    // (but they prefer visible walls)
    return items.toSorted((ia, ib) => ib.fixedZIndex - ia.fixedZIndex).at(0);
  }

  const topographicallySortableItems = items.filter(
    (i) => !isFixedZIndexItem(i),
  );

  if (topographicallySortableItems.length === 0) {
    return undefined;
  }

  if (topographicallySortableItems.length === 1) {
    return topographicallySortableItems[0];
  }

  const sortableItemsSet = new Set(topographicallySortableItems);
  const visualIndex = new VisualIndex<EditorUnionOfAllItemInPlayTypes>(
    cameraAngle,
  );
  visualIndex.updateManyItems(sortableItemsSet, sortableItemsSet, renderBoxes);
  const zEdges: ZGraph<EditorUnionOfAllItemInPlayTypes> = new Map();
  updateZEdges(
    sortableItemsSet,
    visualIndex,
    // all items have 'moved':
    sortableItemsSet,
    zEdges,
    renderBoxes,
  );
  const order = toposort(zEdges);

  // items are sorted back-to-front, so we need the last one this could be more efficient than
  // doing a full sort - just get the last node from the graph instead
  return order.at(-1);
};
