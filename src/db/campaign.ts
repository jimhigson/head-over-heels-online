import type { SetOptional } from "type-fest";

import type { EditorCampaign } from "../editor/editorTypes";
import type { Campaign, CampaignLocator } from "../model/modelTypes";

import { compressObject, decompressObject } from "./compressObject";
import { supabaseDb } from "./supabaseDb";

export type CampaignGetLocator = SetOptional<
  CampaignLocator,
  /**
   * userId is optional - will use the current user if not given
   */
  | "userId"
  /**
   * version is optional - will get the latest if not given
   */
  | "version"
>;

export const saveCampaignToDb = async (campaign: EditorCampaign) => {
  if (campaign.locator.campaignName === undefined) {
    throw new Error("can not save a campaign without a name");
  }

  const res = await supabaseDb.rpc("save_campaign_version", {
    p_name: campaign.locator.campaignName,
    p_data: await compressObject(campaign),
    p_published: campaign.meta?.published ?? false,
  });

  if (res.error) {
    throw new Error(
      `error saving to db ${res.error.message} ${res.error.details}`,
      {
        cause: res.error,
      },
    );
  }

  return res.data;
};

export const loadCampaignFromDb = async (options: CampaignGetLocator) => {
  const res = await supabaseDb.rpc("get_latest_campaign", {
    p_campaign_name: options.campaignName,
    p_user_id: options.userId,
    // the db doesn't recognise -1 - needs undefined
    p_version: options.version === -1 ? undefined : options.version,
  });

  if (res.error) {
    throw new Error("could not get campaign", { cause: res.error });
  }

  const data = await decompressObject<Campaign<string>>(res.data.data);

  Object.values(data.rooms).forEach((room) => {
    // migrate rooms to newer format - this can be removed when .size is gone from all campaigns likely to be loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- need any since this is explicitly not a type we have any more since .size was removed
    delete (room as any).size;
  });

  // upgrade/fill in data from before this locator was added:
  // this can be removed after all old campaigns have been updated in the db
  if (data.locator === undefined) {
    data.locator = {
      userId: options.userId || "upgraded, unknown",
      campaignName: options.campaignName,
      version: res.data.version,
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- removing a property because it no longer exists
  delete (data as any).name;

  return data;
};

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

export const getAllUsersLatestCampaigns = async ({
  publishedOnly,
}: {
  publishedOnly: boolean;
}): Promise<CampaignDirectory> => {
  const res = await supabaseDb.rpc("get_all_users_latest_campaigns", {
    p_published_only: publishedOnly,
  });

  if (res.error) {
    throw new Error("could not get user campaigns", { cause: res.error });
  }

  return res.data as CampaignDirectory;
};
