import { useEffect } from "preact/hooks";

import { useAppDispatch } from "../../store/hooks";
import { useEditorAppSelector } from "../../store/store";
import { type EditorRoomId } from "../editorTypes";
import { selectRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import {
  roomPreviewRequested,
  type RoomPreviewSnapshot,
} from "./editorRoomPreviewSlice";

/**
 * request a preview render of the given room (if not already cached or in
 * progress) and return its current state. Re-requests when the room's json
 * changes so an open tooltip re-renders after an edit. Deliberately does not
 * invalidate on unmount - the cached preview survives the tooltip closing.
 */
export const useRoomPreviewSnapshot = (
  roomId: EditorRoomId,
): RoomPreviewSnapshot | undefined => {
  const dispatch = useAppDispatch();

  const roomJson = useEditorAppSelector((state) =>
    selectRoomFromLevelEditorState(state.levelEditor, roomId),
  );
  const preview = useEditorAppSelector(
    (state) => state.editorRoomPreview.byRoomId[roomId],
  );

  useEffect(() => {
    if (roomJson !== undefined) {
      dispatch(roomPreviewRequested(roomId));
    }
  }, [dispatch, roomId, roomJson]);

  return preview;
};
