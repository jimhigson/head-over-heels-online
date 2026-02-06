//# allFunctionsCalledOnLoad

import { objectValues } from "iter-tools-es";

import type { DrawOrderComparable } from "./DrawOrderComparable";

import { GridSpatialIndex } from "../../physics/gridSpace/GridSpatialIndex";
import { addEdge, deleteEdge, type ZGraph } from "./GraphEdges";
import { zComparator } from "./zComparator";

/**
 * returns a list of what is in front of what, ie:
 *
 * order back->front is important, because it is ultimately the back item that has to
 * 'do' something - it needs to mask itself with the front if there's a cycle found
 *
 * ```ts
 *    Map{ 'idOfItemBehind' => Set{ 'idOfItemInFront' } }
 * ```
 */
export const updateZEdges = <
  TItem extends DrawOrderComparable & { id: Tid },
  Tid extends string,
>(
  items: Record<Tid, TItem>,
  // if no spatial index is given, make one for the items we are concerned with.
  // this should not be done in-game, since the index can be kept between frames
  // and minimally updated
  spatialIndex: GridSpatialIndex<string, Tid, TItem> = new GridSpatialIndex(
    objectValues(items),
  ),
  /**
   * the nodes that have moved - nodes that did not move are not considered
   *  - if not given, wil consider all
   */
  moved: Iterable<TItem> = objectValues(items),
  /**
   * if given, will create an incremental update starting from the previous edges
   */
  zEdges: ZGraph<Tid> = new Map(),
): ZGraph<Tid> => {
  // track items that have already been compared to cut out duplicate comparisons:
  const comparisonsDone: Map<TItem, Set<TItem>> = new Map();

  // sanitise the given zEdges for nodes that no longer exist - this
  // is important for incremental updates:
  for (const [behind, fronts] of zEdges) {
    if (!items[behind]) {
      zEdges.delete(behind);
    } else {
      for (const [f] of fronts) {
        if (!items[f]) {
          deleteEdge(zEdges, behind, f);
        }
      }
    }
  }

  // we are the only code that uses the projected index, and we know what
  // moved on this frame - it is our responsibility to update the index
  // for the moved items. this way, multiple physics sub-ticks can run, each moving
  // the items multiple times, but we wil just do this once per rendering
  for (const item of moved) {
    spatialIndex.updateItemProjectedIndex(item);
  }

  for (const itemI of moved) {
    if (itemI.fixedZIndex !== undefined) {
      continue;
    }

    const projectionNeighbourhood =
      spatialIndex.getItemProjectedNeighbourhood(itemI);

    {
      // remove all edges (either way) with items not in this items
      // projectionNeighbourhood:
      const outgoing = zEdges.get(itemI.id);
      outgoing?.forEach((_edgeData, front) => {
        if (!projectionNeighbourhood.has(items[front])) {
          outgoing.delete(front);
        }
      });
      zEdges.forEach((fronts, behind) => {
        if (!projectionNeighbourhood.has(items[behind])) {
          deleteEdge(zEdges, behind, itemI.id);
        }
      });
    }

    // moved nodes are compared against all nodes in its neighbourhood (moving or not):
    // - only unmoved/unmoved pairs can be skipped since they
    // are known not to have changed
    // ie - every moved node is compared again against every other node
    // console.log(
    //   itemI.id,
    //   "'s projection neighbourhood size is",
    //   projectionNeighbourhood.size,
    // );
    for (const itemJ of projectionNeighbourhood) {
      //console.log(itemI.id, "'s projection neighbourhood includes", itemJ.id);

      if (
        itemJ.fixedZIndex !== undefined ||
        // already compared the other way:
        comparisonsDone.get(itemJ)?.has(itemI)
      ) {
        continue;
      }

      const comparison = zComparator(itemI, itemJ, spatialIndex);

      if (!comparisonsDone.has(itemI)) {
        comparisonsDone.set(itemI, new Set());
      }
      comparisonsDone.get(itemI)!.add(itemJ);

      if (comparison === 0) {
        deleteEdge(zEdges, itemI.id, itemJ.id);
        deleteEdge(zEdges, itemJ.id, itemI.id);
        continue;
      }

      const front = comparison > 0 ? itemI.id : itemJ.id;
      const back = comparison > 0 ? itemJ.id : itemI.id;

      addEdge(zEdges, back, front, false);

      // can't link the other way - delete if it does:
      deleteEdge(zEdges, front, back);
    }
  }

  //console.log(comparisonCount);
  return zEdges;
};
