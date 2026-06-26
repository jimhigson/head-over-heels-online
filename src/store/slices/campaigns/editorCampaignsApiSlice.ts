import { type BaseQueryFn, type EndpointBuilder } from "@reduxjs/toolkit/query";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  getLatestCampaignVersion,
  saveCampaignToDb,
  type SaveResult,
} from "../../../db/campaign";
import { importCampaignDbClient } from "../../../db/campaignDbClient.import";
import { getUsername } from "../../../db/getUsername";
import { type EditorCampaign } from "../../../editor/editorTypes";
import { type Campaign, type CampaignLocator } from "../../../model/modelTypes";
import { createSerialisableErrors } from "../../../utils/redux/createSerialisableErrors";
import { type GameRootState } from "../../store";
import { gameCampaignEndpoints } from "./gameCampaignsApiSlice";

// the endpoints the game needs, *plus* some extra ones that the editor also needs (saving etc)
const editorCampaignEndpoints = (
  builder: EndpointBuilder<
    // oxlint-disable-next-line typescript/no-explicit-any typescript/no-empty-object-type -- this is how rtk query defines it
    BaseQueryFn<any, unknown, unknown, {}, {}>,
    never,
    "campaignsApi"
  >,
) => ({
  ...gameCampaignEndpoints(builder),

  saveCampaign: builder.mutation<
    SaveResult,
    { baseVersion: null | number; campaign: EditorCampaign; force: boolean }
  >({
    async queryFn({ baseVersion, campaign, force }) {
      try {
        return {
          data: await saveCampaignToDb(
            await importCampaignDbClient(),
            campaign,
            { baseVersion, force },
          ),
        };
      } catch (e) {
        return {
          error: createSerialisableErrors(
            new Error(`saveCampaign queryFn failed`, { cause: e }),
          ),
        };
      }
    },
  }),
  // fresh (uncached) latest-version lookup for the staleness check
  getLatestCampaignVersion: builder.query<
    number,
    Pick<CampaignLocator, "campaignName" | "userId">
  >({
    async queryFn(locator) {
      try {
        return {
          data: await getLatestCampaignVersion(
            await importCampaignDbClient(),
            locator,
          ),
        };
      } catch (e) {
        return {
          error: createSerialisableErrors(
            new Error(
              `getLatestCampaignVersion queryFn( ${JSON.stringify(locator)} ) failed`,
              { cause: e },
            ),
          ),
        };
      }
    },
  }),
  getUsername: builder.query<null | string, string>({
    async queryFn(userId) {
      try {
        return {
          data: await getUsername(await importCampaignDbClient(), userId),
        };
      } catch (e) {
        return {
          error: createSerialisableErrors(
            new Error(`getUsername queryFn( ${userId} ) failed`, {
              cause: e,
            }),
          ),
        };
      }
    },
  }),
});

export const editorCampaignsApiSlice = createApi({
  reducerPath: "campaignsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: editorCampaignEndpoints,
});

export const {
  useGetAllUsersLatestCampaignsQuery,
  useGetLatestCampaignVersionQuery,
  useGetUsernameQuery,
} = editorCampaignsApiSlice;

const selectCampaignRaw = editorCampaignsApiSlice.endpoints.getCampaign.select;

/** simplified selector for getting a loaded campaign */
export const selectMaybeLoadedCampaignData = <RowId extends string>(
  state: GameRootState,
  campaignLocator: CampaignLocator,
): Campaign<RowId> | undefined => {
  const result = selectCampaignRaw(campaignLocator)(state);
  return result.data as Campaign<RowId> | undefined;
};
