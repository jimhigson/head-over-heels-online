import { withLocalStorageCache } from "../utils/io/withLocalStorageCache";
import {
  type CampaignGetLocator,
  getAllUsersLatestCampaigns,
  loadCampaignFromDb,
} from "./campaign";
import { type CampaignDbClient } from "./CampaignDbClient";

export const loadCampaignFromDbCached = withLocalStorageCache(
  (_db: CampaignDbClient, options: CampaignGetLocator) =>
    `campaign/${options.userId ?? "$$noUserId"}/${options.campaignName}/${options.version ?? "$$noVersion"}`,
  loadCampaignFromDb,
);

export const getAllUsersLatestCampaignsCached = withLocalStorageCache(
  (_db: CampaignDbClient, options: { publishedOnly: boolean }) =>
    `campaignDirectory/${options.publishedOnly}`,
  getAllUsersLatestCampaigns,
);
