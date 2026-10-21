import { skipToken } from "@reduxjs/toolkit/query/react";

import { originalUserId } from "../../../gameInfo";
import { useGetLatestCampaignVersionQuery } from "../../../store/slices/campaigns/editorCampaignsApiSlice";
import { useEditorAppSelector } from "../../../store/store";
import { selectCurrentCampaignVersion } from "../../slice/levelEditorSlice";

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
  // only the locator, so edits to the campaign's rooms don't re-render:
  const { userId, campaignName } = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.locator,
  );

  const queryArg =
    (
      campaignName !== undefined &&
      userId !== originalUserId &&
      !campaignName.startsWith("data:")
    ) ?
      { userId, campaignName }
    : skipToken;

  // currentData, not data: data keeps the previous campaign's result after switching
  const { currentData: latest } = useGetLatestCampaignVersionQuery(queryArg);

  return {
    isStale: latest !== undefined && latest > currentCampaignVersion,
    ours: currentCampaignVersion,
    latest,
  };
};
