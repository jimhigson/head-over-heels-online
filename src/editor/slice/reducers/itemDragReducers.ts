import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { type EditorRoomItemId } from "../../editorTypes";
import { type PointingAtItem } from "../../RoomEditingArea/cursor/PointingAt";
import { type LevelEditorState } from "../levelEditorSlice";
import { type OpenRoomId } from "../OpenRoom";

/**
 * the plane a drag is moving on, from where on it the pointer began that part
 * of the drag. A drag changes plane when the modifier is pressed or released,
 * keeping the drag so far
 */
export type ItemDragPlane = {
  /**
   * the normal of the plane the items move on
   */
  normal: Xyz;
  /**
   * whether the modifier (move only in z) was held on this plane
   */
  modifierPressed: boolean;
  /**
   * the pointer when this plane's part of the drag began, in the source open
   * room's screen px
   */
  startScrXy: Xy;
  /**
   * the (unrounded) drag vector when this plane's part of the drag began
   */
  startDragVector: Xyz;
};

/**
 * the pointer pressed on items to drag them, shared by every open room so the
 * drag can be followed across panes
 */
export type ItemDrag = {
  /**
   * the open room the drag started in, whose items it drags
   */
  sourceOpenRoomId: OpenRoomId;
  /**
   * where the pointer went down, in the source open room
   */
  mouseDownPointingAt: PointingAtItem;
  jsonItemIds: EditorRoomItemId[];
  /**
   * the open room the pointer is over, if any - where the drag would drop
   */
  overOpenRoomId: OpenRoomId | undefined;
  /**
   * undefined until the pointer has moved far enough to be dragging
   */
  plane: ItemDragPlane | undefined;
  /**
   * the drag vector, rounded to the grid, the items were last tried at
   */
  lastRoundedDragVector: Xyz;
};

export const itemDragReducers = {
  itemDragPointerDown(
    state,
    {
      payload: { sourceOpenRoomId, mouseDownPointingAt, jsonItemIds },
    }: PayloadAction<
      Pick<ItemDrag, "jsonItemIds" | "mouseDownPointingAt" | "sourceOpenRoomId">
    >,
  ) {
    state.itemDrag = {
      sourceOpenRoomId,
      mouseDownPointingAt,
      jsonItemIds,
      overOpenRoomId: sourceOpenRoomId,
      plane: undefined,
      lastRoundedDragVector: { x: 0, y: 0, z: 0 },
    };
  },
  itemDragPlaneChanged(
    state,
    { payload: plane }: PayloadAction<ItemDragPlane>,
  ) {
    if (state.itemDrag !== undefined) {
      state.itemDrag.plane = plane;
    }
  },
  itemDragRounded(
    state,
    { payload: lastRoundedDragVector }: PayloadAction<Xyz>,
  ) {
    if (state.itemDrag !== undefined) {
      state.itemDrag.lastRoundedDragVector = lastRoundedDragVector;
    }
  },
  itemDragOverOpenRoom(
    state,
    { payload: overOpenRoomId }: PayloadAction<OpenRoomId | undefined>,
  ) {
    if (state.itemDrag !== undefined) {
      state.itemDrag.overOpenRoomId = overOpenRoomId;
    }
  },
  itemDragEnded(state) {
    state.itemDrag = undefined;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
