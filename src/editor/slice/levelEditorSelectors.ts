import { createSelector } from "@reduxjs/toolkit";

import { loadRoom } from "../../game/gameState/loadRoom/loadRoom";
import { floorsRenderExtent } from "../../game/render/room/floorsExtent";
import { roomVerticalLink } from "../../model/RoomJson";
import { emptyUserSettings } from "../../store/slices/userSettings/emptyUserSettings";
import { emptyObject } from "../../utils/empty";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
} from "../editorTypes";
import { type LevelEditorState } from "./levelEditorSlice";

/**
 * Selector that loads the current room state from the JSON.
 * Memoized so it only recomputes when the room JSON changes.
 */
export const selectEditorRoomState = createSelector(
  [(state) => selectCurrentRoomJsonFromLevelEditorState(state.levelEditor)],
  (roomJson): EditorRoomState => {
    return loadRoom({
      roomJson,
      roomPickupsCollected: emptyObject,
      scrollsRead: emptyObject,
      // display heads and heels in their starting rooms:
      isNewGame: true,
      userSettings: emptyUserSettings,
    });
  },
);

export type RenderedRoomDimensions = {
  l: number;
  r: number;
  t: number;
  b: number;
  w: number;
  h: number;
};

export const selectEditorRoomRenderDimensions = createSelector(
  [selectEditorRoomState],
  (editorRoomStateWithPreviews): RenderedRoomDimensions => {
    const {
      floors: { edgeLeftX: l, edgeRightX: r, bottomEdgeY: b },
      allItems: { topEdgeY: t },
    } = floorsRenderExtent(editorRoomStateWithPreviews);
    // simplify to the x/y/w/h rectangle to inform the editor where the rendering is:
    return {
      l,
      r,
      w: r - l,
      b,
      t,
      h: b - t,
    };
  },
);

export const selectCursorRoom = (state: LevelEditorState) => state.cursorRoom;

export const selectCursorRoomId = (state: LevelEditorState) =>
  selectCursorRoom(state).roomId;

export const selectCursorSubRoomId = (state: LevelEditorState) =>
  selectCursorRoom(state).subRoomId;

export const selectCurrentRoomJsonFromLevelEditorState = (
  state: LevelEditorState,
) =>
  state.campaignInProgress.rooms[selectCursorRoomId(state)] as EditorRoomJson;

/** the vertical (above/below) link of the current cursor sub-room, if any */
export const selectCursorSubRoomVerticalLink = (
  state: LevelEditorState,
  direction: "above" | "below",
): { room: EditorRoomId; subRoom?: string } | undefined =>
  roomVerticalLink(
    selectCurrentRoomJsonFromLevelEditorState(state),
    direction,
    selectCursorSubRoomId(state),
  );

export const selectRoomFromLevelEditorState = (
  state: LevelEditorState,
  roomId: EditorRoomId,
) => state.campaignInProgress.rooms[roomId] as EditorRoomJson | undefined;

export const selectItemInLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
  /** if not given, uses the cursor room */
  roomId?: EditorRoomId,
) =>
  state.campaignInProgress.rooms[roomId ?? selectCursorRoomId(state)]?.items[
    itemId
  ] as EditorJsonItemUnion | undefined;

export const selectItemIsSelectedInLevelEditorState = (
  state: LevelEditorState,
  itemId: EditorRoomItemId,
) => state.selectedJsonItemIds.includes(itemId);
