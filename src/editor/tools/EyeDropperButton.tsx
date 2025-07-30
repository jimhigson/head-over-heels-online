import { store } from "../../store/store";
import {
  setTool,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const EyeDropperButton = () => {
  const isCurrentTool = useAppSelectorWithLevelEditorSlice(
    ({ levelEditor }) => levelEditor.tool.type === "eyeDropper",
  );

  return (
    <ToolbarButton
      shortcutKeys={[
        // i copies photoshop, gimp, Krita, etc
        "I",
        // comma copies dpaint
        ",",
      ]}
      isCurrentTool={isCurrentTool}
      onClick={() => store.dispatch(setTool({ type: "eyeDropper" }))}
      tooltipContent={`## eye-dropper

click on an item in the room to copy it and put a copy down somewhere else
  
hotkey: **I** or **,**`}
    >
      <span className="relative sprite texture-editor_tool_eyedropper leading-none" />
    </ToolbarButton>
  );
};
