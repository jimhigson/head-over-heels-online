import { type RoomBehaviourProps } from "../../../../../../map/RoomDecoratorProps";
import { useIsCurrentCell } from "../../../../../../map/useIsCurrentCell";
import { Tip } from "../../../../../../ui/tip/Tip";

export const MapRoomTooltipBehaviour = ({
  roomId,
  subRoomId,
  tipId,
}: RoomBehaviourProps<string>) => {
  const { isCurrentRoom } = useIsCurrentCell(roomId, subRoomId);
  return (
    <Tip id={tipId} svgInvoker offset={isCurrentRoom ? 32 : 0}>
      <span class="text-single-line">{roomId}</span>
    </Tip>
  );
};
