import { editorStore } from "../../store/store";
import { commandAction } from "./commandAction";
import { type EditorCommand } from "./EditorCommand";

/**
 * resolves once the command has finished, most dispatches are synchronous, but
 * thunks can be async and ui elements dispatching them can wait on them to finish
 */
export const runCommand = async (command: EditorCommand): Promise<void> => {
  await editorStore.dispatch(commandAction(command));
};
