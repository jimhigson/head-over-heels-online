import { completeTimesXy } from "../model/times";
import type { EditorJsonItem } from "./editorTypes";

/**
 * towers only repeat vertically, so a block repeating along x or y can't be one
 */
export const canBlockBeTower = (
  blockConfig: EditorJsonItem<"block">["config"],
): boolean => {
  const timesCompleted = completeTimesXy(blockConfig.times);
  return (
    blockConfig.style === "tower" ||
    (timesCompleted.x <= 1 && timesCompleted.y <= 1)
  );
};
