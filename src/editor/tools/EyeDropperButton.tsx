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
    >
      <span className="relative sprite texture-editor_tool_eyedropper leading-none" />
    </ToolbarButton>
  );
};
