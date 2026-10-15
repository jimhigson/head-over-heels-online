import { type TextureTailwindClass } from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { store, useEditorAppSelector } from "../../../store/store";
import { Switch } from "../../../ui/Switch";
import { twClass } from "../../../utils/twClass" with { type: "macro" };
import { doorItemTool } from "../../RoomEditingArea/interactivity/doorItemTool";
import {
  changeDoorAutoAddsRoom,
  selectCurrentCommittedRoomJson,
  selectDoorAutoAddsRoom,
} from "../../slice/levelEditorSlice";
import { buttonSpriteRevertColourClasses } from "../buttonSizeClassNames";
import { ItemToolButton } from "../ItemToolButton";
import { MenuButton } from "./MenuButton";
import { LabelledToolbarIcon } from "./ToolbarButtonContentPatterns";

export const DoorToolButton = () => {
  const autoAddRoom = useEditorAppSelector(selectDoorAutoAddsRoom);
  const scenery = useEditorAppSelector(
    (state) => selectCurrentCommittedRoomJson(state).planet,
  );

  const textureClassname =
    scenery === "moonbase" ?
      twClass<TextureTailwindClass>("texture-door_frame_moonbase_d0_whole")
    : twClass<TextureTailwindClass>("texture-door_frame_generic_d0_whole");

  return (
    <MenuButton
      main={
        <ItemToolButton
          itemTool={doorItemTool(autoAddRoom)}
          shortcutKeys={["D"]}
          ariaLabel={autoAddRoom ? "Door (adds adjacent room)" : "Door"}
        >
          <LabelledToolbarIcon
            iconClasses={`sprite top-[calc(-17px*var(--scale))] left-[calc(-2px*var(--scale))] ${textureClassname} ${buttonSpriteRevertColourClasses}`}
            text={autoAddRoom ? "+" : ""}
          />
        </ItemToolButton>
      }
    >
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
