import { allVerifiers } from "./allVerifiers";
import { type CampaignVerificationIssue } from "./CampaignVerification";
import { verificationGraph } from "./helpers/verificationGraph";
import { type VerificationCampaign } from "./verificationTypes";

/**
 * Run all the verifiers against a campaign and flatten their results into a single array
 */
export const verifyCampaign = (
  campaign: VerificationCampaign,
): CampaignVerificationIssue<unknown>[] => {
  const graph = verificationGraph(campaign);
  return allVerifiers.flatMap((verifier) =>
    verifier.check(campaign, graph).toArray(),
  );
};
