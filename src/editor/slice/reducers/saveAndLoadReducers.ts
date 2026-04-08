import type { PayloadAction } from "@reduxjs/toolkit";

import { type SliceCaseReducers } from "@reduxjs/toolkit";

import type { EditorCampaign } from "../../editorTypes";

import { roomJsonItemsIterable } from "../../../model/RoomJson";
import { keysIter, valuesIter } from "../../../utils/entries";
import { first } from "../../../utils/iterators/first";
import { initialLevelEditorSliceState } from "../initialLevelEditorSliceState";
import { type LevelEditorState } from "../levelEditorSlice";

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

    // choose which room to start the editor in.
    const startingRoom =
      // First look for head's room as the traditional starting room:
      valuesIter(campaign.rooms).find((room) => {
        return roomJsonItemsIterable(room).some(
          (item) => item.type === "player" && item.config.which === "head",
        );
      })?.id ??
      valuesIter(campaign.rooms).find((room) => {
        return roomJsonItemsIterable(room).some(
          (item) => item.type === "player" && item.config.which === "heels",
        );
      })?.id ??
      // if not that, just find any room
      first(keysIter(campaign.rooms));

    if (startingRoom === undefined) {
      throw new Error("could not find any rooms in this campaign");
    }
    state.currentlyEditingRoomId = startingRoom;
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
