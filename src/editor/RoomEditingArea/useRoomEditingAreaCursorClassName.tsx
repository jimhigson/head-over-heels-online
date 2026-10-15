import { isConsolidatable } from "../../consolidateItems/ConsolidatableJsonItem";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { twClass } from "../../utils/twClass" with { type: "macro" };
import {
  selectCursorRoomSelectedJsonItemIds,
  selectItem,
} from "../slice/levelEditorSlice";
import { resizeCursorForPointingAt } from "./cursor/resizeCursorForPointingAt";

const selectCursor = (editorState: EditorRootState): `cursor-${string}` => {
  const {
    dragInProgress,
    clickableAnnotationHovered,
    hoveredItem,
    cameraAngle,
  } = editorState.levelEditor;
  const selectedJsonItemIds = selectCursorRoomSelectedJsonItemIds(editorState);

  if (dragInProgress) {
    return twClass("cursor-grabbing");
  }

  if (clickableAnnotationHovered) {
    return twClass("cursor-pointer");
  }

  if (hoveredItem) {
    const hoveredItemJson = selectItem(editorState, hoveredItem.jsonItemId);

    if (hoveredItemJson !== undefined && isConsolidatable(hoveredItemJson)) {
      const resizeCursor = resizeCursorForPointingAt(
        hoveredItem.pointingAtOnItem,
        cameraAngle,
      );
      if (resizeCursor !== undefined) {
        return resizeCursor;
      }
    }

    // if hovering on the selected item, use grab cursor to suggest can
    // move it
    if (selectedJsonItemIds.includes(hoveredItem.jsonItemId)) {
      return twClass("cursor-grab");
    }

    return twClass("cursor-default");
  }

  return twClass("cursor-crosshair");
};

export const useRoomEditingAreaCursorClassName = () => {
  return useEditorAppSelector(selectCursor);
};
