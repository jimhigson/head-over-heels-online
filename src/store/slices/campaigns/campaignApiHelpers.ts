import { type QueryReturnValue } from "@reduxjs/toolkit/query";

import { type CampaignGetLocator } from "../../../db/campaign";
import { type EditorCampaign } from "../../../editor/editorTypes";
import { type Campaign } from "../../../model/modelTypes";
import { emptyObject } from "../../../utils/empty";
import { type SerialisableError } from "../../../utils/redux/createSerialisableErrors";
import { store } from "../../store";
import { campaignsApiSlice } from "./campaignsApiSlice";

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

  return result as QueryReturnValue<Campaign<RoomId>, SerialisableError[]>;
};

/**
 * Save a campaign using the RTKQuery api slice mutation
 */
export const saveCampaignViaApi = async (
  campaign: EditorCampaign,
  { baseVersion, force }: { baseVersion: null | number; force: boolean },
) => {
  const result = await store.dispatch(
    campaignsApiSlice.endpoints.saveCampaign.initiate({
      campaign,
      baseVersion,
      force,
    }),
  );

  return result;
};
