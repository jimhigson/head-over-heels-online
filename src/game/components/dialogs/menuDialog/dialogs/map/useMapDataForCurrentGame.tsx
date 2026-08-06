import { useMemo } from "preact/hooks";

import { findSubRoomForItem } from "../../../../../../model/map/itemIsInSubRoom";
import { roomGridPositions } from "../../../../../../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../../../../../../model/map/sortRoomGridPositions";
import {
  useCurrentCampaign,
  useRoomsExplored,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { findStartingRoomsInCampaign } from "../../../../../gameState/loadGameState";
import { useGameApi } from "../../../../GameApiContext";
import { findMapBounds } from "./findMapBounds";
import { type MapData } from "./MapData";
import { computeNotableItemsByCell } from "./notableItemsByCell";
import { useTickingCurrentCharacterName } from "./useTickingCurrentCharacterName";

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

      if (!gameState) {
        curSubRoom = "*";
      } else {
        const subRooms = curRoom?.roomJson.meta?.subRooms;

        if (!subRooms) {
          curSubRoom = "*";
        } else {
          const curCharacterItem = curRoom?.items[currentCharacterName];

          if (!curCharacterItem) {
            curSubRoom = "*";
          } else {
            curSubRoom = findSubRoomForItem(
              curCharacterItem.state.box,
              "fine",
              curRoom.roomJson,
            );
          }
        }
      }

      const positions = roomGridPositions({
        campaign,
        roomId: centreRoomId,
        subRoomId: curSubRoom,
      }).nodes;
      const sortedObjectOfPositions = sortRoomGridPositions(positions);

      return {
        mapBounds: findMapBounds(positions),
        curRoomId: curRoom?.roomJson.id,
        curSubRoomId: undefined,
        gridPositions: sortedObjectOfPositions,
        notableItemsByCell: computeNotableItemsByCell(
          sortedObjectOfPositions,
          campaign,
          gameState.pickupsCollected,
        ),
        currentCharacterName,
        pickupsCollected: gameState.pickupsCollected,
        characterRooms: gameState.characterRooms,
        campaign,
        roomsExplored,
        curRoomScenery: curRoom?.planet,
        isError: false,
      };
    } catch (e) {
      throw new Error("error getting map data", { cause: e });
    }
  }, [campaign, currentCharacterName, gameState, roomsExplored]);
};
