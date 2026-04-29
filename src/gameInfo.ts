import type { CampaignLocator } from "./model/modelTypes";

export const discordInviteUrl = "https://discord.gg/Se5Jznc2jm";
export const jimAtBlockstackingUserId = "2924c962-99f1-4dd2-9b9c-fef832dc991b";

/**
 * Sentinel `userId` for the bundled, original-game campaign — the one
 * that ships burnt into the source via codegen and plays offline. Real
 * supabase users have UUID userIds; this special value distinguishes
 * the built-in campaign from any user-authored one.
 */
export const originalUserId = "@@original" as const;
export const originalCampaignName = "original" as const;

/**
 * Locator for the bundled, original-game campaign.
 */
export const originalCampaignLocator: CampaignLocator = {
  userId: originalUserId,
  campaignName: originalCampaignName,
  version: -1,
};

/**
 * Locator for the in-development sequel campaign hosted in supabase under
 * Jim's user id. Loaded via the campaigns API at runtime.
 */
export const sequelCampaignLocator: CampaignLocator = {
  userId: jimAtBlockstackingUserId,
  campaignName: "sequel_23",
  version: -1,
};
