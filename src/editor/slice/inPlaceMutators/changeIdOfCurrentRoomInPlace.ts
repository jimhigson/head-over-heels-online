import type { EditorJsonItem, EditorRoomId } from "../../../editor/editorTypes";
import type { LevelEditorState } from "../../../editor/slice/levelEditorSlice";

import { roomJsonItemsIterable } from "../../../model/RoomJson";
import { valuesIter } from "../../../utils/entries";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";

export const changeIdOfCurrentRoomInPlace = (
  state: LevelEditorState,
  newRoomId: EditorRoomId,
) => {
  const prevRoomId = state.currentlyEditingRoomId;
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
    if (room.roomAbove === prevRoomId) {
      room.roomAbove = newRoomId;
    }
    if (room.roomBelow === prevRoomId) {
      room.roomBelow = newRoomId;
    }
  }

  state.campaignInProgress.rooms[newRoomId] = {
    ...prevRoom,
    id: newRoomId,
  };
  delete state.campaignInProgress.rooms[prevRoomId];

  state.currentlyEditingRoomId = newRoomId;
};
