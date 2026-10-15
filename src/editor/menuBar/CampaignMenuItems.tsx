import { actionCommandDefinitions } from "../commands/actionCommandDefinitions";
import { CommandMenuItem } from "../commands/CommandMenuItem";

/** the campaign menu: the sidebar's campaign actions */
export const CampaignMenuItems = () => (
  <>
    <CommandMenuItem command={actionCommandDefinitions.newCampaign} />
    <CommandMenuItem command={actionCommandDefinitions.openCampaign} />
    <CommandMenuItem command={actionCommandDefinitions.revertCampaign} />
    <CommandMenuItem command={actionCommandDefinitions.saveCampaign} />
    <CommandMenuItem command={actionCommandDefinitions.saveCampaignAs} />
    <CommandMenuItem command={actionCommandDefinitions.copyShareLink} />
    <CommandMenuItem command={actionCommandDefinitions.verifyCampaign} />
  </>
);
