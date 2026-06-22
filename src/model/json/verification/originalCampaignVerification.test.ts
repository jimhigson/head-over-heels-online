import { expect, test } from "vitest";

import { campaign as originalCampaign } from "../../../_generated/originalCampaign/campaign";
import { allVerifiers } from "./allVerifiers";
import { verificationGraph } from "./helpers/verificationGraph";
import { type VerificationCampaign } from "./verificationTypes";

/**
 * The burnt-in original campaign is the gold standard: it should trip none of
 * the error-level verifiers. (Warnings are allowed - it carries a few redundant
 * times and an open-edged room.)
 *
 * Known to currently fail on three rooms whose items the original XML placed at
 * off-grid positions (`blacktooth60`, `bookworld14`, `finalroom`); those are
 * genuine schema violations to be fixed in the original data.
 */
test("the original campaign has no verification errors", () => {
  const campaign = originalCampaign as unknown as VerificationCampaign;
  const graph = verificationGraph(campaign);

  const errors = allVerifiers
    .flatMap((verifier) => verifier.check(campaign, graph).toArray())
    .filter((issue) => issue.severity === "error")
    .map((issue) => `[${issue.verifier.name}] ${issue.msg}`);

  expect(errors).toEqual([]);
});
