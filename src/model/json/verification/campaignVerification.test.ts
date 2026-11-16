import { describe, expect, test } from "vitest";

import { campaign as originalCampaign } from "../../../_generated/originalCampaign/campaign";
import { loadCampaignFromDb } from "../../../db/campaign";
import { postgrestDbClient } from "../../../db/postgrestDbClient";
import { sequelCampaignLocator } from "../../../gameInfo";
import { allVerifiers } from "./allVerifiers";
import { verificationGraph } from "./helpers/verificationGraph";
import { type VerificationCampaign } from "./verificationTypes";

// the latest version in the db, so the sequel is checked as it is now - a pass
// only holds for the version there when this ran:
const sequelCampaign = await loadCampaignFromDb(
  postgrestDbClient,
  sequelCampaignLocator,
);

// both are offered from the game's main menu, so are held to the editor's own
// checks - warnings as well as errors:
describe.for([
  {
    campaignName: "the original campaign",
    campaign: originalCampaign as VerificationCampaign,
  },
  {
    campaignName: `the sequel (${sequelCampaign.locator.campaignName} v${sequelCampaign.locator.version})`,
    campaign: sequelCampaign as VerificationCampaign,
  },
])("$campaignName", ({ campaign }) => {
  const graph = verificationGraph(campaign);

  test.for(allVerifiers)("has no '$name' issues", (verifier) => {
    expect(
      verifier
        .check(campaign, graph)
        .map(({ severity, roomId, itemIds, msg }) => ({
          severity,
          roomId,
          itemIds,
          msg,
        }))
        .toArray(),
    ).toEqual([]);
  });
});
