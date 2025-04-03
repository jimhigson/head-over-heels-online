import { useMemo } from "react";
import { selectCurrentRoomState } from "../../../../../gameState/gameStateSelectors/selectCurrentRoomState";
import { selectCurrentPlayableItem } from "../../../../../gameState/gameStateSelectors/selectPlayableItem";
import { startingRoomIds } from "../../../../../gameState/loadGameState";
import { useGameApi } from "../../../../GameApiContext";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { MapSvg } from "./Map.svg";
import { roomGridPositions } from "./roomGridPositions";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import type { SceneryName } from "../../../../../../sprites/planets";

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
  const curRoom = gameApi && selectCurrentRoomState<RoomId>(gameApi?.gameState);

  const centreRoomId = curRoom?.roomJson.id ?? startingRoomIds(campaign).head!;

  const curSubRoom = useMemo(() => {
    const gameState = gameApi?.gameState;

    if (!gameState) return "*";

    const subRooms = curRoom?.roomJson.meta?.subRooms;

    if (!subRooms) return "*";

    const curCharacterItem = selectCurrentPlayableItem<RoomId>(gameState);

    if (!curCharacterItem) return "*";

    return findSubRoomForItem(curCharacterItem, curRoom.roomJson);
  }, [curRoom?.roomJson, gameApi?.gameState]);

  const roomGridPositionSpecs = useMemo(() => {
    return sortRoomGridPositions(
      roomGridPositions({
        campaign,
        roomId: centreRoomId,
        subRoomId: curSubRoom,
      }),
    );
  }, [campaign, centreRoomId, curSubRoom]);

  const { characterRooms, currentCharacterName, pickupsCollected } =
    gameApi.gameState;

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

  const mapTitle =
    (curRoom?.roomJson.planet && sceneryToMapTitle[curRoom.roomJson.planet]) ??
    "map";

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
