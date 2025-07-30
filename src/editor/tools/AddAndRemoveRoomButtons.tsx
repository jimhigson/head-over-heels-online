import { useAppDispatch } from "../../store/hooks";
import {
  addRoom,
  removeRoom,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

const addTooltipMarkdown = `
## Add room

Add a **new room** to this campaign

Nothing will link to the room so add *doors* and *teleporters* to get into it
`;

const deleteTooltipMarkdown = `
## Delete room

Delete this room
`;

export const AddAndDeleteRoomButtons = () => {
  const dispatch = useAppDispatch();

  const hasOtherRooms = useAppSelectorWithLevelEditorSlice(
    (state) =>
      Object.keys(state.levelEditor.campaignInProgress.rooms).length > 1,
  );

  return (
    <>
      <ToolbarButton
        className="bg-moss"
        onClick={() => dispatch(addRoom())}
        tooltipContent={addTooltipMarkdown}
      >
        <span className={`sprite texture-hud_char_+ relative`} />
      </ToolbarButton>
      <ToolbarButton
        className="bg-midRed"
        onClick={() => dispatch(removeRoom())}
        disabled={!hasOtherRooms}
        tooltipContent={deleteTooltipMarkdown}
      >
        <span className={`sprite texture-hud_char_X relative`} />
      </ToolbarButton>
    </>
  );
};
