import { actionCommandDefinitions } from "../../commands/actionCommandDefinitions";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import { useShortTimeDisplay } from "../useShortTimeDisplay";
import { ToolbarButton } from "./ToolbarButton";

export const ShareCampaignButton = () => {
  const { doneNow, justDone } = useShortTimeDisplay();

  return justDone > 0 ?
      <ToolbarButton ariaLabel="Campaign link copied" class="bg-moss">
        <span class="relative text-single-line">OK!</span>
      </ToolbarButton>
    : <CommandToolbarButton
        command={actionCommandDefinitions.copyShareLink}
        onClick={doneNow}
      />;
};
