import { importOnce } from "../utils/importOnce";

export const importGetAllUsersLatestCampaignsCachedOnce = importOnce(
  () => import("./getAllUsersLatestCampaignsCached"),
);
