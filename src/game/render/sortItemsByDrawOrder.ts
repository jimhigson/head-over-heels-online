import { UnknownItemInPlay } from "@/model/ItemInPlay";
import { drawOrderComparator } from "../render/zComparator";
import toposort from "toposort";

export const sortItemsByDrawOrder = (items: UnknownItemInPlay[]) => {
  // TODO: filter items to just renderable first, then put non-renderables at the end
  // TODO: only revaluate items that have moved (if we keep the inFrontOfPairs from the last frame)
  //  - but only if this optimisation helps

  const isBehindPairs: [UnknownItemInPlay, UnknownItemInPlay][] = [];

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

      const comparison = drawOrderComparator(itemI, itemJ);

      if (comparison === 0) {
        continue;
      }

      if (comparison > 0) {
        isBehindPairs.push([itemJ, itemI]);
      } else {
        isBehindPairs.push([itemI, itemJ]);
      }
    }
  }

  let resorted: UnknownItemInPlay[];
  try {
    resorted = toposort(isBehindPairs);
  } catch (e) {
    throw new Error(
      `found a cyclic dependency in the draw order pairs are:\n\t${isBehindPairs.map(([front, behind]) => `${front.id} is behind ${behind.id}`).join("\n\t")}`,
      e as Error,
    );
  }
  for (let i = 0; i < resorted.length; i++) {
    resorted[i].positionContainer!.zIndex = i;
  }
};
