import { useAppDispatch } from "../../store/hooks";
import {
  addRoom,
  removeRoom,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { ToolbarButton } from "./ToolbarButton";

export const AddAndDeleteRoomButtons = () => {
  const dispatch = useAppDispatch();

  const hasOtherRooms = useAppSelectorWithLevelEditorSlice(
    (state) =>
      Object.keys(state.levelEditor.campaignInProgress.rooms).length > 1,
  );

  return (
    <>
      <ToolbarButton className="bg-moss" onClick={() => dispatch(addRoom())}>
        <span className={`sprite texture-hud_char_+ relative`} />
      </ToolbarButton>
      <ToolbarButton
        className="bg-midRed"
        onClick={() => dispatch(removeRoom())}
        disabled={!hasOtherRooms}
      >
        <span className={`sprite texture-hud_char_X relative`} />
      </ToolbarButton>
    </>
  );
};
