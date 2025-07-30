import type { Campaign } from "../model/modelTypes";
import { compressObject, decompressObject } from "./compressObject";
import { supabaseDb } from "./supabaseDb";

export const saveCampaignToDb = async (
  name: string,
  campaign: Campaign<string>,
) => {
  const res = await supabaseDb.rpc("save_campaign_version", {
    p_name: name,
    p_data: await compressObject(campaign),
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

export const loadCampaignFromDb = async (options: {
  name: string;
  createdBy?: string;
  version?: number;
}) => {
  const res = await supabaseDb.rpc("get_latest_campaign", {
    p_name: options.name,
    p_created_by: options.createdBy,
    p_version: options.version,
  });

  if (res.error) {
    throw res.error;
  }

  return (await decompressObject(res.data.data)) as Campaign<string>;
};
