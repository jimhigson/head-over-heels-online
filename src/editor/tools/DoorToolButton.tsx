import type { JsonItemConfig } from "../../model/json/JsonItem";
import type { EditorRoomId, EditorRoomItemId } from "../editorTypes";
import {
  selectCurrentEditingRoomJson,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { twClass } from "../twClass";
import { buttonSpriteRevertColourClasses } from "./buttonSizeClassNames";
import { ItemToolButton } from "./ItemToolButton";

export const DoorToolButton = () => {
  const scenery = useAppSelectorWithLevelEditorSlice(
    (state) => selectCurrentEditingRoomJson(state).planet,
  );

  const textureClassname = twClass(
    scenery === "moonbase" ?
      "texture-door_frame_moonbase_x_whole"
    : "texture-door_frame_generic_x_whole",
  );

  return (
    <ItemToolButton
      itemTool={{
        type: "door",
        config: {
          direction: "away", // arbitrary, to be corrected on placement
          toRoom: "(placeholder)" as EditorRoomId, // arbitrary, to be corrected on placement
        } satisfies JsonItemConfig<"door", EditorRoomId, EditorRoomItemId>,
      }}
      shortcutKeys={["D"]}
    >
      <span
        className={`sprite ${textureClassname} ${buttonSpriteRevertColourClasses}`}
      />
    </ItemToolButton>
  );
};
