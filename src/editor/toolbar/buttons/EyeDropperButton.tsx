import { type TextureTailwindClass } from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { store, useEditorAppSelector } from "../../../store/store";
import { setTool } from "../../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const EyeDropperButton = () => {
  const isCurrentTool = useEditorAppSelector(
    ({ levelEditor }) => levelEditor.tool.type === "eyeDropper",
  );

  return (
    <ToolbarButton
      ariaLabel="Eye-dropper"
      shortcutKeys={[
        // i copies photoshop, gimp, Krita, etc
        "I",
        // comma copies dpaint
        ",",
      ]}
      isCurrentTool={isCurrentTool}
      onClick={() => store.dispatch(setTool({ type: "eyeDropper" }))}
      tooltipContent={`## Eye-dropper

click on an item in the room to copy it and put a copy down somewhere else`}
    >
      <span
        class={`relative sprite ${"texture-editor_tool_eyedropper" satisfies TextureTailwindClass} leading-none`}
      />
    </ToolbarButton>
  );
};
