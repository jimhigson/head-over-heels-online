import { store } from "../../../store/store";
import { confirmClearRoomThunk } from "../confirmThunk";
import { ToolbarButton } from "./ToolbarButton";

export const ClearRoomButton = () => {
  return (
    <ToolbarButton
      ariaLabel="Clear room"
      class="bg-midRed"
      onClick={() => store.dispatch(confirmClearRoomThunk)}
      tooltipContent={`## Clear room

Clears the room out, leaving just walls, floors, and doors`}
    >
      <span class="relative text-single-line">CLR</span>
    </ToolbarButton>
  );
};
