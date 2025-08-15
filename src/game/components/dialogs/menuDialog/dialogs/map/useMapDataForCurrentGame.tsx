import { useMemo } from "react";

import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { findStartingRoomsInCampaign } from "../../../../../gameState/loadGameState";
import { useGameApi } from "../../../../GameApiContext";
import { findMapBounds } from "./findMapBounds";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import { useTickingCurrentCharacterName } from "./useCurrentCharacterName";
import {
  useCurrentCampaign,
  useRoomsExplored,
} from "../../../../../../store/selectors";
import type { MapData } from "./MapData";

/**
 * get everything needed to load the map for the current game
 * (mostly from the game api, a bit from the in-game-relevant store slices)
 */
export const useMapDataForCurrentGame = <
  RoomId extends string,
>(): MapData<RoomId> => {
  // ⬇️ hook causes re-render if character swops since last frame
  const currentCharacterName = useTickingCurrentCharacterName();

  const roomsExplored = useRoomsExplored<RoomId>();

  const { gameState } = useGameApi<RoomId>();
  const campaign = useCurrentCampaign<RoomId>();

  return useMemo(() => {
    try {
      const curRoom = selectCurrentRoomState<RoomId, string>(gameState);
      const centreRoomId =
        curRoom?.roomJson.id ?? findStartingRoomsInCampaign(campaign).head!;

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
          campaign,
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
        pickupsCollected: gameState.pickupsCollected,
        characterRooms: gameState.characterRooms,
        campaign,
        roomsExplored,
        curRoomScenery: curRoom?.planet,
      };
    } catch (e) {
      throw new Error("error getting map data", { cause: e });
    }
  }, [campaign, currentCharacterName, gameState, roomsExplored]);
};
