import { store, useEditorAppSelector } from "../../../store/store";
import { Switch } from "../../../ui/Switch";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import { itemToolCommandDefinitions } from "../../commands/itemToolCommandDefinitions";
import {
  changeDoorAutoAddsRoom,
  selectDoorAutoAddsRoom,
} from "../../slice/levelEditorSlice";
import { MenuButton } from "./MenuButton";

export const DoorToolButton = () => {
  const autoAddRoom = useEditorAppSelector(selectDoorAutoAddsRoom);
  const doorCommand = useEditorAppSelector((state) =>
    itemToolCommandDefinitions.door(state),
  );

  return (
    <MenuButton main={<CommandToolbarButton command={doorCommand} />}>
      {[
        <Switch
          key="autoAddDoor"
          class="w-full"
          value={autoAddRoom}
          label="auto + room"
          ariaLabel="Auto-add room with door"
          onChange={(value) => {
            store.dispatch(changeDoorAutoAddsRoom(value));
          }}
        />,
      ]}
    </MenuButton>
  );
};
