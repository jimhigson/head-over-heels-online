import {
  iterateRoomJsonItemsWithIds,
  roomVerticalLinkHolders,
} from "../../../model/RoomJson";
import { keys, valuesIter } from "../../../utils/entries";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { type LevelEditorState } from "../levelEditorSlice";
import { deleteItemInPlace } from "./deleteItemInPlace";

export const removeInboundRoomReferencesInPlace = (
  state: LevelEditorState,
  deletedRoomId: EditorRoomId,
) => {
  for (const room of valuesIter(state.campaignInProgress.rooms)) {
    const doorIdsToDelete: EditorRoomItemId[] = [];

    for (const [id, item] of iterateRoomJsonItemsWithIds(
      room.items,
      "door",
      "teleporter",
      "portableTeleporter",
    )) {
      if (item.config.toRoom === deletedRoomId) {
        if (item.type === "door") {
          doorIdsToDelete.push(id as EditorRoomItemId);
        } else {
          delete item.config.toRoom;
        }
      }
    }

    for (const doorId of doorIdsToDelete) {
      deleteItemInPlace(room as EditorRoomJson, doorId);
    }

    for (const holder of roomVerticalLinkHolders(room)) {
      if (holder.above?.room === deletedRoomId) {
        delete holder.above;
      }
      if (holder.below?.room === deletedRoomId) {
        delete holder.below;
      }
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
