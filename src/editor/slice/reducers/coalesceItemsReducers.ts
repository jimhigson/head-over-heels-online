import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import { keys } from "../../../utils/entries";
import { type EditorRoomJsonItems } from "../../editorTypes";
import { setSelectedJsonItemIdsOnCursorRoomInPlace } from "../inPlaceMutators/setSelectedJsonItemIdsOnCursorRoomInPlace";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { type UndoItemEntry } from "./undoDescription";
import { pushUndoToCursorRoomInPlace } from "./undoReducers";

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

    const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(state);

    const selectedById = Object.fromEntries(
      selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state)
        .map((id) => [id, roomJson.items[id]] as const)
        .filter(([, item]) => item !== undefined),
    ) as EditorRoomJsonItems;

    const coalesced = consolidateItemsMap(selectedById);

    const items: UndoItemEntry[] =
      selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state).map(
        (id) => [id, roomJson.items[id]],
      );
    pushUndoToCursorRoomInPlace(
      state,
      { kind: "itemAction", verb: "Coalesce", items },
      timestamp,
    );

    for (const id of selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(
      state,
    )) {
      delete roomJson.items[id];
    }
    Object.assign(roomJson.items, coalesced);

    setSelectedJsonItemIdsOnCursorRoomInPlace(state, keys(coalesced));
    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
