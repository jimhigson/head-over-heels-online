import type { Campaign } from "../model/modelTypes";
import { compressObject, decompressObject } from "./compressObject";
import { supabaseDb } from "./supabaseDb";

export const saveCampaignToDb = async (
  name: string,
  campaign: Campaign<string>,
) => {
  const res = await supabaseDb
    .from("campaigns")
    .upsert([{ name, data: await compressObject(campaign) }])
    .select();

  if (res.error) {
    throw new Error(
      `error saving to db ${res.error.message} ${res.error.details}`,
      {
        cause: res.error,
      },
    );
  }

  console.log("saved ok", res.data);

  return res.data;
};

export const loadCampaignFromDb = async (name: string) => {
  const res = await supabaseDb
    .from("campaigns")
    .select("data")
    .eq("name", name);

  if (res.error) {
    throw res.error;
  }
  const [row] = res.data;
  return (await decompressObject(row.data!)) as Campaign<string>;
};
