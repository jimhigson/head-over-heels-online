import { useEditorAppSelector } from "../../store/store";
import { selectFrontOpenRoomId } from "../slice/levelEditorSlice";
import { type OpenRoomId } from "../slice/OpenRoom";
import { OpenRoomPane } from "./OpenRoomPane";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { useSpritesheets } from "./useSpritesheets";

export type RoomEditingAreaProps = {
  /**
   * an open room to show by itself, only for picking items from (eg in a
   * dialog) - otherwise the front tab's room is shown, for editing
   */
  openRoomId?: OpenRoomId;
};

type RoomEditingAreaContentProps = RoomEditingAreaProps;

const RoomEditingAreaContent = ({
  openRoomId,
}: RoomEditingAreaContentProps) => {
  // one set for the area's life, whichever tab is in front:
  const spritesheets = useSpritesheets();
  const frontOpenRoomId = useEditorAppSelector(selectFrontOpenRoomId);
  const shownOpenRoomId = openRoomId ?? frontOpenRoomId;
  return (
    <OpenRoomPane
      key={shownOpenRoomId}
      openRoomId={shownOpenRoomId}
      spritesheets={spritesheets}
    />
  );
};

/**
 * one Pixi app for its whole life, drawing an open room in a pane: the front
 * tab's (switching tabs swaps the pane, not the app), or one given
 */
const RoomEditingArea = ({ openRoomId }: RoomEditingAreaProps) => (
  <PixiApplicationProvider>
    <RoomEditingAreaContent openRoomId={openRoomId} />
  </PixiApplicationProvider>
);

// default export for lazy loading
export default RoomEditingArea;
