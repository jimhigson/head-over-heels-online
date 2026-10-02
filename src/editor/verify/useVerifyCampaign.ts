import { createSelector } from "@reduxjs/toolkit";

import { type CampaignVerificationIssue } from "../../model/json/verification/CampaignVerification";
import { type VerificationCampaign } from "../../model/json/verification/verificationTypes";
import { verifyCampaign } from "../../model/json/verification/verifyCampaign";
import { useEditorAppSelector } from "../../store/store";
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
export const selectVerification = createSelector(
  [selectCurrentCampaignInProgress],
  (campaign): VerificationResult =>
    // the verifiers work on plain-string ids; erase the editor's branded ids
    verifyCampaign(campaign as VerificationCampaign),
);

export const useVerifyCampaign = (): VerificationResult =>
  useEditorAppSelector(selectVerification);
