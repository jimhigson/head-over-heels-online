import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { store } from "../../store/store";
import { clearRoom } from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const ClearRoomButton = () => {
  return (
    <ToolbarButton
      className="bg-midRed"
      onClick={() => store.dispatch(clearRoom())}
      tooltipContent={`## Clear room

Clears the room out, leaving just walls, floors, and doors`}
    >
      <BitmapText className="relative leading-none">CLR</BitmapText>
    </ToolbarButton>
  );
};
