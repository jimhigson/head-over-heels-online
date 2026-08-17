import { withLocalStorageCache } from "../utils/io/withLocalStorageCache";
import {
  type CampaignGetLocator,
  getAllUsersLatestCampaigns,
  loadCampaignFromDb,
} from "./campaign";
import { type CampaignDbClient } from "./CampaignDbClient";

/**
 * e2e-only: narrate a db load for debugging test failures
 */
const withLoggingOfTiming =
  <Args extends unknown[], T>(
    /** how this load should be named in the log */
    describe: (...args: Args) => string,
    /** the load to narrate */
    load: (...args: Args) => Promise<T>,
  ) =>
  async (...args: Args): Promise<T> => {
    const what = describe(...args);
    const startedAt = performance.now();
    console.log(`[db] ${what} started`);
    try {
      const loaded = await load(...args);
      console.log(
        `[db] ${what} loaded in ${Math.round(performance.now() - startedAt)}ms`,
      );
      return loaded;
    } catch (e) {
      console.log(
        `[db] ${what} failed after ${Math.round(performance.now() - startedAt)}ms: ${e}`,
      );
      throw e;
    }
  };

const isVisualRegressionBuild = import.meta.env.MODE === "visual-regression";

export const loadCampaignFromDbCached = withLocalStorageCache(
  (_db: CampaignDbClient, options: CampaignGetLocator) =>
    `campaign/${options.userId ?? "$$noUserId"}/${options.campaignName}/${options.version ?? "$$noVersion"}`,
  isVisualRegressionBuild ?
    withLoggingOfTiming(
      (_db: CampaignDbClient, options: CampaignGetLocator) =>
        `campaign ${options.userId ?? "$$noUserId"}/${options.campaignName}`,
      loadCampaignFromDb,
    )
  : loadCampaignFromDb,
);

export const getAllUsersLatestCampaignsCached = withLocalStorageCache(
  (_db: CampaignDbClient, options: { publishedOnly: boolean }) =>
    `campaignDirectory/${options.publishedOnly}`,
  isVisualRegressionBuild ?
    withLoggingOfTiming(
      (_db: CampaignDbClient, options: { publishedOnly: boolean }) =>
        `campaign directory (publishedOnly: ${options.publishedOnly})`,
      getAllUsersLatestCampaigns,
    )
  : getAllUsersLatestCampaigns,
);
