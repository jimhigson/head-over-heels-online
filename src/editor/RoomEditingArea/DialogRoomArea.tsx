import { type OpenRoomId } from "../slice/OpenRoom";
import { OpenRoomPane } from "./OpenRoomPane";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { useSpritesheets } from "./useSpritesheets";

export type DialogRoomAreaProps = {
  openRoomId: OpenRoomId;
};

type DialogRoomPaneProps = DialogRoomAreaProps;

const DialogRoomPane = ({ openRoomId }: DialogRoomPaneProps) => {
  const spritesheets = useSpritesheets();
  return (
    <OpenRoomPane
      key={openRoomId}
      openRoomId={openRoomId}
      tabGroupId={undefined}
      spritesheets={spritesheets}
    />
  );
};

/**
 * one open room shown by itself, outside the panes, only for picking items
 * from - for a dialog
 */
const DialogRoomArea = ({ openRoomId }: DialogRoomAreaProps) => (
  <PixiApplicationProvider>
    <DialogRoomPane openRoomId={openRoomId} />
  </PixiApplicationProvider>
);

// default export for lazy loading
export default DialogRoomArea;
