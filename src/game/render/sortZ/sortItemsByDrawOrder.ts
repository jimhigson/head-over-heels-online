import type { DrawOrderComparable } from "./zComparator";
import { zComparator } from "./zComparator";
import { CyclicDependencyError, toposort } from "./toposort";

export type ZPairs = [back: string, front: string][];

export const zPairs = <TItem extends DrawOrderComparable>(
  items: Iterable<TItem>,
): ZPairs => {
  const pairs: ZPairs = [];

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

      if (comparison > 0) {
        pairs.push([itemJ.id, itemI.id]);
      } else {
        pairs.push([itemI.id, itemJ.id]);
      }
    }
  }

  return pairs;
};

/** sorts sprites in z by the z-pairs given in zPairs function - returns an order as a sorted list of item ids */
export const sortByZPairs = (
  pairs: ZPairs,
  items: Record<string, DrawOrderComparable>,
  retries: number = 3,
): { order: string[]; impossible: boolean } => {
  try {
    return { order: toposort(pairs), impossible: false };
  } catch (e) {
    if (e instanceof CyclicDependencyError) {
      const cyclicItemIds = e.cyclicDependency as Array<string>;

      // it is inevitable that cyclist dependencies will happen in very rare cases (the test room contains one on purpose) - in
      // this case there is no way to render the nodes correctly using z-order and painters algorithm. All I can do is break the
      // loop by removing one link and try again.
      const pairToRemove = pairs.find(
        ([back, front]) =>
          cyclicItemIds.includes(back) && cyclicItemIds.includes(front),
      );
      if (pairToRemove === undefined) {
        throw new Error("could not find bad link");
      }
      return {
        order: sortByZPairs(
          pairs.filter((p) => p !== pairToRemove),
          items,
          retries - 1,
        ).order,
        impossible: true,
      };

      /*
      const logItem = (id: string) => {
        const {
          state: { position },
          aabb,
          config,
        } = items[id];
        return `${id} @${JSON.stringify(position)} bb:${JSON.stringify(aabb)} [${JSON.stringify(config)}]`;
      };

      
      console.info(
        "might want to copy this into a test to reproduce the cyclic dependency error:",
        cyclicItemIds.map((ciid) => {
          const ci = items[ciid];
          return {
            id: ciid,
            state: {
              position: ci.state.position,
            },
            aabb: ci.aabb,
            renders: ci.renders,
          };
        }),
      );

      throw new Error(
        `found a cyclic dependency in the draw order - cyclic nodes are: \n\t${cyclicItemIds.map(logItem).join(" --in-front-of--> \n\t")}`,
        // some json to copy and paste into a test:
        e,
      );*/
    } else {
      throw e;
    }
  }
};
