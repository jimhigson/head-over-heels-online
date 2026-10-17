import { type VerificationCampaign } from "./verificationTypes";
import { verifyCampaign } from "./verifyCampaign";

export type FixAllResult = {
  campaign: VerificationCampaign;
  /** the `fixText` of every fix applied, in order */
  fixed: string[];
};

/**
 * apply the fix of every fixable issue the campaign has now. Issues a fix
 * causes are left for the user to see, and fix in turn
 */
export const fixAllVerificationIssues = (
  campaign: VerificationCampaign,
): FixAllResult => {
  const fixableIssues = verifyCampaign(campaign).filter(
    ({ fixable }) => fixable,
  );
  return {
    campaign: fixableIssues.reduce(
      (fixedCampaign, issue) =>
        issue.verifier.fix(fixedCampaign, issue.issueData),
      campaign,
    ),
    fixed: fixableIssues.map(({ fixText }) => fixText),
  };
};
