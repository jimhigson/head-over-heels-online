import { type EditorRoomId } from "../../editorTypes";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { showRoomInFrontTabInPlace, tabOpenRoomsIter } from "../OpenRoom";
import { clearContextMenuXyInPlace } from "../reducers/contextMenuReducers";
import { commitPendingNudgeInPlace } from "./commitPendingNudgeInPlace";
import { firstSubRoomId } from "./firstSubRoomId";

export const changeCurrentRoomInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  subRoomId?: string,
  noPushToHistory = false,
) => {
  const roomJson = state.campaignInProgress.rooms[roomId];
  if (!roomJson) {
    console.warn(`can't change to room ${roomId} - it doesn't exist`);
    return;
  }

  // nudges being previewed are of the room being left:
  commitPendingNudgeInPlace(state);

  const resolvedSubRoomId = subRoomId ?? firstSubRoomId(roomJson);

  if (subRoomId !== undefined && subRoomId !== "*") {
    const subRooms = roomJson.meta?.subRooms;
    if (!subRooms || !(subRoomId in subRooms)) {
      throw new Error(
        `subRoom "${subRoomId}" does not exist in room "${roomId}"`,
      );
    }
  }

  if (!noPushToHistory) {
    state.editingRoomIdHistory.back.push(
      selectCursorRoomIdFromLevelEditorState(state),
    );
  }
  for (const openRoom of tabOpenRoomsIter(state)) {
    openRoom.clickableAnnotationHovered = false;
    openRoom.hoveredItem = undefined;
  }
  showRoomInFrontTabInPlace(state, roomId, resolvedSubRoomId);
  state.selectedRoomIds = [roomId];
  state.hoveredUndoIndex = 0;
  clearContextMenuXyInPlace(state);
};
