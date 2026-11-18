import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import {
  type MoveItemsToRoomArgs,
  moveItemsToRoomInPlace,
} from "../inPlaceMutators/moveItemsToRoomInPlace";
import { setSelectedJsonItemIdsOnCursorRoomInPlace } from "../inPlaceMutators/setSelectedJsonItemIdsOnCursorRoomInPlace";
import { type LevelEditorState } from "../levelEditorSlice";
import { layoutNodesOfType } from "../PaneLayout";

export type MoveItemsToRoomPayload = MoveItemsToRoomArgs & {
  /** the sub-room of the destination to show after moving */
  toSubRoomId: string;
};

export const moveItemsToRoomReducers = {
  /** move items to another room, then follow them there with them selected */
  moveItemsToRoom(
    state,
    {
      payload: { toSubRoomId, ...moveArgs },
    }: PayloadAction<MoveItemsToRoomPayload>,
  ) {
    const editorState = state as LevelEditorState;
    const movedItemIds = moveItemsToRoomInPlace(editorState, moveArgs);
    if (movedItemIds === undefined) {
      return;
    }
    // the moved items were the selection where they came from, and are gone:
    for (const openRoom of layoutNodesOfType(editorState.layout, "openRoom")) {
      if (openRoom.roomId === moveArgs.fromRoomId) {
        openRoom.selectedJsonItemIds = [];
      }
    }
    changeCurrentRoomInPlace(editorState, moveArgs.toRoomId, toSubRoomId);
    setSelectedJsonItemIdsOnCursorRoomInPlace(editorState, movedItemIds);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
