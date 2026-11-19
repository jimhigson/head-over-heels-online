import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type Xyz } from "../../../utils/vectors/vectors";
import { type EditorRoomJson } from "../../editorTypes";
import {
  addNudgeStepToPreviewInPlace,
  type NudgeStep,
} from "../inPlaceMutators/addNudgeStepToPreviewInPlace";
import { selectCursorRoomSelectionFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { type SelectionEntry } from "../SelectionEntry";
import { moveOrResizeOutcome } from "./moveOrResizeItemPreview/moveOrResizeOutcome";

export type NudgeSelectedItemsPayload = {
  /**
   * how far this nudge moves the selected items
   */
  positionDelta: Xyz;
  timesDelta: Xyz;
  timestamp: number;
};

/**
 * one nudge of the selection: items and editor ghosts move (or items resize) as
 * one move
 */
const nudgeStepForSelection = (
  /**
   * the cursor room, with the nudges already pending applied
   */
  nudgedRoomJson: EditorRoomJson,
  selectionEntries: SelectionEntry[],
  { positionDelta, timesDelta, timestamp }: NudgeSelectedItemsPayload,
): NudgeStep => {
  const outcome = moveOrResizeOutcome(nudgedRoomJson, {
    selectionEntries,
    positionDelta,
    timesDelta,
    timestamp,
  });
  return outcome.type === "valid" ? { edits: outcome.edits } : undefined;
};

export const nudgeReducers = {
  /**
   * move (or resize) the selected items one step, adding to the nudges being
   * previewed - they are committed as one edit once they pause
   */
  nudgeSelectedItems(
    _state,
    { payload }: PayloadAction<NudgeSelectedItemsPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    addNudgeStepToPreviewInPlace(
      state,
      "move",
      { positionDelta: payload.positionDelta, timestamp: payload.timestamp },
      (nudgedRoomJson) =>
        nudgeStepForSelection(
          nudgedRoomJson,
          selectCursorRoomSelectionFromLevelEditorState(state),
          payload,
        ),
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
