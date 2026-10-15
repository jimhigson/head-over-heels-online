import nanoEqual from "nano-equal";

import { type EditorRootState } from "../../store/store";
import { selectTool } from "../slice/levelEditorSlice";
import { type EditorCommand } from "./EditorCommand";

/**
 * whether the command shows as active - for an item tool, whether it is the
 * current tool. Undefined for commands with no on/off state
 */
export const selectCommandIsActive = (
  command: EditorCommand,
  state: EditorRootState,
): boolean | undefined => {
  if (command.type === "itemTool") {
    const currentTool = selectTool(state);
    return nanoEqual(
      currentTool.type === "item" && currentTool.item,
      command.itemTool,
    );
  }
  return command.selectIsActive?.(state);
};
