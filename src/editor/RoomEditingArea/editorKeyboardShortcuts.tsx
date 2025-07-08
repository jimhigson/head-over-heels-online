import type { Key } from "../../game/input/keys";
import { store } from "../../store/store";
import { deleteSelected, redo, undo, setTool } from "../slice/levelEditorSlice";

export const editorKeyboardShortcuts = (event: KeyboardEvent) => {
  const key = event.key as Key;
  if (key === "Backspace" || key === "Delete") {
    store.dispatch(deleteSelected());
  }

  if (
    (key as string) === "z" ||
    key === "Z" //&&
    //(event.ctrlKey || event.metaKey)
  ) {
    // Ctrl+Z or Cmd+Z for undo - this may not work if the browser is taking
    // this keystroke over and not passing it down to Javascript
    store.dispatch(event.shiftKey ? redo() : undo());
  }

  if (
    (key as string) === "i" ||
    key === "I" || // i shortcut  for modern software (photoshop etc)
    key === "," // comma copies dpaint
    //(event.ctrlKey || event.metaKey)
  ) {
    // Ctrl+Z or Cmd+Z for undo - this may not work if the browser is taking
    // this keystroke over and not passing it down to Javascript
    store.dispatch(setTool({ type: "eyeDropper" }));
  }

  if ((key as string) === "Escape") {
    // stop using current tool and go back to the pointer:
    store.dispatch(setTool({ type: "pointer" }));
  }
};
