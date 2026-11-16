import { migrateCampaignInPlace } from "../model/inPlaceMutators/migrateCampaignInPlace";
import { withLocalStorageCache } from "../utils/io/withLocalStorageCache";
import { type CampaignGetLocator, loadCampaignFromDb } from "./campaign";
import { type CampaignDbClient } from "./CampaignDbClient";
import { withLoggingOfTiming } from "./withLoggingOfTiming";

export const loadCampaignFromDbCached = withLocalStorageCache(
  (_db: CampaignDbClient, options: CampaignGetLocator) =>
    `campaign/${options.userId ?? "$$noUserId"}/${options.campaignName}/${options.version ?? "$$noVersion"}`,
  import.meta.env.MODE === "visual-regression" ?
    withLoggingOfTiming(
      (_db: CampaignDbClient, options: CampaignGetLocator) =>
        `campaign ${options.userId ?? "$$noUserId"}/${options.campaignName}`,
      loadCampaignFromDb,
    )
  : loadCampaignFromDb,
  (cachedCampaign) => {
    // migrate here too if needed since code might have changed since the cache
    // was written to:
    migrateCampaignInPlace(cachedCampaign);
    return cachedCampaign;
  },
);
