import { useMemo } from "react";

import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { startingRoomIds } from "../../../../../gameState/loadGameState";
import { useGameApi } from "../../../../GameApiContext";
import { findMapBounds } from "./findMapBounds";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import { useTickingCurrentCharacterName } from "./useCurrentCharacterName";

export const useMapData = <RoomId extends string>() => {
  // ⬇️ hook causes re-render if character swops since last frame
  const currentCharacterName = useTickingCurrentCharacterName();

  const { gameState } = useGameApi<RoomId>();

  return useMemo(() => {
    try {
      const curRoom = selectCurrentRoomState<RoomId, string>(gameState);
      const centreRoomId =
        curRoom?.roomJson.id ?? startingRoomIds(gameState.campaign).head!;

      let curSubRoom: string;

      if (!gameState) curSubRoom = "*";
      else {
        const subRooms = curRoom?.roomJson.meta?.subRooms;

        if (!subRooms) curSubRoom = "*";
        else {
          const curCharacterItem = curRoom?.items[currentCharacterName];

          if (!curCharacterItem) curSubRoom = "*";
          else {
            curSubRoom = findSubRoomForItem(
              curCharacterItem.state.position,
              "fine",
              curRoom.roomJson,
            );
          }
        }
      }

      const positions = [
        ...roomGridPositions({
          campaign: gameState.campaign,
          roomId: centreRoomId,
          subRoomId: curSubRoom,
        }),
      ];
      const sortedObjectOfPositions = sortRoomGridPositions(positions);

      return {
        mapBounds: findMapBounds(positions),
        curRoomId: curRoom?.roomJson.id,
        gridPositions: sortedObjectOfPositions,
        currentCharacterName,
      };
    } catch (e) {
      throw new Error("error getting map data", { cause: e });
    }
  }, [currentCharacterName, gameState]);
};
