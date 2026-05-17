import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { pick } from "../../../utils/pick";
import { initialLevelEditorSliceState } from "../initialLevelEditorSliceState";
import { type LevelEditorState } from "../levelEditorSlice";
import { levelEditorSliceNonPersistedFields } from "../levelEditorSliceTransientFields";

export const campaignManagementReducers = {
  newCampaign(_state) {
    const state = _state as LevelEditorState;

    Object.assign(
      state,
      pick(
        initialLevelEditorSliceState,
        ...levelEditorSliceNonPersistedFields,
        "campaignInProgress",
        "currentlyEditingRoomId",
        "remoteCampaign",
        "history",
        "editingRoomIdHistory",
      ),
    );
  },
  setCampaignName(state, { payload: name }: PayloadAction<string>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const levelEditorState = state as LevelEditorState;
    levelEditorState.campaignInProgress.locator.campaignName = name;
  },
  setCampaignUserId(state, { payload: userId }: PayloadAction<string>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const levelEditorState = state as LevelEditorState;
    levelEditorState.campaignInProgress.locator.userId = userId;
  },
  setCampaignPublished(state, { payload: published }: PayloadAction<boolean>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we
    // assigned to the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed
    // anyway
    const levelEditorState = state as LevelEditorState;

    if (levelEditorState.campaignInProgress.meta === undefined) {
      levelEditorState.campaignInProgress.meta = {
        published: false,
      };
    } else {
      levelEditorState.campaignInProgress.meta.published = published;
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
