import { type RoomJson } from "../../../model/RoomJson";
import { type EditorRoomId } from "../../editorTypes";
import { selectCursorRoomId } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "../reducers/contextMenuReducers";

export const firstSubRoomId = (roomJson: RoomJson<string, string>): string => {
  const subRoomKeys =
    roomJson.meta?.subRooms && Object.keys(roomJson.meta.subRooms);
  return subRoomKeys?.[0] ?? "*";
};

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
    state.editingRoomIdHistory.back.push(selectCursorRoomId(state));
  }
  state.selectedRoomIds = [roomId];
  state.cursorRoom = { roomId, subRoomId: resolvedSubRoomId };

  state.clickableAnnotationHovered = false;
  state.hoveredItem = undefined;
  state.selectedJsonItemIds = [];
  state.hoveredUndoIndex = 0;
  clearContextMenuXyInPlace(state);
};
