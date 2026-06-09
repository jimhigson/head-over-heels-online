import {
  type EditorJsonItem,
  type EditorRoomId,
} from "../../../editor/editorTypes";
import { type LevelEditorState } from "../../../editor/slice/levelEditorSlice";
import {
  roomJsonItemsIterable,
  roomVerticalLinkHolders,
} from "../../../model/RoomJson";
import { valuesIter } from "../../../utils/entries";
import {
  selectCurrentRoomFromLevelEditorState,
  selectCursorRoomId,
} from "../levelEditorSelectors";

export const changeIdOfCurrentRoomInPlace = (
  state: LevelEditorState,
  newRoomId: EditorRoomId,
) => {
  const prevRoomId = selectCursorRoomId(state);
  const prevRoom = selectCurrentRoomFromLevelEditorState(state);

  for (const room of valuesIter(state.campaignInProgress.rooms)) {
    // update any doors and teleporters that reference the old room id
    roomJsonItemsIterable(room)
      .filter(
        (
          item,
        ): item is
          | EditorJsonItem<"door">
          | EditorJsonItem<"portableTeleporter">
          | EditorJsonItem<"teleporter"> =>
          item.type === "door" ||
          item.type === "teleporter" ||
          item.type === "portableTeleporter",
      )
      .filter((item) => item.config.toRoom === prevRoomId)
      .forEach((item) => {
        item.config.toRoom = newRoomId;
      });

    // update any non-contiguous relationships with the old room id
    const ncrWith = room.meta?.nonContiguousRelationship?.with;
    if (ncrWith?.room === prevRoomId) {
      ncrWith.room = newRoomId;
    }

    // update above/below room references
    for (const holder of roomVerticalLinkHolders(room)) {
      if (holder.above?.room === prevRoomId) {
        holder.above.room = newRoomId;
      }
      if (holder.below?.room === prevRoomId) {
        holder.below.room = newRoomId;
      }
    }
  }

  state.campaignInProgress.rooms[newRoomId] = {
    ...prevRoom,
    id: newRoomId,
  };
  delete state.campaignInProgress.rooms[prevRoomId];

  state.cursorRoom = { ...state.cursorRoom, roomId: newRoomId };
  state.selectedRoomIds = state.selectedRoomIds.map((id) =>
    id === prevRoomId ? newRoomId : id,
  );

  state.editingRoomIdHistory.back = state.editingRoomIdHistory.back.map((id) =>
    id === prevRoomId ? newRoomId : id,
  );
  state.editingRoomIdHistory.forward = state.editingRoomIdHistory.forward.map(
    (id) => (id === prevRoomId ? newRoomId : id),
  );

  if (state.history[prevRoomId]) {
    state.history[newRoomId] = state.history[prevRoomId];
    delete state.history[prevRoomId];
  }
};
