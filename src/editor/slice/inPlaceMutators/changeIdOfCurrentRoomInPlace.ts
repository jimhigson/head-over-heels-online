import { objectValues } from "iter-tools";

import type { EditorJsonItem, EditorRoomId } from "../../../editor/editorTypes";
import type { LevelEditorState } from "../../../editor/slice/levelEditorSlice";

import { iterateRoomJsonItems } from "../../../model/RoomJson";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";

export const changeIdOfCurrentRoomInPlace = (
  state: LevelEditorState,
  newRoomId: EditorRoomId,
) => {
  const prevRoomId = state.currentlyEditingRoomId;
  const prevRoom = selectCurrentRoomFromLevelEditorState(state);

  for (const room of objectValues(state.campaignInProgress.rooms)) {
    // update any doors and teleporters that reference the old room id
    iterateRoomJsonItems(room)
      .filter(
        (item): item is EditorJsonItem<"door"> | EditorJsonItem<"teleporter"> =>
          item.type === "door" || item.type === "teleporter",
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
  }

  state.campaignInProgress.rooms[newRoomId] = {
    ...prevRoom,
    id: newRoomId,
  };
  delete state.campaignInProgress.rooms[prevRoomId];

  state.currentlyEditingRoomId = newRoomId;
};
