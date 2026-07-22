import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { keysIter } from "../../../utils/entries";
import { first } from "../../../utils/iterators/first";
import { type DirectionXy4, type Xy } from "../../../utils/vectors/vectors";
import { type EditorRoomId } from "../../editorTypes";
import { addNewRoomInPlace } from "../inPlaceMutators/addNewRoomInPlace";
import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { insertRoomInPlace } from "../inPlaceMutators/insertRoomInPlace";
import { removeInboundRoomReferencesInPlace } from "../inPlaceMutators/removeInboundRoomReferencesInPlace";
import {
  selectCurrentRoomJsonFromLevelEditorState,
  selectCursorRoomId,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";

export const addOrRemoveRoomReducers = {
  addRoom(
    state,
    {
      payload: { roomSize, gridPositions = [{ x: 0, y: 0 }] },
    }: PayloadAction<{ roomSize?: Xy; gridPositions?: Xy[] }>,
  ) {
    const { planet } = selectCurrentRoomJsonFromLevelEditorState(state);

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
  removeRoom(
    state,
    {
      payload: { roomId } = {},
    }: PayloadAction<{ roomId?: EditorRoomId } | undefined>,
  ) {
    // delete the named room when given one, otherwise the current selection
    const roomIdsToDelete = new Set(
      roomId !== undefined ? [roomId] : state.selectedRoomIds,
    );

    const cursorRoomId = selectCursorRoomId(state);

    // to stay near the deleted room, find another room adjacent to it:
    const cursorRoom = state.campaignInProgress.rooms[cursorRoomId];
    const doorOrTeleporterEntry =
      first(iterateRoomJsonItemsWithIds(cursorRoom.items, "door")) ??
      first(iterateRoomJsonItemsWithIds(cursorRoom.items, "teleporter"));

    const adjacentRoom = doorOrTeleporterEntry?.[1].config.toRoom as
      EditorRoomId | undefined;

    const nextRoom = (
      (
        adjacentRoom &&
        !roomIdsToDelete.has(adjacentRoom) &&
        adjacentRoom !== exitGameRoomId
      ) ?
        adjacentRoom
      : keysIter(state.campaignInProgress.rooms).find(
          (id) => !roomIdsToDelete.has(id) && id !== exitGameRoomId,
        )) as EditorRoomId | undefined;

    if (nextRoom === undefined) {
      // refuse to delete the last room (why?)
      return;
    }

    // only move the editor's cursor when the room it is on is being deleted -
    // deleting some other room (eg from the problems dialog) shouldn't navigate
    if (roomIdsToDelete.has(cursorRoomId)) {
      changeCurrentRoomInPlace(state, nextRoom);
    }

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
