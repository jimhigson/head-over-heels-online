import { useMemo } from "react";
import type { CharacterName } from "../../../../../../model/modelTypes";
import { getRoomItem } from "../../../../../../model/RoomState";
import {
  type DirectionXy8,
  vectorClosestDirectionXy8,
} from "../../../../../../utils/vectors/vectors";
import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { startingRoomIds } from "../../../../../gameState/loadGameState";
import { useGameApi } from "../../../../GameApiContext";
import { findMapBounds } from "./findMapBounds";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import { useTickingCurrentCharacterName } from "./useCurrentCharacterName";

/** describes where to render the players on the map */
export type PlayerLocations<RoomId extends string> = {
  [C in CharacterName]?: {
    facingXy8: DirectionXy8;
    roomId: RoomId;
    subRoomId: string;
  };
};
export const useMapData = <RoomId extends string>() => {
  // ⬇️ hook causes re-render if character swops since last frame
  const currentCharacterName = useTickingCurrentCharacterName();

  const { gameState } = useGameApi<RoomId>();

  return useMemo(() => {
    const curRoom = selectCurrentRoomState<RoomId>(gameState);
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
          curSubRoom = findSubRoomForItem(curCharacterItem, curRoom.roomJson);
        }
      }
    }

    const { characterRooms } = gameState;

    const playerLocations: PlayerLocations<RoomId> = {
      head: characterRooms.head && {
        roomId: characterRooms.head.roomJson.id,
        subRoomId: findSubRoomForItem(
          characterRooms.head.items.head,
          characterRooms.head.roomJson,
        ),
        facingXy8:
          vectorClosestDirectionXy8(
            getRoomItem("head", characterRooms.head.items)!.state.facing,
          ) ?? "towards",
      },
      heels: characterRooms.heels && {
        roomId: characterRooms.heels.roomJson.id,
        subRoomId: findSubRoomForItem(
          characterRooms.heels.items.heels,
          characterRooms.heels.roomJson,
        ),
        facingXy8:
          vectorClosestDirectionXy8(
            getRoomItem("heels", characterRooms.heels.items)!.state.facing,
          ) ?? "towards",
      },
      headOverHeels: characterRooms.headOverHeels && {
        roomId: characterRooms.headOverHeels.roomJson.id,
        subRoomId: findSubRoomForItem(
          characterRooms.headOverHeels.items.headOverHeels,
          characterRooms.headOverHeels.roomJson,
        ),
        facingXy8:
          vectorClosestDirectionXy8(
            getRoomItem("headOverHeels", characterRooms.headOverHeels.items)!
              .state.facing,
          ) ?? "towards",
      },
    };

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
      playerLocations,
    };
  }, [currentCharacterName, gameState]);
};
