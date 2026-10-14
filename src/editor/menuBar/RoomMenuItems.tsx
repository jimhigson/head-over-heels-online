import { actionCommandDefinitions } from "../commands/actionCommandDefinitions";
import { CommandMenuItem } from "../commands/CommandMenuItem";

/** the room menu: the sidebar's room actions */
export const RoomMenuItems = () => (
  <>
    <CommandMenuItem command={actionCommandDefinitions.previousRoom} />
    <CommandMenuItem command={actionCommandDefinitions.nextRoom} />
    <CommandMenuItem command={actionCommandDefinitions.addRoom} />
    <CommandMenuItem command={actionCommandDefinitions.deleteRoom} />
    <CommandMenuItem command={actionCommandDefinitions.clearRoom} />
  </>
);
