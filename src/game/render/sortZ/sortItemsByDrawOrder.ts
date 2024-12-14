import type { DrawOrderComparable } from "./zComparator";
import { zComparator } from "./zComparator";
import type { GraphEdges } from "./toposort/toposort";
import { CyclicDependencyError, toposort } from "./toposort/toposort";

export const zEdges = <TItem extends DrawOrderComparable>(
  items: Iterable<TItem>,
): GraphEdges<string> => {
  const edges: GraphEdges<string> = new Map();

  // TODO: rewrite as a generator
  for (const itemI of items) {
    if (!itemI.renders) {
      continue;
    }

    for (const itemJ of items) {
      if (itemI === itemJ) {
        break;
      }
      if (!itemJ.renders) {
        continue;
      }

      const comparison = zComparator(itemI, itemJ);

      if (comparison === 0) {
        continue;
      }

      const front = comparison > 0 ? itemI.id : itemJ.id;
      const back = comparison > 0 ? itemJ.id : itemI.id;

      if (!edges.has(front)) {
        edges.set(front, new Set());
      }
      edges.get(front)?.add(back);
    }
  }

  return edges;
};

export type SortByZPairsReturn = {
  order: string[];
  impossible: boolean;
};

/** sorts sprites in z by the z-pairs given in zPairs function - returns an order as a sorted list of item ids
 *
 * Note that in the case of cyclic dependencies, this function MODIFIED the @param edges until it can run
 */
export const sortByZPairs = (
  edges: GraphEdges<string>,
  items: Record<string, DrawOrderComparable>,
  retries: number = 3,
): SortByZPairsReturn => {
  try {
    return { order: toposort(edges), impossible: false };
  } catch (e) {
    if (e instanceof CyclicDependencyError) {
      const cyclicItemIds = e.cyclicDependency as Array<string>;

      // it is inevitable that cyclist dependencies will happen in very rare cases (the test room contains one on purpose) - in
      // this case there is no way to render the nodes correctly using z-order and painters algorithm. All I can do is break the
      // loop by removing one link and try again.
      edges.get(cyclicItemIds[0])?.delete(cyclicItemIds[1]);

      return {
        order: sortByZPairs(edges, items, retries - 1).order,
        impossible: true,
      };
    } else {
      throw e;
    }
  }
};
