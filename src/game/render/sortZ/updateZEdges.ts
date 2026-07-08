//# allFunctionsCalledOnLoad

import { addEdge, deleteEdge } from "../../../utils/graph/Graph";
import { type RenderBoxes } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { effectiveFixedZIndex } from "./fixedZIndexes";
import { type ZGraph } from "./GraphEdges";
import { type VisualIndex } from "./VisualIndex";
import { zComparator } from "./zComparator";

/**
 * updates `zEdges` in-place to hold what is in front of what, ie:
 *
 * order back->front is important, because it is ultimately the back item that has to
 * 'do' something - it needs to mask itself with the front if there's a cycle found
 *
 * ```ts
 *    Map{ itemBehind => Map{ itemInFront => broken } }
 * ```
 */
export const updateZEdges = <TItem extends DrawOrderComparable>(
  items: Set<TItem>,
  /** an up-to-date visual index containing the items in the items param Set */
  visualIndex: VisualIndex<TItem>,
  /**
   * the nodes that have moved - nodes that did not move are not considered.
   * Must be re-iterable since it is iterated twice, hence Array or Set (not iterable type)
   */
  movedItems: Array<TItem> | Set<TItem>,
  /**
   * updated in-place: an incremental update starting from the previous edges. Pass an empty Map if
   * starting from no knowledge, and that map will be updated
   */
  zEdges: ZGraph<TItem>,
  /** the drawn extents, owned by the caller (in-game, the room renderer) */
  renderBoxes: RenderBoxes<TItem>,
): void => {
  // track items that have already been compared to cut out duplicate comparisons:
  const comparisonsDone: Map<TItem, Set<TItem>> = new Map();

  // sanitise the given zEdges for nodes that no longer exist - this
  // is important for incremental updates:
  for (const [behind, fronts] of zEdges) {
    if (!items.has(behind)) {
      zEdges.delete(behind);
    } else {
      for (const [f] of fronts) {
        if (!items.has(f)) {
          deleteEdge(zEdges, behind, f);
        }
      }
    }
  }

  for (const itemI of movedItems) {
    if (effectiveFixedZIndex(itemI, visualIndex.cameraAngle) !== undefined) {
      continue;
    }

    const projectionNeighbourhood =
      visualIndex.getItemProjectedNeighbourhood(itemI);

    {
      // remove all edges (either way) with items not in this items
      // projectionNeighbourhood:
      const outgoing = zEdges.get(itemI);
      outgoing?.forEach((_edgeData, front) => {
        if (!projectionNeighbourhood.has(front)) {
          outgoing.delete(front);
        }
      });
      zEdges.forEach((_fronts, behind) => {
        if (!projectionNeighbourhood.has(behind)) {
          deleteEdge(zEdges, behind, itemI);
        }
      });
    }

    // moved nodes are compared against all nodes in its neighbourhood (moving or not):
    // - only unmoved/unmoved pairs can be skipped since they
    // are known not to have changed
    // ie - every moved node is compared again against every other node
    for (const itemJ of projectionNeighbourhood) {
      if (
        effectiveFixedZIndex(itemJ, visualIndex.cameraAngle) !== undefined ||
        // already compared the other way:
        comparisonsDone.get(itemJ)?.has(itemI)
      ) {
        continue;
      }

      const comparison = zComparator(itemI, itemJ, visualIndex, renderBoxes);

      if (!comparisonsDone.has(itemI)) {
        comparisonsDone.set(itemI, new Set());
      }
      comparisonsDone.get(itemI)!.add(itemJ);

      if (comparison === 0) {
        deleteEdge(zEdges, itemI, itemJ);
        deleteEdge(zEdges, itemJ, itemI);
        continue;
      }

      const front = comparison > 0 ? itemI : itemJ;
      const back = comparison > 0 ? itemJ : itemI;

      // edges are initially added as not broken - the sorting algo later might
      // find a cycle though and mark this as broken in order to defeat the cycle
      addEdge(zEdges, back, front, false);

      // can't link the other way - delete if it does:
      deleteEdge(zEdges, front, back);
    }
  }
};
