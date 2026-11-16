import { loadOriginalCampaign } from "../../../_generated/originalCampaign/loadOriginalCampaign";
import { type CampaignGetLocator } from "../../../db/campaign";
import { loadCampaignFromDbCached } from "../../../db/campaignCached";
import { importCampaignDbClient } from "../../../db/campaignDbClient.import";
import { decompressCampaignObject } from "../../../db/compressCampaignObject";
import { migrateCampaignInPlace } from "../../../model/inPlaceMutators/migrateCampaignInPlace";
import { type Campaign } from "../../../model/modelTypes";

/**
 * load a campaign from wherever its locator says it lives
 */
export const loadCampaign = async (
  campaignLocator: CampaignGetLocator,
): Promise<Campaign<string>> => {
  if (
    campaignLocator.userId === "@@original" &&
    campaignLocator.campaignName === "original"
  ) {
    // original campaign is deployed with the game - loaded via import
    // (plain ts in dev, columnar blob + decoder in prod)
    return await loadOriginalCampaign();
  }

  // data url type locator - mostly for the level editor so it
  // can load rooms to playtest without saving to the db first
  if (campaignLocator.campaignName.startsWith("data:")) {
    const campaign = await decompressCampaignObject<Campaign<string>>(
      campaignLocator.campaignName.substring("data:".length),
    );
    // the encoded campaign could have been authored under an older
    // format (eg walls without tiles):
    migrateCampaignInPlace(campaign);
    return campaign;
  }

  // load via the database:
  return await loadCampaignFromDbCached(
    await importCampaignDbClient(),
    campaignLocator,
  );
};
