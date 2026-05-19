import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import type { DirectionXy4, Xy } from "../../../utils/vectors/vectors";
import type { EditorRoomId } from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";

import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { keysIter } from "../../../utils/entries";
import { first } from "../../../utils/iterators/first";
import { addNewRoomInPlace } from "../inPlaceMutators/addNewRoomInPlace";
import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { insertRoomInPlace } from "../inPlaceMutators/insertRoomInPlace";
import { removeInboundRoomReferencesInPlace } from "../inPlaceMutators/removeInboundRoomReferencesInPlace";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";

export const addOrRemoveRoomReducers = {
  addRoom(
    state,
    {
      payload: { roomSize, gridPositions = [{ x: 0, y: 0 }] },
    }: PayloadAction<{ roomSize?: Xy; gridPositions?: Xy[] }>,
  ) {
    const { planet } = selectCurrentRoomFromLevelEditorState(state);

    const newRoom = addNewRoomInPlace({
      state,
      scenery: planet,
      roomSize,
      gridPositions,
    });

    changeCurrentRoomInPlace(state, newRoom.id);
  },
  insertRoom(
    state,
    { payload: { direction } }: PayloadAction<{ direction: DirectionXy4 }>,
  ) {
    insertRoomInPlace(state, direction);
  },
  removeRoom(state) {
    const currentRoom =
      state.campaignInProgress.rooms[state.currentlyEditing.roomId];
    // to stay near the deleted room, find another room adjacent to it:
    const doorOrTeleporterEntry =
      first(iterateRoomJsonItemsWithIds(currentRoom.items, "door")) ??
      first(iterateRoomJsonItemsWithIds(currentRoom.items, "teleporter"));

    const nextRoom = (doorOrTeleporterEntry?.[1].config.toRoom ??
      keysIter(state.campaignInProgress.rooms).find(
        (roomId) => roomId !== state.currentlyEditing.roomId,
      )) as EditorRoomId | undefined;

    if (nextRoom === undefined || nextRoom === exitGameRoomId) {
      // refuse to delete the last room (why?)
      return;
    }

    const deletedRoomId = state.currentlyEditing.roomId;
    changeCurrentRoomInPlace(state, nextRoom);
    delete state.campaignInProgress.rooms[deletedRoomId];
    removeInboundRoomReferencesInPlace(state, deletedRoomId);

    const isNotDeleted = (id: EditorRoomId) => id !== deletedRoomId;
    state.editingRoomIdHistory.back =
      state.editingRoomIdHistory.back.filter(isNotDeleted);
    state.editingRoomIdHistory.forward =
      state.editingRoomIdHistory.forward.filter(isNotDeleted);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
