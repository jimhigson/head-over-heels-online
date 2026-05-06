import type { EditorRoomId } from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";

import { roomJsonItemsIterable } from "../../../model/RoomJson";
import { keys, valuesIter } from "../../../utils/entries";

export const removeInboundRoomReferencesInPlace = (
  state: LevelEditorState,
  deletedRoomId: EditorRoomId,
) => {
  for (const room of valuesIter(state.campaignInProgress.rooms)) {
    for (const item of roomJsonItemsIterable(
      room,
      "door",
      "teleporter",
      "portableTeleporter",
    )) {
      if (item.config.toRoom === deletedRoomId) {
        if (item.type === "door") {
          item.config.toRoom = "nowhere" as EditorRoomId;
        } else {
          delete item.config.toRoom;
        }
      }
    }

    if (room.roomAbove === deletedRoomId) {
      delete room.roomAbove;
    }
    if (room.roomBelow === deletedRoomId) {
      delete room.roomBelow;
    }

    const ncr = room.meta?.nonContiguousRelationship;
    if (ncr?.with.room === deletedRoomId) {
      delete room.meta!.nonContiguousRelationship;
      if (keys(room.meta!).length === 0) {
        delete room.meta;
      }
    }
  }
};
