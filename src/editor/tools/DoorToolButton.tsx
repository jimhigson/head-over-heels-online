import { useState } from "react";

import type { JsonItemConfig } from "../../model/json/JsonItem";
import type { EditorRoomId, EditorRoomItemId } from "../editorTypes";
import type { ItemTool } from "../Tool";

import { store } from "../../store/store";
import { Switch } from "../../ui/Switch";
import {
  selectCurrentEditingRoomJson,
  setTool,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { twClass } from "../twClass";
import { buttonSpriteRevertColourClasses } from "./buttonSizeClassNames";
import { ItemToolButton } from "./ItemToolButton";
import { MenuButton } from "./MenuButton";
import { LabelledToolbarIcon } from "./ToolbarButtonContentPatterns";
import { useIsCurrentItemTool } from "./useIsCurrentItemTool";

function doorItemTool(autoAddRoom: boolean): ItemTool {
  return {
    type: "door",
    config: {
      direction: "away", // arbitrary, to be corrected on placement
      toRoom: (autoAddRoom ? "+" : "nowhere") as EditorRoomId, // arbitrary, to be corrected on placement
    } satisfies JsonItemConfig<"door", EditorRoomId, EditorRoomItemId>,
  };
}

export const DoorToolButton = () => {
  const [autoAddRoom, setAutoAddRoom] = useState(true);
  const scenery = useAppSelectorWithLevelEditorSlice(
    (state) => selectCurrentEditingRoomJson(state).planet,
  );

  const textureClassname = twClass(
    scenery === "moonbase" ?
      "texture-door_frame_moonbase_x_whole"
    : "texture-door_frame_generic_x_whole",
  );

  const itemTool: ItemTool = doorItemTool(autoAddRoom);

  const isCurrentTool = useIsCurrentItemTool(itemTool);

  return (
    <MenuButton
      main={
        <ItemToolButton itemTool={itemTool} shortcutKeys={["D"]}>
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
          className="w-full"
          value={autoAddRoom}
          label="auto + room"
          onChange={(value) => {
            setAutoAddRoom(value);
            if (isCurrentTool) {
              // if the door tool was selected, move to the new version of the tool:
              store.dispatch(
                setTool({ type: "item", item: doorItemTool(value) }),
              );
            }
          }}
        />,
      ]}
    </MenuButton>
  );
};
