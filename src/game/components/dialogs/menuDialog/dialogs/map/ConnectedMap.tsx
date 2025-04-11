import { useGameApi } from "../../../../GameApiContext";
import { MapSvg } from "./Map.svg";
import { useAllowCharacterSwopping } from "./useCurrentCharacterName";
import { MapBackground } from "./MapBackground";
import { useRoomsExplored } from "../../../../../../store/selectors";
import { useMapData } from "./useMapData";
import { swopPlayables } from "../../../../../gameState/mutators/swopCharacters";

export const ConnectedMap = <RoomId extends string>({
  containerWidth,
}: {
  containerWidth: number;
}) => {
  const gameApi = useGameApi<RoomId>();
  const roomsExplored = useRoomsExplored<RoomId>();

  const { campaign } = gameApi;

  // the user can switch characters while looking at the map:
  useAllowCharacterSwopping();

  const {
    gridPositions,
    curRoomId,
    mapBounds,
    playerLocations,
    currentCharacterName,
  } = useMapData<RoomId>();

  const { pickupsCollected } = gameApi.gameState;

  return (
    <MapSvg<RoomId>
      onPlayableClick={(name) => swopPlayables(gameApi.gameState, name)}
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
        curRoomId,
        playerLocations,
        containerWidth,
        roomsExplored,
      }}
    />
  );
};
