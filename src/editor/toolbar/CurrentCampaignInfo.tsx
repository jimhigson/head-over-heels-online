import { useState } from "preact/hooks";

import { useAppDispatch } from "../../store/hooks";
import { useEditorAppSelector } from "../../store/store";
import { loadCampaignIntoEditor } from "../slice/saveAndLoadThunks";
import { CampaignOwnerName } from "./CampaignOwnerName";
import { StaleVersionDialog } from "./saving/StaleVersionDialog";
import { useCampaignIsStale } from "./saving/useCampaignIsStale";
import { useSupabaseUser } from "./useSupabaseUser";

export const CurrentCampaignInfo = () => {
  const { campaignName, userId: ownerUserId } = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.locator,
  );
  const {
    isStale: versionIsStale,
    ours: ourVersion,
    latest: latestVersion,
  } = useCampaignIsStale();

  // is the loaded campaign owned by the logged-in user? the username for *other*
  // owners is fetched lazily, only in that branch, by CampaignOwnerName
  const currentUser = useSupabaseUser();
  const isOwnedByCurrentUser = currentUser?.id === ownerUserId;

  const dispatch = useAppDispatch();
  // remember the version we dismissed for, so a further db change re-prompts
  const [dismissedForVersion, setDismissedForVersion] = useState<
    number | undefined
  >(undefined);

  return (
    <>
      <span class="">
        {isOwnedByCurrentUser ? "Your campaign:" : "Campaign:"}
      </span>{" "}
      {campaignName ?
        <>
          <span class="text-highlightBeige">{`‘${campaignName}’`}</span>{" "}
          <span class="text-lightGrey">v{ourVersion}</span>{" "}
          {isOwnedByCurrentUser ? null : (
            <CampaignOwnerName userId={ownerUserId} />
          )}{" "}
          {versionIsStale ?
            <span class="text-midRed animate-flash">
              v{latestVersion}&nbsp;latest
            </span>
          : null}
        </>
      : <span class="text-midRed">{`(untitled)`}</span>}
      {versionIsStale &&
        latestVersion !== undefined &&
        dismissedForVersion !== latestVersion &&
        campaignName && (
          <StaleVersionDialog
            ours={ourVersion}
            latest={latestVersion}
            onLoadLatest={() =>
              dispatch(
                loadCampaignIntoEditor({
                  userId: ownerUserId,
                  campaignName,
                  version: -1,
                }),
              )
            }
            onDismiss={() => setDismissedForVersion(latestVersion)}
          />
        )}
    </>
  );
};
