import { isConsolidatable } from "../../consolidateItems/ConsolidatableJsonItem";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { twClass } from "../../utils/twClass.tsx" with { type: "macro" };
import {
  selectItem,
  selectOpenRoomSelectedJsonItemIds,
} from "../slice/levelEditorSlice";
import { type OpenRoomId } from "../slice/OpenRoom";
import { resizeCursorForPointingAt } from "./cursor/resizeCursorForPointingAt";
import { useOpenRoomPane } from "./useOpenRoomPane";

const selectCursor = (
  editorState: EditorRootState,
  openRoomId: OpenRoomId,
): `cursor-${string}` => {
  const { openRooms, cameraAngle } = editorState.levelEditor;
  const openRoom = openRooms[openRoomId];
  // check the room wasn't closed (in case we have a stale openRoomId reference)
  if (openRoom === undefined) {
    return twClass("cursor-default");
  }
  const { dragInProgress, clickableAnnotationHovered, hoveredItem, editable } =
    openRoom;

  if (dragInProgress) {
    return twClass("cursor-grabbing");
  }

  if (clickableAnnotationHovered) {
    return twClass("cursor-pointer");
  }

  if (!editable) {
    // a non-editable open room only picks items:
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
      selectOpenRoomSelectedJsonItemIds(editorState, openRoomId).includes(
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
  const { openRoomId } = useOpenRoomPane();
  return useEditorAppSelector((editorState) =>
    selectCursor(editorState, openRoomId),
  );
};
