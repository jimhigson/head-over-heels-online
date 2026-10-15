import { actionCommandDefinitions } from "../../commands/actionCommandDefinitions";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";

/** Deletes the selected items. Always available. */
export const DeleteMenuItem = () => (
  <CommandContextMenuItem command={actionCommandDefinitions.delete} />
);
