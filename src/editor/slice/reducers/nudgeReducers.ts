import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type Xyz } from "../../../utils/vectors/vectors";
import { addNudgeStepToPreviewInPlace } from "../inPlaceMutators/addNudgeStepToPreviewInPlace";
import { selectCursorRoomSelectedJsonItemIdsFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { moveOrResizeOutcome } from "./moveOrResizeItemPreview/moveOrResizeItemPreviewReducers";

export type NudgeSelectedItemsPayload = {
  /**
   * how far this nudge moves the selected items
   */
  positionDelta: Xyz;
  timesDelta: Xyz;
  timestamp: number;
};

export const nudgeReducers = {
  /**
   * move (or resize) the selected items one step, adding to the nudges being
   * previewed - they are committed as one edit once they pause
   */
  nudgeSelectedItems(
    _state,
    {
      payload: { positionDelta, timesDelta, timestamp },
    }: PayloadAction<NudgeSelectedItemsPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    addNudgeStepToPreviewInPlace(
      state,
      "move",
      { positionDelta, timestamp },
      (previewState) => {
        const outcome = moveOrResizeOutcome(previewState, {
          jsonItemIds:
            selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(
              previewState,
            ),
          positionDelta,
          timesDelta,
          timestamp,
        });
        return outcome.type === "valid" ?
            { edits: outcome.pendingEdits.edits }
          : undefined;
      },
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
