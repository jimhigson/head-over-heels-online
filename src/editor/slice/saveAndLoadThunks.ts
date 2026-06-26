import { type SaveResult } from "../../db/campaign";
import { importSupabaseDb } from "../../db/supabaseDb.import";
import { type CampaignLocator } from "../../model/modelTypes";
import {
  loadCampaignFromApi,
  saveCampaignViaApi,
} from "../../store/slices/campaigns/campaignApiHelpers";
import { type EditorThunk } from "../../store/store";
import { campaignIsNamed, type EditorCampaign } from "../editorTypes";
import {
  loadCampaign,
  saveSuccessful,
  selectCurrentCampaignInProgress,
  setCampaignUserId,
} from "./levelEditorSlice";

/**
 * Save the current campaign to the db with force-with-lease semantics, bumping the
 * in-memory version on success. Returns a SaveResult so the caller can surface a
 * conflict / auth / network failure; pass `force` to override a stale-version
 * conflict (overwriting newer work).
 */
export const saveCampaign =
  ({ force = false }: { force?: boolean } = {}): EditorThunk<
    Promise<SaveResult>
  > =>
  async (dispatch, getState) => {
    const campaign = selectCurrentCampaignInProgress(getState());
    if (!campaignIsNamed(campaign)) {
      return {
        ok: false,
        failure: {
          type: "other",
          message: "Campaign is not named, can't save",
        },
      };
    }

    const { supabaseDb } = await importSupabaseDb();
    const { data, error } = await supabaseDb.auth.getUser();
    if (error || data.user === null) {
      return {
        ok: false,
        failure: { type: "auth", message: "You are not signed in" },
      };
    }

    const userId = data.user.id;
    // saving someone else's campaign forks it under your own user: a new campaign
    // with no prior version, so there's nothing to lease against
    const isFork = userId !== campaign.locator.userId;
    if (isFork) {
      dispatch(setCampaignUserId(userId));
    }
    const baseVersion =
      isFork || campaign.locator.version <= 0 ? null : campaign.locator.version;

    const { data: saveResult } = await saveCampaignViaApi(
      selectCurrentCampaignInProgress(getState()),
      { baseVersion, force },
    );
    if (saveResult === undefined) {
      return { ok: false, failure: { type: "other", message: "save failed" } };
    }

    if (saveResult.ok) {
      dispatch(saveSuccessful({ version: saveResult.version }));
    }
    return saveResult;
  };

/** fetch a campaign fresh from the api and load it into the editor */
export const loadCampaignIntoEditor =
  (campaignLocator: CampaignLocator): EditorThunk<Promise<void>> =>
  async (dispatch) => {
    const result = await loadCampaignFromApi(campaignLocator, {
      forceRefetch: true,
    });

    if (result.data) {
      const campaign = result.data as EditorCampaign;
      console.info("loaded", campaign);
      dispatch(loadCampaign({ campaign }));
    } else if (result.error) {
      console.error("Failed to load:", result.error);
    }
  };
