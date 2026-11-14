import { type EditorRoomId } from "../editorTypes";
import { type OpenRoomId } from "../slice/OpenRoom";
import { OpenRoomPane } from "./OpenRoomPane";
import { PixiApplicationProvider } from "./PixiApplicationProvider";
import { useSpritesheets } from "./useSpritesheets";

export type DialogRoomAreaProps = {
  openRoomId: OpenRoomId;
  /**
   * a link in the room (eg a door's annotation) was followed to another room
   */
  onFollowLink: (roomId: EditorRoomId) => void;
};

type DialogRoomPaneProps = DialogRoomAreaProps;

const DialogRoomPane = ({ openRoomId, onFollowLink }: DialogRoomPaneProps) => {
  const spritesheets = useSpritesheets();
  return (
    <OpenRoomPane
      key={openRoomId}
      openRoomId={openRoomId}
      tabGroupId={undefined}
      spritesheets={spritesheets}
      onFollowLink={onFollowLink}
    />
  );
};

/**
 * one open room shown by itself, outside the panes, only for picking items
 * from - for a dialog
 */
const DialogRoomArea = ({ openRoomId, onFollowLink }: DialogRoomAreaProps) => (
  <PixiApplicationProvider>
    <DialogRoomPane openRoomId={openRoomId} onFollowLink={onFollowLink} />
  </PixiApplicationProvider>
);

// default export for lazy loading
export default DialogRoomArea;
