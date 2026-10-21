import { store } from "../../../store/store";
import { useVerificationCounts } from "../../verify/useVerifyCampaign";
import { showVerifyIssuesThunk } from "../showVerifyIssuesThunk";
import { ToolbarButton } from "./ToolbarButton";

export const VerifyCampaignButton = () => {
  const { errors: errorCount, warnings: warningCount } =
    useVerificationCounts();

  if (errorCount === 0 && warningCount === 0) {
    // campaign is valid - nothing to warn about
    return null;
  }

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
