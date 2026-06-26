import { type BaseQueryFn, type EndpointBuilder } from "@reduxjs/toolkit/query";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { importOriginalCampaign } from "../../../_generated/originalCampaign/campaign.import";
import {
  type CampaignDirectory,
  type CampaignGetLocator,
} from "../../../db/campaign";
import {
  getAllUsersLatestCampaignsCached,
  loadCampaignFromDbCached,
} from "../../../db/campaignCached";
import { importCampaignDbClient } from "../../../db/campaignDbClient.import";
import { decompressObject } from "../../../db/compressObject";
import { type Campaign, type CampaignLocator } from "../../../model/modelTypes";
import { createSerialisableErrors } from "../../../utils/redux/createSerialisableErrors";
import { type GameRootState } from "../../store";

// subset of just the endpoints needed for the game, not sufficient for the editor
export const gameCampaignEndpoints = (
  builder: EndpointBuilder<
    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-empty-object-type -- this is how rtk query defines it
    BaseQueryFn<any, unknown, unknown, {}, {}>,
    never,
    "campaignsApi"
  >,
) => ({
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
        return {
          data: await loadCampaignFromDbCached(
            await importCampaignDbClient(),
            campaignLocator,
          ),
        };
      } catch (e) {
        return {
          error: createSerialisableErrors(
            new Error(
              `getCampaign queryFn( ${JSON.stringify(campaignLocator)} ) failed`,
              { cause: e },
            ),
          ),
        };
      }
    },
  }),
  getAllUsersLatestCampaigns: builder.query<
    CampaignDirectory,
    { publishedOnly: boolean }
  >({
    async queryFn({ publishedOnly }) {
      try {
        const campaigns = await getAllUsersLatestCampaignsCached(
          await importCampaignDbClient(),
          { publishedOnly },
        );
        return { data: campaigns };
      } catch (e) {
        return {
          error: createSerialisableErrors(
            new Error(`getAllUsersLatestCampaigns queryFn() failed: ${e}`),
          ),
        };
      }
    },
  }),
});

export const gameCampaignsApiSlice = createApi({
  reducerPath: "campaignsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: gameCampaignEndpoints,
});

export const { useGetAllUsersLatestCampaignsQuery } = gameCampaignsApiSlice;

const selectCampaignRaw = gameCampaignsApiSlice.endpoints.getCampaign.select;

/** simplified selector for getting a loaded campaign */
export const selectMaybeLoadedCampaignData = <RowId extends string>(
  state: GameRootState,
  campaignLocator: CampaignLocator,
): Campaign<RowId> | undefined => {
  const result = selectCampaignRaw(campaignLocator)(state);
  return result.data as Campaign<RowId> | undefined;
};
