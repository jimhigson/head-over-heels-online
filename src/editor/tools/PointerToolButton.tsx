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
    >
      <span className={`sprite texture-hud.char.↖ relative`} />
    </ToolbarButton>
  );
};
