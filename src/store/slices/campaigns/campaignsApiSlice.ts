import type { Campaign, CampaignLocator } from "../../../model/modelTypes";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CampaignDirectory,
  CampaignGetLocator,
} from "../../../db/campaign";
import {
  getAllUsersLatestCampaigns,
  loadCampaignFromDb,
  saveCampaignToDb,
} from "../../../db/campaign";
import type { RootState } from "../../store";
import { importOriginalCampaign } from "../../../_generated/originalCampaign/campaign.import";
import { decompressObject } from "../../../db/compressObject";

export const campaignsApiSlice = createApi({
  reducerPath: "campaignsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCampaign: builder.query<Campaign<string>, CampaignGetLocator>({
      async queryFn(campaignLocator) {
        try {
          if (
            campaignLocator.userId === "@@original" &&
            campaignLocator.campaignName === "original"
          ) {
            // original campaign is deployed with the game - import via es6 import
            return { data: (await importOriginalCampaign()).campaign };
          }

          // data url type locator - mostly for the level editor so it
          // can load rooms to playtest without saving to the db first
          if (campaignLocator.campaignName.startsWith("data:")) {
            return {
              data: await decompressObject<Campaign<string>>(
                campaignLocator.campaignName.substring("data:".length),
              ),
            };
          }

          // load via the database:
          return { data: await loadCampaignFromDb(campaignLocator) };
        } catch (e) {
          return { error: new Error(`queryFn failed: ${e}`) };
        }
      },
    }),
    getAllUsersLatestCampaigns: builder.query<CampaignDirectory, void>({
      async queryFn() {
        try {
          const campaigns = await getAllUsersLatestCampaigns();
          return { data: campaigns };
        } catch (e) {
          return { error: new Error(`queryFn failed: ${e}`) };
        }
      },
    }),
    saveCampaign: builder.mutation<number, Campaign<string>>({
      async queryFn(campaign) {
        try {
          const version = await saveCampaignToDb(campaign);
          return { data: version };
        } catch (e) {
          return { error: new Error(`queryFn failed: ${e}`) };
        }
      },
    }),
  }),
});

export const {
  useGetCampaignQuery,
  useGetAllUsersLatestCampaignsQuery,
  useSaveCampaignMutation,
} = campaignsApiSlice;

const selectCampaignRaw = campaignsApiSlice.endpoints.getCampaign.select;

/** simplified selector for getting a loaded campaign */
export const selectMaybeLoadedCampaignData = <RowId extends string>(
  state: RootState,
  campaignLocator: CampaignLocator,
): Campaign<RowId> | undefined => {
  const result = selectCampaignRaw(campaignLocator)(state);
  return result.data as Campaign<RowId> | undefined;
};

export const selectLoadedCampaignData = <RowId extends string>(
  state: RootState,
  campaignLocator: CampaignLocator,
): Campaign<RowId> => {
  const result = selectCampaignRaw(campaignLocator)(state);
  if (result.data === undefined) {
    throw new Error(
      `Campaign not loaded ${campaignLocator.campaignName} ${campaignLocator.userId}`,
    );
  }
  return result.data as Campaign<RowId>;
};
