import { type EditorJsonItem } from "./editorTypes";

/**
 * towers only repeat vertically, so a block repeating along x or y can't be one
 */
export const canBlockBeTower = (
  blockConfig: EditorJsonItem<"block">["config"],
): boolean =>
  blockConfig.style === "tower" ||
  ((blockConfig.times?.x ?? 1) <= 1 && (blockConfig.times?.y ?? 1) <= 1);
