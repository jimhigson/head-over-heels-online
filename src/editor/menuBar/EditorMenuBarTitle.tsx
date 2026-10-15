import { useEditorAppSelector } from "../../store/store";
import { useCampaignHasUnsavedChanges } from "../toolbar/saving/useCampaignHasUnsavedChanges";
import { useCampaignIsStale } from "../toolbar/saving/useCampaignIsStale";

/**
 * the campaign being edited and its version, with a * while there are changes
 * to save
 */
export const EditorMenuBarTitle = () => {
  const { campaignName } = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.locator,
  );
  const { ours: ourVersion } = useCampaignIsStale();
  const hasUnsavedChanges = useCampaignHasUnsavedChanges();

  return (
    <span class="text-single-line whitespace-nowrap text-lightGrey">
      {campaignName === undefined ?
        "untitled"
      : <>
          {`‘${campaignName}’ `}
          <span class="text-midGrey">{`v${ourVersion}`}</span>
        </>
      }
      {hasUnsavedChanges && "*"}
    </span>
  );
};
