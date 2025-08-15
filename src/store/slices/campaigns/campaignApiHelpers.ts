import type { QueryReturnValue } from "@reduxjs/toolkit/query";
import type { Campaign } from "../../../model/modelTypes";
import { store } from "../../store";
import { campaignsApiSlice } from "./campaignsApiSlice";
import type { CampaignGetLocator } from "../../../db/campaign";
import { emptyObject } from "../../../utils/empty";

/**
 * a simple loader function using the RTKQuery api slice,
 * and dispatching to the store
 */
export const loadCampaignFromApi = async <RoomId extends string>(
  campaignLocator: CampaignGetLocator,
  { forceRefetch }: { forceRefetch?: boolean } = emptyObject,
) => {
  const result = await store.dispatch(
    campaignsApiSlice.endpoints.getCampaign.initiate(campaignLocator, {
      forceRefetch,
    }),
  );

  return result as QueryReturnValue<Campaign<RoomId>, Error>;
};

/**
 * Save a campaign using the RTKQuery api slice mutation
 */
export const saveCampaignViaApi = async (campaign: Campaign<string>) => {
  const result = await store.dispatch(
    campaignsApiSlice.endpoints.saveCampaign.initiate(campaign),
  );

  return result;
};
