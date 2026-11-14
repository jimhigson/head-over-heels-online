import { isConsolidatable } from "../../consolidateItems/ConsolidatableJsonItem";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { twClass } from "../../utils/twClass.tsx" with { type: "macro" };
import { type EditorPaneId } from "../slice/EditorPane";
import {
  selectItem,
  selectPaneSelectedJsonItemIds,
} from "../slice/levelEditorSlice";
import { resizeCursorForPointingAt } from "./cursor/resizeCursorForPointingAt";
import { useEditorPane } from "./pane/EditorPaneProvider";

const selectCursor = (
  editorState: EditorRootState,
  paneId: EditorPaneId,
): `cursor-${string}` => {
  const { panes, cameraAngle } = editorState.levelEditor;
  const pane = panes[paneId];
  // check pane wasn't closed (in case we have a stale paneId reference)
  if (pane === undefined) {
    return twClass("cursor-default");
  }
  const { dragInProgress, clickableAnnotationHovered, hoveredItem, editable } =
    pane;

  if (dragInProgress) {
    return twClass("cursor-grabbing");
  }

  if (clickableAnnotationHovered) {
    return twClass("cursor-pointer");
  }

  if (!editable) {
    // a pane that doesn't edit only picks items:
    return hoveredItem === undefined ?
        twClass("cursor-default")
      : twClass("cursor-pointer");
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
    if (
      selectPaneSelectedJsonItemIds(editorState, paneId).includes(
        hoveredItem.jsonItemId,
      )
    ) {
      return twClass("cursor-grab");
    }

    return twClass("cursor-default");
  }

  return twClass("cursor-crosshair");
};

export const useRoomEditingAreaCursorClassName = () => {
  const { paneId } = useEditorPane();
  return useEditorAppSelector((editorState) =>
    selectCursor(editorState, paneId),
  );
};
