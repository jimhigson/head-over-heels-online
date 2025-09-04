//# allFunctionsCalledOnLoad

import { objectValues } from "iter-tools";

import type { GridSpatialIndex } from "../../physics/gridSpace/GridSpatialIndex";
import type { DrawOrderComparable } from "./DrawOrderComparable";

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
  spatialIndex: GridSpatialIndex<string, Tid, TItem>,
  /**
   * the nodes that have moved - nodes that did not move are not considered
   *  - if not given, wil consider all
   */
  moved: Set<TItem> = new Set(objectValues(items)),
  /**
   * if given, will create an incremental update starting from the previous edges
   */
  zEdges: ZGraph<Tid> = new Map(),
): ZGraph<Tid> => {
  // track items that have already been compared to cut out duplicate comparisons:
  const comparisonsDone: Map<TItem, Set<TItem>> = new Map();

  // sanitise the given behindEdges for nodes that no longer exist - this
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

  for (const itemI of moved) {
    if (itemI.fixedZIndex !== undefined) {
      continue;
    }

    const projectionNeighbourhood = new Set(
      spatialIndex.iterateItemRectNeighbourhood(itemI),
    );

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
    for (const itemJ of projectionNeighbourhood) {
      if (
        itemJ.fixedZIndex !== undefined ||
        // already compared the other way:
        comparisonsDone.get(itemJ)?.has(itemI)
      ) {
        continue;
      }

      const comparison = zComparator(itemI, itemJ);

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
