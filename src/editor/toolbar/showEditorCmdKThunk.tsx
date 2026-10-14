import { type EditorThunk } from "../../store/store";
import { showDialog } from "./showDialog";

/** open the editor's command palette, resolving once it closes */
export const showEditorCmdKThunk =
  (): EditorThunk<Promise<void>> => async () => {
    // imported when first opened: the palette lists every command, including
    // the one that opens it
    const { EditorCmdKDialog } = await import("./EditorCmdKDialog");
    await showDialog<void>((settle) => (
      <EditorCmdKDialog onClose={() => settle()} />
    ));
  };
