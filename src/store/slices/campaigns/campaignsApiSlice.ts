import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { importOriginalCampaign } from "../../../_generated/originalCampaign/campaign.import";
import {
  type CampaignDirectory,
  type CampaignGetLocator,
  getLatestCampaignVersion,
  saveCampaignToDb,
  type SaveResult,
} from "../../../db/campaign";
import {
  getAllUsersLatestCampaignsCached,
  loadCampaignFromDbCached,
} from "../../../db/campaignCached";
import { importCampaignDbClient } from "../../../db/campaignDbClient.import";
import { decompressObject } from "../../../db/compressObject";
import { getUsername } from "../../../db/getUsername";
import { type EditorCampaign } from "../../../editor/editorTypes";
import { type Campaign, type CampaignLocator } from "../../../model/modelTypes";
import { createSerialisableErrors } from "../../../utils/redux/createSerialisableErrors";
import { type RootState } from "../../store";

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
  }),
});

export const {
  useGetAllUsersLatestCampaignsQuery,
  useGetLatestCampaignVersionQuery,
  useGetUsernameQuery,
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
