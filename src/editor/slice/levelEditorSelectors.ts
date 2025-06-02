import { selectorHook } from "../../utils/react/selectorHook";
import { selectCurrentEditingRoomJson } from "./levelEditorSlice";

export const useCurrentEditingRoomJson = selectorHook(
  selectCurrentEditingRoomJson,
);
