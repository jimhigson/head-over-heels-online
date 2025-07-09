import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
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
      isCurrentTool={isCurrentTool}
      onClick={() => store.dispatch(setTool({ type: "eyeDropper" }))}
    >
      <BitmapText className="relative leading-none">ED</BitmapText>
    </ToolbarButton>
  );
};
