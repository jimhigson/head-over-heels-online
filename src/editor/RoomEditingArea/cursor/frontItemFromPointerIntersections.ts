import type { SetRequired } from "type-fest";
import { updateZEdges } from "../../../game/render/sortZ/sortItemsByDrawOrder";
import type {
  EditorUnionOfAllItemInPlayTypes,
  EditorRoomItemId,
} from "../../editorTypes";
import type { PointerItemIntersection } from "./pointIntersectsItemAABB";
import { toposort } from "../../../game/render/sortZ/toposort/toposort";

const isFixedZIndexItem = (
  i: EditorUnionOfAllItemInPlayTypes,
): i is SetRequired<EditorUnionOfAllItemInPlayTypes, "fixedZIndex"> =>
  i.fixedZIndex !== undefined;

export const frontItemFromPointerIntersections = (
  intersections: Array<
    [EditorUnionOfAllItemInPlayTypes, PointerItemIntersection]
  >,
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

  const topographicallySortableItemsMap = Object.fromEntries(
    topographicallySortableItems.map((i) => [i.id, i]),
  ) as Record<EditorRoomItemId, EditorUnionOfAllItemInPlayTypes>;

  /**
   * note: zEdges will not include ids of items with fixed z order
   */
  const ze = updateZEdges(topographicallySortableItemsMap);
  const order = toposort(ze);

  // items are sorted back-to-front, so we need the last one:
  return topographicallySortableItemsMap[order.at(-1)!];
};
