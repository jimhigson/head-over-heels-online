import { useMemo } from "react";
import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { startingRoomIds } from "../../../../../gameState/loadGameState";
import { useGameApi } from "../../../../GameApiContext";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { MapSvg } from "./Map.svg";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import type { SceneryName } from "../../../../../../sprites/planets";
import {
  useAllowCharacterSwopping,
  useCurrentCharacterName,
} from "./useCurrentCharacterName";

const sceneryToMapTitle: Record<SceneryName, string> = {
  blacktooth: "blacktooth",
  bookworld: "bookworld",
  jail: "blacktooth",
  egyptus: "egyptus",
  moonbase: "moonbase",
  market: "market",
  penitentiary: "penitentiary",
  safari: "safari",
};

export const ConnectedMap = <RoomId extends string>({
  className,
}: {
  className?: string;
}) => {
  const gameApi = useGameApi<RoomId>();

  const { campaign } = gameApi;

  useAllowCharacterSwopping();
  // ⬇️ hook causes re-render if character swops since last frame
  const currentCharacterName = useCurrentCharacterName();

  const { roomGridPositionSpecs, mapTitle } = useMemo(() => {
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

    return {
      roomGridPositionSpecs: sortRoomGridPositions(
        roomGridPositions({
          campaign,
          roomId: centreRoomId,
          subRoomId: curSubRoom,
        }),
      ),
      mapTitle:
        (curRoom?.roomJson.planet &&
          sceneryToMapTitle[curRoom.roomJson.planet]) ??
        "map",
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
      className={`${className}`}
      {...{
        campaign,
        pickupsCollected,
        roomGridPositionSpecs,
        currentCharacterName,
        headRoomId,
        headSubRoomId,
        headOverHeelsRoomId,
        heelsRoomId,
        heelsSubRoomId,
        headOverHeelsSubRoomId,
        mapTitle,
      }}
    />
  );
};
