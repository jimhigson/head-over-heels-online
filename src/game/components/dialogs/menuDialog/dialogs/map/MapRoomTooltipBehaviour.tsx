import { Tip } from "../../../../../../ui/tip/Tip";
import { type RoomBehaviourProps } from "./RoomDecoratorProps";
import { useIsCurrentCell } from "./useIsCurrentCell";

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
