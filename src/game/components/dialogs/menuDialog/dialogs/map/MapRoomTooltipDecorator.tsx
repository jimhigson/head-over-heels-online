import { Suspense } from "react";

import { LazyTooltip } from "../../../../../../ui/LazyTooltip";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";
import { type WrapClickableRoomDecoratorComponentProps } from "./RoomDecoratorProps";

const MapRoomTooltipDecorator = ({
  roomId,
  isCurrentRoom,
  children,
}: WrapClickableRoomDecoratorComponentProps<string>) => (
  <Suspense fallback={children}>
    <LazyTooltip
      triggerContent={children}
      tooltipContent={<BitmapText>{roomId}</BitmapText>}
      tooltipOffset={isCurrentRoom ? 32 : 0}
      tooltipPlacement="bottom"
    />
  </Suspense>
);

export default MapRoomTooltipDecorator;
