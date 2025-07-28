import nanoEqual from "nano-equal";
import {
  useAppSelectorWithLevelEditorSlice,
  selectTool,
} from "../slice/levelEditorSlice";
import type { ItemTool } from "../Tool";

export const useIsCurrentItemTool = (itemTool: ItemTool) => {
  const currentTool = useAppSelectorWithLevelEditorSlice(selectTool);
  return nanoEqual(currentTool?.type === "item" && currentTool.item, itemTool);
};
