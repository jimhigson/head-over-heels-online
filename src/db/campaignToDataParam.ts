import { compressCampaignObject } from "./compressCampaignObject";

/**
 * make a `?campaignName=` query-param value that loads a campaign directly from the
 * url-encoded campaign
 */
export const campaignToDataParam = async (campaign: object): Promise<string> =>
  `data:${await compressCampaignObject(campaign)}`;
