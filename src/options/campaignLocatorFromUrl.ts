import type { CampaignLocator } from "../model/modelTypes";
import { typedURLSearchParams } from "./queryParams";

/**
 * Build a complete CampaignLocator from URL params, or `undefined` if the URL
 * doesn't name a campaign. URL-named campaigns always resolve to "latest"
 * (`version: -1`) — the URL only carries userId + campaignName.
 */
export const campaignLocatorFromUrl = (): CampaignLocator | undefined => {
  const params = typedURLSearchParams();
  const userId = params.get("campaignAuthorUserId");
  const campaignName = params.get("campaignName");
  if (userId === null || campaignName === null) {
    return undefined;
  }
  return { userId, campaignName, version: -1 };
};
