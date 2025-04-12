import type { DrawOrderComparable } from "./zComparator";
import { zComparator } from "./zComparator";
import type { GraphEdges } from "./toposort/toposort";
import { CyclicDependencyError, toposort } from "./toposort/toposort";
import { objectValues } from "iter-tools";
import { emptyArray } from "../../../utils/empty";

const addEdge = <T>(edges: GraphEdges<T>, from: T, to: T) => {
  if (!edges.has(from)) {
    edges.set(from, new Set());
  }
  edges.get(from)!.add(to);
};

const deleteEdge = <T>(edges: GraphEdges<T>, from: T, to: T) => {
  const s = edges.get(from);
  if (s !== undefined) {
    s?.delete(to);
    if (s.size === 0) {
      edges.delete(from);
    }
  }
};

/**
 * returns a list of what is in front of what, ie:
 *
 * ```
 *    { 'idOfItemInFront: [ 'idOfItemInBack' ] }
 * ```
 */
export const zEdges = <TItem extends DrawOrderComparable, Tid extends string>(
  items: Record<Tid, TItem>,
  // the nodes that have moved - nodes that did not move are not considered
  moved: Set<TItem> = new Set(objectValues(items)),
  // if given, will create an incremental update starting from the previous edges
  inFrontOf: GraphEdges<Tid> = new Map(),
): GraphEdges<Tid> => {
  // track items that have already been compared to cut out duplicate comparisons:
  const comparisonsDone: GraphEdges<TItem> = new Map();

  // sanitise the given inFrontOf for nodes that no longer exist - this
  // is important for incremental updates:
  for (const [front, behinds] of inFrontOf) {
    if (!items[front]) {
      inFrontOf.delete(front);
    } else {
      for (const behind of behinds) {
        if (!items[behind]) {
          deleteEdge(inFrontOf, front, behind);
        }
      }
    }
  }

  // ⚠⚠ WARNING QUADRATIC LOOPING! ⚠⚠
  for (const itemI of moved) {
    if (!itemI.renders) {
      continue;
    }

    // moved nodes are compared against all nodes (moving or not):
    // - only unmoved/umomved pairs can be skipped since they
    // are known not to have changed
    for (const itemJ of objectValues(items) as Iterable<TItem>) {
      if (
        !itemJ.renders ||
        // already compared the other way:
        comparisonsDone.get(itemJ)?.has(itemI) ||
        // no point comparing to self:
        itemI === itemJ
      ) {
        continue;
      }

      const comparison = zComparator(itemI, itemJ);

      addEdge(comparisonsDone, itemI, itemJ);

      if (comparison === 0) {
        deleteEdge(inFrontOf, itemI.id, itemJ.id);
        deleteEdge(inFrontOf, itemJ.id, itemI.id);
        continue;
      }

      const front = comparison > 0 ? itemI.id : itemJ.id;
      const back = comparison > 0 ? itemJ.id : itemI.id;

      addEdge(inFrontOf, front, back);

      // can't link the other way - delete if it does:
      deleteEdge(inFrontOf, back, front);
    }
  }

  //console.log(comparisonCount);
  return inFrontOf;
};

export type SortByZPairsReturn<ItemId extends string> = {
  order: ItemId[];
  /** links that had to be broken due to cyclic dependencies */
  brokenLinks: [ItemId, ItemId][];
};

/** sorts sprites in z by the z-pairs given in zPairs function - returns an order as a sorted list of item ids
 *
 * Note that in the case of cyclic dependencies, this function MODIFIED the @param edges until it can run
 */
export const sortByZPairs = <ItemId extends string>(
  edges: GraphEdges<ItemId>,
  items: Record<ItemId, DrawOrderComparable>,
): SortByZPairsReturn<ItemId> => {
  try {
    return { order: toposort(edges), brokenLinks: emptyArray };
  } catch (e) {
    if (e instanceof CyclicDependencyError) {
      const cyclicItemIds = e.cyclicDependency as Array<ItemId>;

      // it is inevitable that cyclist dependencies will happen in quite rare cases (the test room 'laboratory' contains one on purpose) - in
      // this case there is no way to render the nodes correctly using z-order and painters algorithm. Break the normal link
      // for the sake of sorting and record a broken link:
      const brokenLink: [ItemId, ItemId] = [cyclicItemIds[0], cyclicItemIds[1]];
      edges.get(brokenLink[0])?.delete(brokenLink[1]);

      console.warn(
        "circular dependency detected: ",
        cyclicItemIds.map((id) => `🧊${id}`).join(" --front-of--> "),
        `\nbreaking link 🧊${brokenLink[0]} --> 🧊${brokenLink[1]}`,
      );

      const recursiveCall = sortByZPairs(edges, items);

      return {
        order: recursiveCall.order,
        brokenLinks: [brokenLink, ...recursiveCall.brokenLinks],
      };
    } else {
      // any other error - not expected so just rethrow
      throw e;
    }
  }
};
