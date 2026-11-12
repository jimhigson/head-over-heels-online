import {
  current,
  type PayloadAction,
  type SliceCaseReducers,
} from "@reduxjs/toolkit";

import { pick } from "../../../utils/pick";
import { type EditorCampaign } from "../../editorTypes";
import { initialLevelEditorSliceState } from "../initialLevelEditorSliceState";
import { firstSubRoomId } from "../inPlaceMutators/firstSubRoomId";
import { migrateRoomItems } from "../inPlaceMutators/migrateRoomItems";
import { migrateRoomNonContiguousRelationships } from "../inPlaceMutators/migrateRoomNonContiguousRelationships";
import { migrateRoomVerticalLinks } from "../inPlaceMutators/migrateRoomVerticalLinks";
import { type LevelEditorState } from "../levelEditorSlice";
import { levelEditorSliceCampaignTransientFields } from "../levelEditorSliceTransientFields";
import { openOnlyRoomInPlace } from "../OpenRoom";
import { startingRoomId } from "../startingRoomId";

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
    // room-level nonContiguousRelationship to the current per-sub-room form,
    // walls without tiles to carry them, and teleporters' store-path conditions
    // to the planet they name) in memory only
    const migratedCampaign = migrateRoomItems(
      migrateRoomNonContiguousRelationships(migrateRoomVerticalLinks(campaign)),
    );

    state.remoteCampaign = migratedCampaign;
    state.campaignInProgress = migratedCampaign;

    // clear transient editor state - this shouldn't be kept between campaigns:
    Object.assign(
      state,
      pick(
        initialLevelEditorSliceState,
        ...levelEditorSliceCampaignTransientFields,
        "history",
      ),
    );

    // start the editor in the campaign's starting room:
    const roomId = startingRoomId(migratedCampaign);
    openOnlyRoomInPlace(
      state,
      roomId,
      firstSubRoomId(migratedCampaign.rooms[roomId]),
    );
    state.selectedRoomIds = [roomId];
  },

  setRemoteCampaign(
    _state,
    { payload: { campaign } }: PayloadAction<{ campaign: EditorCampaign }>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    state.remoteCampaign = migrateRoomItems(
      migrateRoomNonContiguousRelationships(migrateRoomVerticalLinks(campaign)),
    );
  },

  /**
   * After a successful save, the db has assigned a new version number. It becomes
   * the authoritative version for both the synced remote baseline and the working
   * copy, so that the persisted version reflects our own saves (and the next save's
   * force-with-lease check, and the rehydrate check, compare against the truth).
   */
  saveSuccessful(
    _state,
    { payload: { version } }: PayloadAction<{ version: number }>,
  ) {
    // cast avoids the immer WritableDraft<> ts-perf issue - see loadCampaign above
    const state = _state as LevelEditorState;

    // the db assigned this version; it is now authoritative for the working copy
    state.campaignInProgress.locator.version = version;
    // the synced baseline now matches the saved working copy exactly; current()
    // detaches a snapshot so later edits to campaignInProgress don't mutate it
    state.remoteCampaign = current(state.campaignInProgress);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
