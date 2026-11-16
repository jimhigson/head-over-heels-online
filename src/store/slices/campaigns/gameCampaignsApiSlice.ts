import { type BaseQueryFn, type EndpointBuilder } from "@reduxjs/toolkit/query";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { type CampaignGetLocator } from "../../../db/campaign";
import { importCampaignDbClient } from "../../../db/campaignDbClient.import";
import { type CampaignDirectory } from "../../../db/getAllUsersLatestCampaigns";
import { importGetAllUsersLatestCampaignsCachedOnce } from "../../../db/getAllUsersLatestCampaignsCached.import";
import { type Campaign, type CampaignLocator } from "../../../model/modelTypes";
import { createSerialisableErrors } from "../../../utils/redux/createSerialisableErrors";
import { type GameRootState } from "../../store";
import { importLoadCampaignOnce } from "./loadCampaign.import";

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
        const { loadCampaign } = await importLoadCampaignOnce();
        return { data: await loadCampaign(campaignLocator) };
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
        const { getAllUsersLatestCampaignsCached } =
          await importGetAllUsersLatestCampaignsCachedOnce();
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
