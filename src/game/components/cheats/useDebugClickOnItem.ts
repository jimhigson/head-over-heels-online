import { useEffect } from "react";

import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";

import { startAppListening } from "../../../store/listenerMiddleware";
import { debugItemClicked } from "../../../store/slices/gameMenusSlice";
import { pixiContainerToString } from "../../../utils/pixi/pixiContainerToString";
import { isFreeItem, isItemType } from "../../physics/itemPredicates";
import { useGameApi } from "../GameApiContext";

export const useDebugClickOnItem = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();

  useEffect(() => {
    const unsub = startAppListening({
      actionCreator: debugItemClicked,
      effect(action) {
        const item = action.payload.item as UnionOfAllItemInPlayTypes<RoomId>;

        if (isItemType("teleporter", "doorFrame")(item)) {
          const { toRoom } = item.config;
          gameApi.changeRoom(toRoom);
        }
        if (item.type === "lift") {
          const toRoom = gameApi.currentRoom?.roomAbove;
          if (toRoom) gameApi.changeRoom(toRoom);
        }
        console.groupCollapsed(item.id);
        console.log(
          item.id,
          "item (live):",
          item,
          "\nstate (shallow copy):",
          {
            ...item.state,
          },
          "\nposition",
          `(${item.state.position.x}, ${item.state.position.y}, ${item.state.position.z})`,
          "\nstoodOnBy:",
          Object.keys(item.state.stoodOnBy),
          "\nstandingOn:",
          isFreeItem(item) ?
            item.state.standingOnItemId
          : "n/a (not free to move)",
          pixiContainerToString(action.payload.pixiContainer),
        );
        console.groupEnd();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).item = item;
      },
    });
    return unsub;
  });
};
