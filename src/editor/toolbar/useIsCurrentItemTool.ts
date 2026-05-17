import nanoEqual from "nano-equal";

import { useEditorAppSelector } from "../../store/store";
import { type ItemTool } from "../RoomEditingArea/interactivity/Tool";
import { selectTool } from "../slice/levelEditorSlice";

export const useIsCurrentItemTool = (itemTool: ItemTool) => {
  const currentTool = useEditorAppSelector(selectTool);
  return nanoEqual(currentTool?.type === "item" && currentTool.item, itemTool);
};
