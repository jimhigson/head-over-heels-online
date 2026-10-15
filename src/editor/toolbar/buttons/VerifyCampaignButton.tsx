import { store } from "../../../store/store";
import { useVerifyCampaign } from "../../verify/useVerifyCampaign";
import { showVerifyIssuesThunk } from "../showVerifyIssuesThunk";
import { ToolbarButton } from "./ToolbarButton";

export const VerifyCampaignButton = () => {
  const verification = useVerifyCampaign();

  if (verification.length === 0) {
    // campaign is valid - nothing to warn about
    return null;
  }

  const errorCount = verification.filter(
    (issue) => issue.severity === "error",
  ).length;
  const warningCount = verification.filter(
    (issue) => issue.severity === "warning",
  ).length;

  return (
    <ToolbarButton
      ariaLabel="Verify and fix campaign"
      class="w-full min-h-2 mx-1 flex-col bg-transparent"
      onClick={() => store.dispatch(showVerifyIssuesThunk())}
    >
      {errorCount > 0 && (
        <span class="text-single-line text-midRed">{errorCount} errors</span>
      )}
      {warningCount > 0 && (
        <span class="text-single-line text-highlightBeige">
          {warningCount} warnings
        </span>
      )}
    </ToolbarButton>
  );
};
