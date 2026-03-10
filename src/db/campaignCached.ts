import type { Campaign } from "../model/modelTypes";
import type { CampaignDirectory, CampaignGetLocator } from "./campaign";

import { withLocalStorageCache } from "../utils/io/withLocalStorageCache";
import { getAllUsersLatestCampaigns, loadCampaignFromDb } from "./campaign";

export const loadCampaignFromDbCached = withLocalStorageCache<
  CampaignGetLocator,
  Campaign<string>
>(
  (options) =>
    `campaign/${options.userId ?? "$$noUserId"}/${options.campaignName}/${options.version ?? "$$noVersion"}`,
  loadCampaignFromDb,
);

export const getAllUsersLatestCampaignsCached = withLocalStorageCache<
  { publishedOnly: boolean },
  CampaignDirectory
>(
  (options) => `campaignDirectory/${options.publishedOnly}`,
  getAllUsersLatestCampaigns,
);
