import { setTool } from "../slice/levelEditorSlice";
import {
  type EditorCommand,
  type EditorCommandDispatchable,
} from "./EditorCommand";

/** get the dispatchable for running the command */
export const commandAction = (
  command: EditorCommand,
): EditorCommandDispatchable =>
  command.type === "itemTool" ?
    // itemTool actions describe the item instead of providing an action method,
    // this allows the in-game cheats to inspect and use these actions in the cheats cmd-k menu
    // to summon items.
    setTool({ type: "item", item: command.itemTool })
  : command.action();
