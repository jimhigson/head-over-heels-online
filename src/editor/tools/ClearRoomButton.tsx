import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { store } from "../../store/store";
import { clearRoom } from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const ClearRoomButton = () => {
  return (
    <ToolbarButton onClick={() => store.dispatch(clearRoom())}>
      <BitmapText className="relative leading-none">CLR</BitmapText>
    </ToolbarButton>
  );
};
