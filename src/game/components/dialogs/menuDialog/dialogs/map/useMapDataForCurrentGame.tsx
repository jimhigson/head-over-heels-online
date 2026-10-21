import { useMemo } from "preact/hooks";

import { originalUserId } from "../../../../../../gameInfo";
import { type PlayableItem } from "../../../../../../model/ItemInPlayNarrowedUnions";
import { findSubRoomForItem } from "../../../../../../model/map/itemIsInSubRoom";
import { roomGridPositions } from "../../../../../../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../../../../../../model/map/sortRoomGridPositions";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import { getRoomItem } from "../../../../../../model/RoomState";
import {
  useCurrentCampaign,
  useRoomsExplored,
} from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { type CharacterRooms } from "../../../../../gameState/GameState";
import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { findStartingRoomsInCampaign } from "../../../../../gameState/loadGameState";
import { useGameApi } from "../../../../GameApiContext";
import { findMapBounds } from "./findMapBounds";
import { type CellPlayables, type MapContextValue } from "./MapContext";
import { type MapArea, type MapData } from "./MapData";
import { computeNotableItemsByCell } from "./notableItemsByCell";
import { type RoomBehaviourComponent } from "./RoomDecoratorProps";
import { useTickingCurrentCharacterName } from "./useTickingCurrentCharacterName";

const playableItemInCell = <C extends CharacterName, RoomId extends string>(
  characterRooms: CharacterRooms<RoomId>,
  characterName: C,
  roomId: RoomId,
  subRoomId: string,
): PlayableItem<C, RoomId> | undefined => {
  const playableItemInPlay = getRoomItem(
    characterName,
    characterRooms[characterName]?.items,
  ) as PlayableItem<C, RoomId> | undefined;

  return (
      playableItemInPlay &&
        roomId === characterRooms[characterName]!.roomJson.id &&
        subRoomId ===
          findSubRoomForItem(
            playableItemInPlay.state.box,
            "fine",
            characterRooms[characterName]!.roomJson,
          )
    ) ?
      playableItemInPlay
    : undefined;
};

const cellPlayables = <RoomId extends string>(
  characterRooms: CharacterRooms<RoomId>,
  roomId: RoomId,
  subRoomId: string,
): CellPlayables<RoomId> => ({
  head: playableItemInCell(characterRooms, "head", roomId, subRoomId),
  heels: playableItemInCell(characterRooms, "heels", roomId, subRoomId),
  headOverHeels: playableItemInCell(
    characterRooms,
    "headOverHeels",
    roomId,
    subRoomId,
  ),
});

/**
 * the map of the current game, and the context its rooms draw from
 */
export type MapForCurrentGame<RoomId extends string> = {
  mapData: MapData<RoomId>;
  mapContext: MapContextValue<RoomId>;
};

/**
 * get everything needed to load the map for the current game
 * (mostly from the game api, a bit from the in-game-relevant store slices).
 * The map is only shown while the game is paused on it, so the whole map is
 * worked out afresh whenever anything in it changes
 */
export const useMapDataForCurrentGame = <RoomId extends string>(
  behaviours: RoomBehaviourComponent<RoomId>[],
  onPlayableClick: (name: IndividualCharacterName) => void,
): MapForCurrentGame<RoomId> => {
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
      const sortedPositions = sortRoomGridPositions(positions);
      const notableItemsByCell = computeNotableItemsByCell(
        sortedPositions,
        campaign,
        gameState.pickupsCollected,
      );

      return {
        mapData: {
          curRoomId: curRoom?.roomJson.id,
          curSubRoomId: undefined,
          // in-game, the map only shows the area the current room is in, don't calc
          // any others since they won't be used:
          areas: [
            {
              mapBounds: findMapBounds(positions),
              gridPositions: sortedPositions,
            } satisfies MapArea<RoomId>,
          ],
          curRoomScenery: curRoom?.planet,
          isError: false,
        },
        // none of these call any hooks, so are fine to swap for others when
        // the game changes:
        mapContext: {
          isOriginalCampaign: campaign.locator.userId === originalUserId,
          currentCharacterName,
          onPlayableClick,
          behaviours,
          prefixDecorators: [],
          postfixDecorators: [],
          useRoomJson: (roomId) => campaign.rooms[roomId],
          useNotableItemsInCell: (cellKey) => notableItemsByCell[cellKey],
          useNotableItemsByCell: () => notableItemsByCell,
          useCellPlayables: (roomId, subRoomId) =>
            cellPlayables(gameState.characterRooms, roomId, subRoomId),
          useRoomVisited: (roomId) => roomsExplored[roomId] ?? false,
          useIsRoomSelected: () => false,
        },
      };
    } catch (e) {
      throw new Error("error getting map data", { cause: e });
    }
  }, [
    behaviours,
    campaign,
    currentCharacterName,
    gameState,
    onPlayableClick,
    roomsExplored,
  ]);
};
