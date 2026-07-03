import { type SaveResult } from "../../db/campaign";
import { importSupabaseDb } from "../../db/supabaseDb.import";
import { type CampaignLocator } from "../../model/modelTypes";
import {
  getLatestCampaignVersionViaApi,
  loadCampaignFromApi,
  saveCampaignViaApi,
} from "../../store/slices/campaigns/campaignApiHelpers";
import { type EditorThunk } from "../../store/store";
import { campaignIsNamed, type EditorCampaign } from "../editorTypes";
import {
  overwriteConfirmationShown,
  saveAsDialogShown,
  saveDialogClosed,
  saveFailed,
  saveFlashExpired,
  saveFlashShown,
  selectEditorSaveDialog,
  showOkAfterSaveDuration,
} from "./editorSaveSlice";
import {
  loadCampaign,
  saveSuccessful,
  selectCurrentCampaignInProgress,
  setCampaignName,
  setCampaignPublished,
  setCampaignUserId,
  setCampaignVersion,
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

export type SaveAsResult =
  | { latest: number; needsConfirmation: true }
  | { needsConfirmation: false; saveResult: SaveResult };

/**
 * Save the current campaign under a (possibly different) name, always under the
 * current user's account. Fetches the db's latest version for the target name
 * first: a never-saved name saves as v1; an existing name needs the user to
 * confirm stacking a new version on top of it (`needsConfirmation` result -
 * re-dispatch with `overwriteConfirmed` once they have). No slice state is
 * mutated until the save is actually going ahead.
 */
export const saveCampaignAs =
  ({
    campaignName,
    publish,
    overwriteConfirmed = false,
  }: {
    campaignName: string;
    publish: boolean;
    /** the user has confirmed stacking a new version on an existing campaign */
    overwriteConfirmed?: boolean;
  }): EditorThunk<Promise<SaveAsResult>> =>
  async (dispatch, getState) => {
    const { supabaseDb } = await importSupabaseDb();
    const { data, error } = await supabaseDb.auth.getUser();
    if (error || data.user === null) {
      return {
        needsConfirmation: false,
        saveResult: {
          ok: false,
          failure: { type: "auth", message: "You are not signed in" },
        },
      };
    }
    const userId = data.user.id;

    const { locator } = selectCurrentCampaignInProgress(getState());
    if (userId === locator.userId && campaignName === locator.campaignName) {
      // saving over ourselves is just a plain save - keep the existing version
      // lease so a genuine remote conflict still surfaces
      dispatch(setCampaignPublished(publish));
      return {
        needsConfirmation: false,
        saveResult: await dispatch(saveCampaign({ force: false })),
      };
    }

    const { data: latest } = await getLatestCampaignVersionViaApi({
      campaignName,
      userId,
    });
    if (latest === undefined) {
      return {
        needsConfirmation: false,
        saveResult: {
          ok: false,
          failure: {
            type: "network",
            message: "could not check for an existing campaign with this name",
          },
        },
      };
    }

    if (latest > 0 && !overwriteConfirmed) {
      return { needsConfirmation: true, latest };
    }

    dispatch(setCampaignUserId(userId));
    dispatch(setCampaignName(campaignName));
    dispatch(setCampaignPublished(publish));
    // 0 for a never-saved name (no lease - the db assigns v1); otherwise the
    // fetched latest becomes the force-with-lease base, so a save racing in
    // between the check and the save is still caught as a conflict
    dispatch(setCampaignVersion(latest));

    return {
      needsConfirmation: false,
      saveResult: await dispatch(saveCampaign({ force: false })),
    };
  };

/**
 * surface a save's outcome in the editorSave slice: a passing save closes any
 * open dialog and shows the "vN" flash on the save button; a failing one shows
 * the SaveFailedDialog
 */
const saveOutcomeShown =
  (saveResult: SaveResult): EditorThunk =>
  (dispatch) => {
    if (saveResult.ok) {
      dispatch(saveDialogClosed());
      dispatch(saveFlashShown());
      setTimeout(() => dispatch(saveFlashExpired()), showOkAfterSaveDuration);
    } else {
      dispatch(saveFailed(saveResult.failure));
    }
  };

/**
 * the toolbar save button: an unnamed campaign starts the save-as journey;
 * otherwise saves, showing the outcome. `force` overrides a stale-version
 * conflict (from the SaveFailedDialog's force-save/retry buttons)
 */
export const savePressed =
  ({ force = false }: { force?: boolean } = {}): EditorThunk<Promise<void>> =>
  async (dispatch, getState) => {
    if (!campaignIsNamed(selectCurrentCampaignInProgress(getState()))) {
      dispatch(saveAsDialogShown());
      return;
    }
    dispatch(saveOutcomeShown(await dispatch(saveCampaign({ force }))));
  };

/**
 * the SaveAsDialog's save button: closes it and runs the save-as journey,
 * which may pause on the ConfirmSaveOverDialog before anything is written
 */
export const saveAsSubmitted =
  ({
    campaignName,
    publish,
    overwriteConfirmed = false,
  }: {
    campaignName: string;
    publish: boolean;
    overwriteConfirmed?: boolean;
  }): EditorThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch(saveDialogClosed());
    const result = await dispatch(
      saveCampaignAs({ campaignName, publish, overwriteConfirmed }),
    );
    if (result.needsConfirmation) {
      dispatch(
        overwriteConfirmationShown({
          campaignName,
          publish,
          latest: result.latest,
        }),
      );
    } else {
      dispatch(saveOutcomeShown(result.saveResult));
    }
  };

/** the ConfirmSaveOverDialog's confirm button */
export const confirmOverwritePressed =
  (): EditorThunk<Promise<void>> => async (dispatch, getState) => {
    const dialog = selectEditorSaveDialog(getState());
    if (dialog?.type !== "confirmOverwrite") {
      throw new Error(
        "can only confirm an overwrite while the confirmation is showing",
      );
    }
    const { campaignName, publish } = dialog;
    await dispatch(
      saveAsSubmitted({ campaignName, publish, overwriteConfirmed: true }),
    );
  };

/**
 * the SaveFailedDialog's "load latest" button: discard local changes and load
 * the newest version from the db
 */
export const latestVersionLoadedInsteadOfSaving =
  (): EditorThunk<Promise<void>> => async (dispatch, getState) => {
    const campaign = selectCurrentCampaignInProgress(getState());
    dispatch(saveDialogClosed());
    if (campaignIsNamed(campaign)) {
      await dispatch(
        loadCampaignIntoEditor({ ...campaign.locator, version: -1 }),
      );
    }
  };

/** the "revert" menu item: reload the campaign as last saved */
export const revertPressed =
  (): EditorThunk<Promise<void>> => async (dispatch, getState) => {
    const campaign = selectCurrentCampaignInProgress(getState());
    if (!campaignIsNamed(campaign)) {
      throw new Error("can only revert if already on a named campaign");
    }
    await dispatch(loadCampaignIntoEditor(campaign.locator));
  };

/** the OpenCampaignDialog's selection: close it and load the chosen campaign */
export const openCampaignSubmitted =
  (campaignLocator: CampaignLocator): EditorThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch(saveDialogClosed());
    await dispatch(loadCampaignIntoEditor(campaignLocator));
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
