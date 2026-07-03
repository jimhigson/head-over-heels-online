import { useAppDispatch } from "../../../store/hooks";
import { newCampaign } from "../../slice/levelEditorSlice";
import { confirmThenDispatch } from "../confirmThunk";
import { useRemoteIsInSync } from "../saving/useRemoteIsInSync";
import { ToolbarButton } from "./ToolbarButton";

export const NewCampaignButton = () => {
  const dispatch = useAppDispatch();
  const savedIsInSync = useRemoteIsInSync();

  return (
    <ToolbarButton
      ariaLabel="New campaign"
      onClick={() => {
        if (savedIsInSync) {
          dispatch(newCampaign());
        } else {
          dispatch(
            confirmThenDispatch(
              {
                heading: "New campaign",
                body: "You have unsaved changes. Starting a new campaign will discard them.",
                cancelText: "Cancel",
                okText: "Discard and start new",
              },
              newCampaign(),
            ),
          );
        }
      }}
      tooltipContent={
        "## New Campaign\nCreate a new campaign, starting from one empty room"
      }
    >
      <span className="relative text-single-line">NEW</span>
    </ToolbarButton>
  );
};
