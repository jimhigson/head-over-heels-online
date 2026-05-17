import { useEffect } from "preact/hooks";

import { type DecorateItemMaybeRenderer } from "./item/itemRender/DecorateItemRenderer";
import { RoomRenderer } from "./room/RoomRenderer";

export const useRegisterDecorateItemRenderers = (
  decorators: DecorateItemMaybeRenderer[],
) => {
  useEffect(() => {
    if (RoomRenderer.itemDecorators.includes(decorators)) {
      return;
    }
    RoomRenderer.itemDecorators.push(decorators);
    return () => {
      RoomRenderer.itemDecorators = RoomRenderer.itemDecorators.filter(
        (d) => d !== decorators,
      );
    };
  }, [decorators]);
};
