import { type EditorRoomId } from "../../editorTypes";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";

/**
 * make sure the room has a tab, before the cursor moves to it: an open room
 * keeps its tab, otherwise it takes over the preview tab, or gets a new
 * preview tab just after the cursor room's
 */
export const openRoomTabInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => {
  const cursorRoomId = selectCursorRoomIdFromLevelEditorState(state);
  const roomTabs = state.openRoomTabs;

  if (roomTabs.some((roomTab) => roomTab.roomId === roomId)) {
    return;
  }

  const previewIndex = roomTabs.findIndex(({ isPreview }) => isPreview);
  if (previewIndex !== -1) {
    delete state.selectedJsonItemIdsByRoom[roomTabs[previewIndex].roomId];
    state.openRoomTabs = roomTabs.with(previewIndex, {
      roomId,
      isPreview: true,
    });
    return;
  }

  const cursorIndex = roomTabs.findIndex(
    (roomTab) => roomTab.roomId === cursorRoomId,
  );
  state.openRoomTabs = roomTabs.toSpliced(cursorIndex + 1, 0, {
    roomId,
    isPreview: true,
  });
};
