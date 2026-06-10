import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import { keys } from "../../../utils/entries";
import { type EditorRoomJsonItems } from "../../editorTypes";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { type UndoItemEntry } from "./undoDescription";
import { pushUndoInPlace } from "./undoReducers";

export const coalesceItemsReducers = {
  /**
   * coalesce the currently selected items into a single multiplied item. Uses
   * the same plain consolidation as the menu's visibility check, so the items
   * merge exactly when the menu offered the action.
   */
  coalesceSelectedItems(
    _state,
    { payload: { timestamp } }: PayloadAction<{ timestamp: number }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentRoomFromLevelEditorState(state);

    const selectedById = Object.fromEntries(
      state.selectedJsonItemIds
        .map((id) => [id, roomJson.items[id]] as const)
        .filter(([, item]) => item !== undefined),
    ) as EditorRoomJsonItems;

    const coalesced = consolidateItemsMap(selectedById);

    const items: UndoItemEntry[] = state.selectedJsonItemIds.map((id) => [
      id,
      roomJson.items[id],
    ]);
    pushUndoInPlace(
      state,
      { kind: "itemAction", verb: "Coalesce", items },
      timestamp,
    );

    for (const id of state.selectedJsonItemIds) {
      delete roomJson.items[id];
    }
    Object.assign(roomJson.items, coalesced);

    state.selectedJsonItemIds = keys(coalesced);
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
