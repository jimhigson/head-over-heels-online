import { createSelector } from "@reduxjs/toolkit";

import { floorsRenderExtent } from "../../game/render/room/floorsExtent";
import { roomVerticalLink } from "../../model/RoomJson";
import { type EditorRootState } from "../../store/store";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
} from "../editorTypes";
import { type LevelEditorState } from "./levelEditorSlice";
import { loadEditorRoom } from "./loadEditorRoom";

const selectEditorCameraAngleFromRoot = (state: EditorRootState) =>
  state.levelEditor.cameraAngle;

/**
 * Selector that loads the current room state from the JSON, with its
 * camera-relative structure (walls/doors/floors) derived for the editor's
 * current view angle. Memoized so it only recomputes when the room JSON or
 * the view angle changes.
 */
export const selectEditorRoomState = createSelector(
  [
    (state: EditorRootState) =>
      selectCurrentRoomJsonFromLevelEditorState(state.levelEditor),
    selectEditorCameraAngleFromRoot,
  ],
  (roomJson, cameraAngle): EditorRoomState =>
    loadEditorRoom(roomJson, cameraAngle),
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
  [selectEditorRoomState, selectEditorCameraAngleFromRoot],
  (editorRoomStateWithPreviews, cameraAngle): RenderedRoomDimensions => {
    const {
      floors: { edgeLeftX: l, edgeRightX: r, bottomEdgeY: b },
      allItems: { topEdgeY: t },
    } = floorsRenderExtent(editorRoomStateWithPreviews, cameraAngle);
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
