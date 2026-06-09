import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { explodeItem } from "../../../consolidateItems/reconsolidateItems";
import { keys } from "../../../utils/entries";
import { type EditorRoomItemId } from "../../editorTypes";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { type UndoItemEntry } from "./undoDescription";
import { pushUndoInPlace } from "./undoReducers";

export const explodeItemsReducers = {
  /**
   * explode the selected coalesced (multiplied) items back into their separate
   * single parts. Also turns off auto-coalesce, otherwise the parts would
   * immediately re-join into a single multiplied item again.
   */
  explodeSelectedItems(
    _state,
    { payload: { timestamp } }: PayloadAction<{ timestamp: number }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const roomJson = selectCurrentRoomFromLevelEditorState(state);

    const items: UndoItemEntry[] = state.selectedJsonItemIds.map((id) => [
      id,
      roomJson.items[id],
    ]);
    pushUndoInPlace(
      state,
      { kind: "itemAction", verb: "Explode", items },
      timestamp,
    );

    const reserved = new Set<EditorRoomItemId>(keys(roomJson.items));
    const explodedSelection: EditorRoomItemId[] = [];
    for (const id of state.selectedJsonItemIds) {
      const item = roomJson.items[id];
      if (item === undefined) {
        continue;
      }
      delete roomJson.items[id];
      // free this id so the first fragment can reuse it:
      reserved.delete(id);
      const fragments = explodeItem(id, item, reserved);
      Object.assign(roomJson.items, fragments);
      explodedSelection.push(...keys(fragments));
    }

    state.selectedJsonItemIds = explodedSelection;

    // without this the freshly separated parts would immediately re-coalesce:
    state.autoCoalesce = false;

    clearContextMenuXyInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
