import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import {
  type MoveItemsToRoomArgs,
  moveItemsToRoomInPlace,
} from "../inPlaceMutators/moveItemsToRoomInPlace";
import { type LevelEditorState } from "../levelEditorSlice";

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
    changeCurrentRoomInPlace(editorState, moveArgs.toRoomId, toSubRoomId);
    editorState.selectedJsonItemIds = movedItemIds;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
