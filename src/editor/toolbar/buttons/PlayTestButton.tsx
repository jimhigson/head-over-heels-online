import { actionCommandDefinitions } from "../../commands/actionCommandDefinitions";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import { PlaytestMenuItems } from "../../menuBar/PlaytestMenuItems";
import { MenuButton } from "./MenuButton";
import { MenuButtonMenu } from "./MenuButtonMenu";

export const PlayTestButton = () => (
  <MenuButton
    main={<CommandToolbarButton command={actionCommandDefinitions.playtest} />}
  >
    {[
      // the playtest menu, the same as the menu bar's:
      <MenuButtonMenu key="playtest">
        <PlaytestMenuItems />
      </MenuButtonMenu>,
    ]}
  </MenuButton>
);
