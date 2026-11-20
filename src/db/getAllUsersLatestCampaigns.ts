import type { CampaignDbClient } from "./CampaignDbClient";

export type CampaignInfoInDirectory = {
  name: string;
  version: number;
  created_at: string;
};

export type CampaignDirectory = {
  [userId: string]: {
    user: {
      id: string;
      username: string;
      isCurrentUser: boolean;
    };
    campaigns: {
      [campaignName: string]: CampaignInfoInDirectory;
    };
  };
};

export const getAllUsersLatestCampaigns = async (
  /** client for the rpc call */
  db: CampaignDbClient,
  {
    publishedOnly,
  }: {
    publishedOnly: boolean;
  },
): Promise<CampaignDirectory> => {
  const res = await db.rpc("get_all_users_latest_campaigns", {
    p_published_only: publishedOnly,
  });

  if (res.error) {
    throw new Error("could not get user campaigns", { cause: res.error });
  }

  return res.data as CampaignDirectory;
};
