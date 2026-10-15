import { type EditorRootState } from "../../store/store";
import { type EditorCommand } from "./EditorCommand";

export const selectCommandIsAvailable = (
  command: EditorCommand,
  state: EditorRootState,
): boolean => command.selectIsAvailable?.(state) ?? true;
