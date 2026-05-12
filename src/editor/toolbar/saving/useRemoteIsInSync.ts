import nanoEqual from "nano-equal";

import { useEditorAppSelector } from "../../../store/store";

export const useRemoteIsInSync = () => {
  return useEditorAppSelector(
    ({ levelEditor: { remoteCampaign, campaignInProgress } }) =>
      nanoEqual(remoteCampaign, campaignInProgress),
  );
};
