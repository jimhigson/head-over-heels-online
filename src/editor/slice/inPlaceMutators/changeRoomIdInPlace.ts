import {
  type EditorJsonItem,
  type EditorRoomId,
} from "../../../editor/editorTypes";
import { type LevelEditorState } from "../../../editor/slice/levelEditorSlice";
import { firstUntakenRoomId } from "../../../model/firstUntakenRoomId";
import { roomVerticalLinkHolders } from "../../../model/RoomJson";
import { roomJsonItemsIterable } from "../../../model/RoomJsonItemIterators";
import { valuesIter } from "../../../utils/entries";
import { layoutNodesOfType } from "../PaneLayout";

/**
 * give a room another id, following it everywhere it is referred to: other
 * rooms' links to it, the selection, open rooms, room history and undo history
 */
export const changeRoomIdInPlace = (
  state: LevelEditorState,
  prevRoomId: EditorRoomId,
  /**
   * the id wanted - if another room has it, a free id is chosen instead, so
   * no room is ever overwritten
   */
  wantedRoomId: EditorRoomId,
) => {
  if (wantedRoomId === prevRoomId) {
    return;
  }
  const { rooms } = state.campaignInProgress;
  const isWantedRoomIdTaken = rooms[wantedRoomId] !== undefined;
  const newRoomId =
    isWantedRoomIdTaken ? firstUntakenRoomId(rooms) : wantedRoomId;
  const prevRoom = rooms[prevRoomId];

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

    // update above/below and non-contiguous-relationship room references
    for (const holder of roomVerticalLinkHolders(room)) {
      if (holder.above?.room === prevRoomId) {
        holder.above.room = newRoomId;
      }
      if (holder.below?.room === prevRoomId) {
        holder.below.room = newRoomId;
      }
      if (holder.nonContiguousRelationship?.with.room === prevRoomId) {
        holder.nonContiguousRelationship.with.room = newRoomId;
      }
    }
  }

  state.campaignInProgress.rooms[newRoomId] = prevRoom;
  delete state.campaignInProgress.rooms[prevRoomId];

  state.selectedRoomIds = state.selectedRoomIds.map((id) =>
    id === prevRoomId ? newRoomId : id,
  );
  for (const openRoom of layoutNodesOfType(state.layout, "openRoom")) {
    if (openRoom.roomId === prevRoomId) {
      openRoom.roomId = newRoomId;
    }
  }

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
