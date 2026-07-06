import { Tip } from "../../../../../../ui/tip/Tip";
import { type RoomBehaviourProps } from "./RoomDecoratorProps";

export const MapRoomTooltipBehaviour = ({
  roomId,
  isCurrentRoom,
  tipId,
}: RoomBehaviourProps<string>) => (
  <Tip id={tipId} svgInvoker offset={isCurrentRoom ? 32 : 0}>
    <span class="text-single-line">{roomId}</span>
  </Tip>
);
