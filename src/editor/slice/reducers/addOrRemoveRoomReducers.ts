import { type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import { addNewRoomInPlace } from "../inPlaceMutators/addNewRoomInPlace";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { filter, first, objectKeys } from "iter-tools";
import type { EditorRoomId } from "../../editorTypes";
import { changeRoomInPlace } from "./changeRoomReducers";

export const addOrRemoveRoomReducers = {
  addRoom(state) {
    const currentRoom =
      state.campaignInProgress.rooms[state.currentlyEditingRoomId];
    const newRoom = addNewRoomInPlace(state, currentRoom.planet);

    changeRoomInPlace(state, newRoom.id);
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
