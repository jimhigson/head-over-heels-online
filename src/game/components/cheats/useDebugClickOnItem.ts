import { useGameApi } from "@/game/components/GameApiContext";
import type { GameEvents } from "@/game/GameApi";
import { isItemType } from "@/game/physics/itemPredicates";
import { useEffect } from "react";

export const useDebugClickOnItem = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();

  useEffect(() => {
    const onItemClick = ({
      item,
      container,
    }: GameEvents<RoomId>["itemClicked"]) => {
      if (isItemType("teleporter", "doorFrame")(item)) {
        const { toRoom } = item.config;
        gameApi.changeRoom(toRoom);
      }
      if (item.type === "lift") {
        const toRoom = gameApi.currentRoom.roomAbove;
        if (toRoom) gameApi.changeRoom(toRoom);
      }
      if (item.type === "floor") {
        const toRoom = gameApi.currentRoom.roomBelow;
        if (toRoom) gameApi.changeRoom(toRoom);
      }
      console.log(
        "item (live):",
        item,
        "\nstate (shallow copy):",
        {
          ...item.state,
        },
        "\nposition",
        `(${item.state.position.x}, ${item.state.position.y}, ${item.state.position.z})`,
        "\ncontainer:",
        container,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).container = container;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).item = item;
    };

    gameApi.events.on("itemClicked", onItemClick);

    return () => {
      gameApi.events.off("itemClicked", onItemClick);
    };
  }, [gameApi]);
};
