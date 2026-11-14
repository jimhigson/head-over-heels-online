import { type RoomBehaviourProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { useIsCurrentCell } from "../../game/components/dialogs/menuDialog/dialogs/map/useIsCurrentCell";
import { Tip } from "../../ui/tip/Tip";
import { type EditorRoomId } from "../editorTypes";
import { RoomPreviewTipContents } from "./RoomPreviewTipContents";

export const EditorMapRoomTooltipBehaviour = ({
  roomId,
  subRoomId,
  tipId,
}: RoomBehaviourProps<EditorRoomId>) => {
  const { isCurrentRoom } = useIsCurrentCell(roomId, subRoomId);
  return (
    <Tip id={tipId} svgInvoker offset={isCurrentRoom ? 32 : 16}>
      <RoomPreviewTipContents roomId={roomId} withoutPreview={isCurrentRoom} />
    </Tip>
  );
};
