import type { PayloadAction } from "@reduxjs/toolkit";

import { type SliceCaseReducers } from "@reduxjs/toolkit";
import { filter, first, objectKeys } from "iter-tools";

import type { Xy } from "../../../utils/vectors/vectors";
import type { EditorRoomId } from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";

import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { addNewRoomInPlace } from "../inPlaceMutators/addNewRoomInPlace";
import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
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
  removeRoom(state) {
    const currentRoom =
      state.campaignInProgress.rooms[state.currentlyEditingRoomId];
    // to stay near the deleted room, find something adjacent to it:
    const doorOrTeleporterEntry = first(
      iterateRoomJsonItemsWithIds(currentRoom.items, "door", "teleporter"),
    );

    const nextRoom =
      doorOrTeleporterEntry?.[1].config.toRoom ??
      (first(
        filter(
          (roomId) => roomId !== state.currentlyEditingRoomId,
          objectKeys(state.campaignInProgress.rooms),
        ),
      ) as EditorRoomId | undefined);

    if (nextRoom === undefined) {
      // refuse to delete the last room
      return;
    }

    delete state.campaignInProgress.rooms[state.currentlyEditingRoomId];
    state.currentlyEditingRoomId = nextRoom;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
