import { actionCommandDefinitions } from "./actionCommandDefinitions";
import { itemToolCommandDefinitions } from "./itemToolCommandDefinitions";
import { nudgeCommandDefinitions } from "./nudgeCommandDefinitions";

/** every command the editor has a shortcut, toolbar button or menu item for */
export const commandDefinitions = {
  ...itemToolCommandDefinitions,
  ...actionCommandDefinitions,
  ...nudgeCommandDefinitions,
};
