import type { JsonItemUnion } from "../model/json/JsonItem";

import { getJsonItemTimes } from "../model/times";

export const makeToasterConsolidationPredicate = (
  allItems: Record<string, JsonItemUnion>,
) => {
  const sleepingMonsters = Object.values(allItems).filter(
    (item) =>
      item.type === "monster" && item.config.activated === "after-player-near",
  );

  return (item: JsonItemUnion): boolean => {
    if (item.type !== "deadlyBlock" || item.config.style !== "toaster") {
      return true;
    }

    const times = getJsonItemTimes(item);
    const topOfToaster = item.position.z + times.z;

    return !sleepingMonsters.some(
      (monster) =>
        monster.position.z >= topOfToaster &&
        monster.position.z < topOfToaster + 1 &&
        monster.position.x >= item.position.x &&
        monster.position.x < item.position.x + times.x &&
        monster.position.y >= item.position.y &&
        monster.position.y < item.position.y + times.y,
    );
  };
};
