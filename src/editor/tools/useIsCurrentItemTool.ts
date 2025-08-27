import nanoEqual from "nano-equal";

import type { ItemTool } from "../Tool";

import {
  selectTool,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const useIsCurrentItemTool = (itemTool: ItemTool) => {
  const currentTool = useAppSelectorWithLevelEditorSlice(selectTool);
  return nanoEqual(currentTool?.type === "item" && currentTool.item, itemTool);
};
