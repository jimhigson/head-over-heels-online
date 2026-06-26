import { type CampaignDbClient } from "./CampaignDbClient";

/**
 * The display name for a user id, or null if they have no profile row. Lightweight
 * single-row lookup - used by the editor to show a campaign's owner without
 * fetching the whole all-users directory.
 */
export const getUsername = async (
  /** client for the rpc call */
  db: CampaignDbClient,
  userId: string,
): Promise<null | string> => {
  const res = await db.rpc("get_username", { p_user_id: userId });

  if (res.error) {
    throw new Error("could not get username", { cause: res.error });
  }

  return res.data;
};
