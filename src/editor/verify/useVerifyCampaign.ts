import { createSelector } from "@reduxjs/toolkit";

import { type CampaignVerificationIssue } from "../../model/json/verification/CampaignVerification";
import { type VerificationCampaign } from "../../model/json/verification/verificationTypes";
import { verifyCampaign } from "../../model/json/verification/verifyCampaign";
import { type EditorRootState, useEditorAppSelector } from "../../store/store";
import { useDebouncedValue } from "../../utils/preact/useDebouncedValue";
import { createShallowStableSelector } from "../../utils/redux/createShallowStableSelector";
import { type EditorCampaign } from "../editorTypes";
import { selectCurrentCampaignInProgress } from "../slice/levelEditorSlice";

/**
 * the issues (errors and warnings) found in the open campaign - empty when it
 * is clean. The issues are erased to `unknown` issueData - the orchestrator
 * treats them opaquely and only passes them back to their own verifier's `fix`.
 */
export type VerificationResult = CampaignVerificationIssue<unknown>[];

/**
 * verification is fairly expensive (it walks the whole campaign), so memoise on
 * the campaign reference - it only recomputes when the campaign actually changes
 */
const verificationOfCampaign = createSelector(
  [(campaign: EditorCampaign) => campaign],
  (campaign): VerificationResult =>
    // the verifiers work on plain-string ids; erase the editor's branded ids
    verifyCampaign(campaign as VerificationCampaign),
);

/**
 * the open campaign's issues as it is now
 */
export const selectVerification = (state: EditorRootState) =>
  verificationOfCampaign(selectCurrentCampaignInProgress(state));

/**
 * verifying on every edit costs every edit, so what is shown is verified at
 * most this often while editing
 */
const verificationDebounceMs = 500;

/**
 * the open campaign as it was once edits to it paused - verifying this rather
 * than the campaign as it is now spares verifying during runs of edits
 */
const useCampaignToVerify = (): EditorCampaign =>
  useDebouncedValue(
    useEditorAppSelector(selectCurrentCampaignInProgress),
    verificationDebounceMs,
  );

/**
 * the open campaign's issues as it is now, without waiting for edits to pause -
 * for what acts on the issues (eg fixing them), which must see the campaign
 * those actions will change
 */
export const useVerifyCampaign = (): VerificationResult =>
  useEditorAppSelector(selectVerification);

export type VerificationCounts = {
  errors: number;
  warnings: number;
};

/**
 * how many errors and warnings a campaign has - unchanged by edits that leave
 * the numbers the same
 */
const verificationCountsOfCampaign = createShallowStableSelector(
  [verificationOfCampaign],
  (issues): VerificationCounts => ({
    errors: issues.filter(({ severity }) => severity === "error").length,
    warnings: issues.filter(({ severity }) => severity === "warning").length,
  }),
);

export const useVerificationCounts = (): VerificationCounts =>
  verificationCountsOfCampaign(useCampaignToVerify());
