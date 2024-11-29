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

/** sorts sprites in z by the z-pairs given in zPairs function */
export const sortByZPairs = (
  pairs: ZPairs,
  items: Record<string, UnknownItemInPlay>,
) => {
  let itemOrder: string[];
  try {
    itemOrder = toposort(pairs);
  } catch (e) {
    if (e instanceof CyclicDependencyError) {
      const cyclicItems = e.cyclicDependency as Array<string>;

      const logItem = (id: string) => {
        const {
          state: { position },
          aabb,
        } = items[id];
        return `${id} @${JSON.stringify(position)} bb:${JSON.stringify(aabb)}`;
      };

      throw new Error(
        `found a cyclic dependency in the draw order - cyclic nodes are: \n\t${cyclicItems.map(logItem).join(" --in-front-of--> \n\t")}`,
        e,
      );
    } else {
      throw e;
    }
  }
  for (let i = 0; i < itemOrder.length; i++) {
    const item = items[itemOrder[i]];
    if (item.positionContainer === undefined) {
      throw new Error(
        `Item id=${itemOrder[i]} does not have a position container - cannot assign a z-index - position it before sorting it`,
      );
    }
    item.positionContainer.zIndex = i;
  }
};
