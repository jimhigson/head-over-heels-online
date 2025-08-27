import nanoEqual from "nano-equal";
import { useAppSelectorWithLevelEditorSlice } from "../../slice/levelEditorSlice";

export const useRemoteIsInSync = () => {
  return useAppSelectorWithLevelEditorSlice(
    ({ levelEditor: { remoteCampaign, campaignInProgress } }) =>
      nanoEqual(remoteCampaign, campaignInProgress),
  );
};
