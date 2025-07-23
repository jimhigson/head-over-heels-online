import { store } from "../../store/store";
import {
  selectTool,
  setTool,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const PointerToolButton = () => {
  const currentTool = useAppSelectorWithLevelEditorSlice(selectTool);

  const isCurrentTool = currentTool?.type === "pointer";

  return (
    <ToolbarButton
      onClick={() => store.dispatch(setTool({ type: "pointer" }))}
      isCurrentTool={isCurrentTool}
      shortcutKeys={["Escape"]} // Escape key to switch back to default pointer tool
    >
      <span className={`sprite texture-editor_tool_pointer relative`} />
    </ToolbarButton>
  );
};
