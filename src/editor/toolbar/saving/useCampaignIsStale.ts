import { skipToken } from "@reduxjs/toolkit/query/react";

import { originalUserId } from "../../../gameInfo";
import { useGetLatestCampaignVersionQuery } from "../../../store/slices/campaigns/editorCampaignsApiSlice";
import { useEditorAppSelector } from "../../../store/store";
import { campaignIsNamed } from "../../editorTypes";
import {
  selectCurrentCampaignInProgress,
  selectCurrentCampaignVersion,
} from "../../slice/levelEditorSlice";

export type CampaignStaleness = {
  /** true when the db holds a newer version than the one we have loaded */
  isStale: boolean;
  /** the version we have loaded */
  ours: number;
  /** the db's latest version, or undefined while unknown (loading/offline/skipped) */
  latest: number | undefined;
};

/**
 * Compares the version of the loaded campaign (authoritative in the store) with
 * the db's latest.
 */
export const useCampaignIsStale = (): CampaignStaleness => {
  const currentCampaignVersion = useEditorAppSelector(
    selectCurrentCampaignVersion,
  );
  const currentCampaignInProgress = useEditorAppSelector(
    selectCurrentCampaignInProgress,
  );

  const queryArg =
    (
      campaignIsNamed(currentCampaignInProgress) &&
      currentCampaignInProgress.locator.userId !== originalUserId &&
      !currentCampaignInProgress.locator.campaignName.startsWith("data:")
    ) ?
      {
        userId: currentCampaignInProgress.locator.userId,
        campaignName: currentCampaignInProgress.locator.campaignName,
      }
    : skipToken;

  const { data: latest } = useGetLatestCampaignVersionQuery(queryArg);

  return {
    isStale: latest !== undefined && latest > currentCampaignVersion,
    ours: currentCampaignVersion,
    latest,
  };
};
