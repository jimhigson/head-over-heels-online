import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { roomJsonItemsIterable } from "../../../model/RoomJson";
import { keysIter, valuesIter } from "../../../utils/entries";
import { first } from "../../../utils/iterators/first";
import { pick } from "../../../utils/pick";
import { type EditorCampaign } from "../../editorTypes";
import { initialLevelEditorSliceState } from "../initialLevelEditorSliceState";
import { changeCurrentRoomInPlace } from "../inPlaceMutators/changeCurrentRoomInPlace";
import { migrateRoomNonContiguousRelationships } from "../inPlaceMutators/migrateRoomNonContiguousRelationships";
import { migrateRoomVerticalLinks } from "../inPlaceMutators/migrateRoomVerticalLinks";
import { type LevelEditorState } from "../levelEditorSlice";
import { levelEditorSliceNonPersistedFields } from "../levelEditorSliceTransientFields";

export const saveAndLoadReducers = {
  loadCampaign(
    _state,
    { payload: { campaign } }: PayloadAction<{ campaign: EditorCampaign }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    // convert old-format campaigns (top-level roomAbove/roomBelow and
    // room-level nonContiguousRelationship) to the current per-sub-room form,
    // in memory only
    const migratedCampaign = migrateRoomNonContiguousRelationships(
      migrateRoomVerticalLinks(campaign),
    );

    state.remoteCampaign = migratedCampaign;
    state.campaignInProgress = migratedCampaign;

    // clear transient editor state - this shouldn't be kept between campaigns:
    Object.assign(
      state,
      pick(
        initialLevelEditorSliceState,
        ...levelEditorSliceNonPersistedFields,
        "history",
      ),
    );

    // choose which room to start the editor in.
    const startingRoom =
      // First look for head's room as the traditional starting room:
      valuesIter(migratedCampaign.rooms).find((room) => {
        return roomJsonItemsIterable(room).some(
          (item) => item.type === "player" && item.config.which === "head",
        );
      })?.id ??
      valuesIter(migratedCampaign.rooms).find((room) => {
        return roomJsonItemsIterable(room).some(
          (item) => item.type === "player" && item.config.which === "heels",
        );
      })?.id ??
      // if not that, just find any room
      first(keysIter(migratedCampaign.rooms));

    if (startingRoom === undefined) {
      throw new Error("could not find any rooms in this campaign");
    }
    changeCurrentRoomInPlace(state, startingRoom, undefined, true);
  },

  setRemoteCampaign(
    _state,
    { payload: { campaign } }: PayloadAction<{ campaign: EditorCampaign }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    state.remoteCampaign = migrateRoomNonContiguousRelationships(
      migrateRoomVerticalLinks(campaign),
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;
