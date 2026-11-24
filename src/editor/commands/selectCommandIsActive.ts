import type { EditorRootState } from "../../store/store";
import { isItemToolCurrent } from "../RoomEditingArea/interactivity/isItemToolCurrent";
import { selectTool } from "../slice/levelEditorSlice";
import type { EditorCommand } from "./EditorCommand";

/**
 * whether the command shows as active - for an item tool, whether it is the
 * current tool. Undefined for commands with no on/off state
 */
export const selectCommandIsActive = (
  command: EditorCommand,
  state: EditorRootState,
): boolean | undefined => {
  if (command.type === "itemTool") {
    return isItemToolCurrent(selectTool(state), command.items);
  }
  return command.selectIsActive?.(state);
};
