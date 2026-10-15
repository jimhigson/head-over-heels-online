import { actionCommandDefinitions } from "../../commands/actionCommandDefinitions";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";

export const CopyPasteButtons = () => (
  <div class="flex flex-row gap-oneScaledPix bg-metallicBlue">
    <CommandToolbarButton command={actionCommandDefinitions.copy} />
    <CommandToolbarButton command={actionCommandDefinitions.paste} />
  </div>
);
