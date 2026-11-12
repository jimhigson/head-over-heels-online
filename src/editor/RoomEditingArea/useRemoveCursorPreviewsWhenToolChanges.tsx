import { isAnyOf } from "@reduxjs/toolkit";
import { useEffect } from "preact/hooks";

import { startEditorListening } from "../../store/listenerMiddleware";
import {
  resetPreviewedEdits,
  resetTool,
  setTool,
  togglePointerTool,
} from "../slice/levelEditorSlice";
import { useOpenRoomPane } from "./useOpenRoomPane";

const isToolChoice = isAnyOf(setTool, resetTool, togglePointerTool);

export const useRemoveCursorPreviewsWhenToolChanges = () => {
  const { editable } = useOpenRoomPane();
  useEffect(() => {
    // only an editable open room has tools:
    if (!editable) {
      return;
    }
    return startEditorListening({
      // choosing the tool already in use leaves its previews alone:
      predicate: (action, currentState, previousState) =>
        isToolChoice(action) &&
        currentState.levelEditor.tool !== previousState.levelEditor.tool,
      effect(_action, { dispatch }) {
        dispatch(resetPreviewedEdits());
      },
    });
  }, [editable]);
};
