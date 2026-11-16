import { withLocalStorageCache } from "../utils/io/withLocalStorageCache";
import { type CampaignDbClient } from "./CampaignDbClient";
import { getAllUsersLatestCampaigns } from "./getAllUsersLatestCampaigns";
import { withLoggingOfTiming } from "./withLoggingOfTiming";

export const getAllUsersLatestCampaignsCached = withLocalStorageCache(
  (_db: CampaignDbClient, options: { publishedOnly: boolean }) =>
    `campaignDirectory/${options.publishedOnly}`,
  import.meta.env.MODE === "visual-regression" ?
    withLoggingOfTiming(
      (_db: CampaignDbClient, options: { publishedOnly: boolean }) =>
        `campaign directory (publishedOnly: ${options.publishedOnly})`,
      getAllUsersLatestCampaigns,
    )
  : getAllUsersLatestCampaigns,
);
