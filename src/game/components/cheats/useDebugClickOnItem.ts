import { isFreeItem, isItemType } from "../../physics/itemPredicates";
import { useGameApi } from "../GameApiContext";
import { useEvent } from "../../../utils/react/useEvent";
import { useCallback } from "react";

export const useDebugClickOnItem = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();

  useEvent(
    gameApi.events,
    "itemClicked",
    useCallback(
      ({ item, container }) => {
        if (isItemType("teleporter", "doorFrame")(item)) {
          const { toRoom } = item.config;
          gameApi.changeRoom(toRoom);
        }
        if (item.type === "lift") {
          const toRoom = gameApi.currentRoom?.roomAbove;
          if (toRoom) gameApi.changeRoom(toRoom);
        }
        if (item.type === "floorEdge") {
          const toRoom = gameApi.currentRoom?.roomBelow;
          if (toRoom) gameApi.changeRoom(toRoom);
        }
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
          [...item.state.stoodOnBy],
          "\nstandingOn:",
          isFreeItem(item) ?
            item.state.standingOnItemId
          : "n/a (not free to move)",
          "\ncontainer:",
          container,
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).container = container;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).item = item;
      },
      [gameApi],
    ),
  );
};
