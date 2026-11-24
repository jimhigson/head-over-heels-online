import { getJsonItemTimes, optimiseTimesXyz } from "../model/times";
import type {
  EditorJsonItemUnion,
  EditorJsonItemWithTimes,
} from "./editorTypes";

const hasTimes = (item: EditorJsonItemUnion): item is EditorJsonItemWithTimes =>
  "times" in item.config;

/**
 * swap an item's x and y times, in place - for an item whose run has moved to
 * the other axis. No-op for an item with no times set
 */
export const swapItemTimesXyInPlace = (item: EditorJsonItemUnion): void => {
  if (hasTimes(item) && item.config.times !== undefined) {
    const { x, y, z } = getJsonItemTimes(item);
    const swappedTimes = optimiseTimesXyz({ x: y, y: x, z });
    if (swappedTimes === undefined) {
      delete item.config.times;
    } else {
      item.config.times = swappedTimes;
    }
  }
};
