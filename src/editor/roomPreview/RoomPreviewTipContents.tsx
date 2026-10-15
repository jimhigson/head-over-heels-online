import { useIsUncolourised } from "../../store/slices/gameMenus/gameMenusSelectors";
import { useEditorAppSelector } from "../../store/store";
import { type EditorRoomId } from "../editorTypes";
import { cssForRoomColour } from "../toolbar/buttons/RoomColourSelect";
import { RoomPreview } from "./RoomPreview";

export type RoomPreviewTipContentsProps = {
  roomId: EditorRoomId;
  /** only the room's name, eg where the room is already in view */
  withoutPreview?: boolean;
};

/**
 * a room's name and preview, for a `Tip` - in the room's own colour, as its
 * tab and the room select show it
 */
export const RoomPreviewTipContents = ({
  roomId,
  withoutPreview = false,
}: RoomPreviewTipContentsProps) => {
  const uncolourised = useIsUncolourised();
  const roomHue = useEditorAppSelector(
    (state) => state.levelEditor.campaignInProgress.rooms[roomId].color.hue,
  );

  return (
    // the negative margin covers the tip's own padding and background:
    <div
      class="-m-1 p-1 flex flex-col gap-y-1 command-colours"
      style={cssForRoomColour(roomHue, uncolourised)}
    >
      <span class="text-single-line">{roomId}</span>
      {!withoutPreview && <RoomPreview roomId={roomId} />}
    </div>
  );
};
