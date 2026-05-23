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
import {
  selectCurrentRoomFromLevelEditorState,
  selectCursorRoomId,
} from "../levelEditorSelectors";

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
    {
      payload: { direction, roomSize },
    }: PayloadAction<{ direction: DirectionXy4; roomSize?: Xy }>,
  ) {
    insertRoomInPlace(state, direction, roomSize);
  },
  removeRoom(state) {
    const roomIdsToDelete = new Set(state.selectedRoomIds);

    // to stay near the deleted room, find another room adjacent to it:
    const cursorRoom =
      state.campaignInProgress.rooms[selectCursorRoomId(state)];
    const doorOrTeleporterEntry =
      first(iterateRoomJsonItemsWithIds(cursorRoom.items, "door")) ??
      first(iterateRoomJsonItemsWithIds(cursorRoom.items, "teleporter"));

    const adjacentRoom = doorOrTeleporterEntry?.[1].config.toRoom as
      | EditorRoomId
      | undefined;

    const nextRoom = (
      (
        adjacentRoom &&
        !roomIdsToDelete.has(adjacentRoom) &&
        adjacentRoom !== exitGameRoomId
      ) ?
        adjacentRoom
      : keysIter(state.campaignInProgress.rooms).find(
          (roomId) => !roomIdsToDelete.has(roomId) && roomId !== exitGameRoomId,
        )) as EditorRoomId | undefined;

    if (nextRoom === undefined) {
      // refuse to delete the last room (why?)
      return;
    }

    changeCurrentRoomInPlace(state, nextRoom);

    for (const deletedRoomId of roomIdsToDelete) {
      delete state.campaignInProgress.rooms[deletedRoomId];
      removeInboundRoomReferencesInPlace(state, deletedRoomId);
      delete state.history[deletedRoomId];
    }

    const isNotDeleted = (id: EditorRoomId) => !roomIdsToDelete.has(id);
    state.editingRoomIdHistory.back =
      state.editingRoomIdHistory.back.filter(isNotDeleted);
    state.editingRoomIdHistory.forward =
      state.editingRoomIdHistory.forward.filter(isNotDeleted);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
