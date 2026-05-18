import { useEffect } from "preact/hooks";

import { type DecorateRoomRenderer } from "./room/DecorateRoomRenderer";
import { RoomRenderer } from "./room/RoomRenderer";

export const useRegisterDecorateRoomRenderers = (
  decorators: DecorateRoomRenderer[],
) => {
  useEffect(() => {
    if (RoomRenderer.roomDecorators.includes(decorators)) {
      return;
    }
    RoomRenderer.roomDecorators.push(decorators);
    return () => {
      RoomRenderer.roomDecorators = RoomRenderer.roomDecorators.filter(
        (d) => d !== decorators,
      );
    };
  }, [decorators]);
};
