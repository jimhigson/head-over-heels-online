import { type RenderBoxes } from "../../../game/render/renderBox/makeItemRenderBoxAtCameraAngle";
import { DrawOrderBroadPhase } from "../../../game/render/sortZ/DrawOrderBroadPhase";
import { updateZEdges } from "../../../game/render/sortZ/updateZEdges";
import { itemBehaviourKey } from "../../../model/ItemInPlay";
import { Graph } from "../../../utils/graph/Graph";
import { type Xy } from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import { type PointerItemIntersection } from "./pointIntersectsItemAABB";

type FixedZIndexItem = EditorUnionOfAllItemInPlayTypes & {
  readonly [itemBehaviourKey]: { readonly fixedZIndex: number };
};

const isFixedZIndexItem = (
  i: EditorUnionOfAllItemInPlayTypes,
): i is FixedZIndexItem => i[itemBehaviourKey].fixedZIndex !== undefined;

const intersectionPrecedence = [
  // rendered are highest:
  "intersects-rendered",
  // then what the preview overrode (so the pointer stays on
  "intersects-overridden-by-preview",
  // then everything else unrendered
  "intersects-unrendered",
] as const satisfies PointerItemIntersection[];

export const frontItemFromPointerIntersections = (
  intersections: Array<
    [EditorUnionOfAllItemInPlayTypes, PointerItemIntersection]
  >,
  cameraAngle: Xy,
  /** the drawn extents, from the editor's room renderer */
  renderBoxes: RenderBoxes<EditorUnionOfAllItemInPlayTypes>,
): EditorUnionOfAllItemInPlayTypes | undefined => {
  // find the highest-precedence kind of intersection that appears in the intersections list,
  // only this intersection type will be considered
  const highestPrecedenceIntersectionType = intersectionPrecedence.find(
    (intersection) => intersections.some(([, int]) => int === intersection),
  );

  // filter out intersections that are not of the highest precedence type that we
  // have available to choose from:
  const items = intersections
    .filter(([, int]) => int === highestPrecedenceIntersectionType)
    .map(([item]) => item);

  if (items.every(isFixedZIndexItem)) {
    // all items have fixed z-index (don't work in topographic sort) - return
    // the highest from them:
    // this is how doors can get put on invisible walls, because they have fixed z-indexes
    // (but they prefer visible walls)
    return items
      .toSorted(
        (ia, ib) =>
          ib[itemBehaviourKey].fixedZIndex - ia[itemBehaviourKey].fixedZIndex,
      )
      .at(0);
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
  // SMELL: this re-derives draw order from scratch on every pointer event, over
  // only the items under the pointer - so constraints running through excluded
  // items are missing and the answer can disagree with what the renderer
  // actually drew. The room renderer resolves a full-room order every tick
  // already; asking it which of these items it drew last would be both cheaper
  // and correct. That needs the sort to keep each node's position (which would
  // also answer "the frontmost" without sorting again here), and the renderer
  // to expose the query - it already hands this function its render boxes
  const broadPhase = new DrawOrderBroadPhase<EditorUnionOfAllItemInPlayTypes>(
    cameraAngle,
  );
  broadPhase.updateManyItems(
    sortableItemsSet,
    renderBoxes,
    // the editor is always settled at a quarter angle:
    cameraAngle,
  );
  const zEdges = new Graph<EditorUnionOfAllItemInPlayTypes>();
  updateZEdges(sortableItemsSet, broadPhase, zEdges, renderBoxes);
  const order = zEdges.topologicalSortInPlace();

  // items are sorted back-to-front, so we need the last one this could be more efficient than
  // doing a full sort - just get the last node from the graph instead
  return order.at(-1);
};
