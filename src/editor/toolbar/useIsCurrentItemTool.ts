import nanoEqual from "nano-equal";

import type { ItemTool } from "../RoomEditingArea/interactivity/Tool";

import { useEditorAppSelector } from "../../store/store";
import { selectTool } from "../slice/levelEditorSlice";

export const useIsCurrentItemTool = (itemTool: ItemTool) => {
  const currentTool = useEditorAppSelector(selectTool);
  return nanoEqual(currentTool?.type === "item" && currentTool.item, itemTool);
};
