import { type RoomBehaviourProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { Tip } from "../../ui/tip/Tip";
import { type EditorRoomId } from "../editorTypes";
import { RoomPreview } from "./RoomPreview";

export const EditorMapRoomTooltipBehaviour = ({
  roomId,
  isCurrentRoom,
  tipId,
}: RoomBehaviourProps<EditorRoomId>) => (
  <Tip id={tipId} svgInvoker offset={isCurrentRoom ? 32 : 16}>
    <div class="flex flex-col gap-y-1">
      <span class="text-single-line">{roomId}</span>
      {!isCurrentRoom && <RoomPreview roomId={roomId} />}
    </div>
  </Tip>
);
