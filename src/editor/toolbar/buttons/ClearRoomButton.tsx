import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import { store } from "../../../store/store";
import { confirmClearRoomThunk } from "../confirmThunk";
import { ToolbarButton } from "./ToolbarButton";

export const ClearRoomButton = () => {
  return (
    <ToolbarButton
      ariaLabel="Clear room"
      className="bg-midRed"
      onClick={() => store.dispatch(confirmClearRoomThunk)}
      tooltipContent={`## Clear room

Clears the room out, leaving just walls, floors, and doors`}
    >
      <BitmapText className="relative leading-none">CLR</BitmapText>
    </ToolbarButton>
  );
};
