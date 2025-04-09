import { useMemo } from "react";
import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { startingRoomIds } from "../../../../../gameState/loadGameState";
import { useGameApi } from "../../../../GameApiContext";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { MapSvg } from "./Map.svg";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import {
  useAllowCharacterSwopping,
  useCurrentCharacterName,
} from "./useCurrentCharacterName";
import { findMapBounds } from "./findMapBounds";
import { MapBackground } from "./MapBackground";
import { useRoomsExplored } from "../../../../../../store/selectors";

export const ConnectedMap = <RoomId extends string>({
  containerWidth,
}: {
  containerWidth: number;
}) => {
  const gameApi = useGameApi<RoomId>();
  const roomsExplored = useRoomsExplored<RoomId>();

  const { campaign } = gameApi;

  useAllowCharacterSwopping();
  // ⬇️ hook causes re-render if character swops since last frame
  const currentCharacterName = useCurrentCharacterName();

  const { gridPositions, curRoomId, mapBounds } = useMemo(() => {
    const curRoom =
      gameApi && selectCurrentRoomState<RoomId>(gameApi?.gameState);
    const centreRoomId =
      curRoom?.roomJson.id ?? startingRoomIds(campaign).head!;

    let curSubRoom: string;

    const gameState = gameApi?.gameState;

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
    };
  }, [campaign, currentCharacterName, gameApi]);

  const { characterRooms, pickupsCollected } = gameApi.gameState;

  const headRoomId = characterRooms.head?.roomJson.id;
  const heelsRoomId = characterRooms.heels?.roomJson.id;
  const headOverHeelsRoomId = characterRooms.headOverHeels?.roomJson.id;
  const headSubRoomId =
    characterRooms.head &&
    findSubRoomForItem(
      characterRooms.head.items.head,
      characterRooms.head.roomJson,
    );
  const heelsSubRoomId =
    characterRooms.heels &&
    findSubRoomForItem(
      characterRooms.heels.items.heels,
      characterRooms.heels.roomJson,
    );
  const headOverHeelsSubRoomId =
    characterRooms.headOverHeels &&
    findSubRoomForItem(
      characterRooms.headOverHeels.items.headOverHeels,
      characterRooms.headOverHeels.roomJson,
    );

  return (
    <MapSvg<RoomId>
      background={
        curRoomId === undefined ? null : (
          <MapBackground<RoomId>
            {...{
              curRoomId,
              campaign,
              gridPositions,
              mapBounds,
              containerWidth,
            }}
          />
        )
      }
      {...{
        campaign,
        mapBounds,
        pickupsCollected,
        gridPositions,
        currentCharacterName,
        headRoomId,
        headSubRoomId,
        headOverHeelsRoomId,
        heelsRoomId,
        heelsSubRoomId,
        headOverHeelsSubRoomId,
        containerWidth,
        roomsExplored,
      }}
    />
  );
};
