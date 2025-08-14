import type { PayloadAction } from "@reduxjs/toolkit";
import { type SliceCaseReducers } from "@reduxjs/toolkit";
import { type LevelEditorState } from "../levelEditorSlice";
import { initialLevelEditorSliceState } from "../initialLevelEditorSliceState";
import { first } from "iter-tools";
import { keysIter } from "../../../utils/entries";
import type { EditorCampaign } from "../../editorTypes";

export const saveAndLoadReducers = {
  loadCampaign(
    _state,
    { payload: { campaign } }: PayloadAction<{ campaign: EditorCampaign }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    state.remoteCampaign = campaign;
    state.campaignInProgress = campaign;

    state.hoveredItem = undefined;
    state.selectedJsonItemIds = [];
    state.clickableAnnotationHovered = false;
    state.dragInProgress = false;
    state.history = initialLevelEditorSliceState.history;
    const roomId = first(keysIter(campaign.rooms));
    if (roomId === undefined) {
      throw new Error("could not find any rooms in this campaign");
    }
    state.currentlyEditingRoomId = roomId;
  },

  setRemoteCampaign(
    _state,
    { payload: { campaign } }: PayloadAction<{ campaign: EditorCampaign }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    state.remoteCampaign = campaign;
  },
} satisfies SliceCaseReducers<LevelEditorState>;
