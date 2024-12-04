import type { UnknownItemInPlay } from "@/model/ItemInPlay";
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
  items: Record<string, UnknownItemInPlay>,
): string[] => {
  try {
    return toposort(pairs);
  } catch (e) {
    if (e instanceof CyclicDependencyError) {
      const cyclicItems = e.cyclicDependency as Array<string>;

      const logItem = (id: string) => {
        const {
          state: { position },
          aabb,
          config,
        } = items[id];
        return `${id} @${JSON.stringify(position)} bb:${JSON.stringify(aabb)} [${JSON.stringify(config)}]`;
      };

      throw new Error(
        `found a cyclic dependency in the draw order - cyclic nodes are: \n\t${cyclicItems.map(logItem).join(" --in-front-of--> \n\t")}`,
        e,
      );
    } else {
      throw e;
    }
  }
};
