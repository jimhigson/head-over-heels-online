import { type Xyz } from "../../../../../../utils/vectors/vectors";
import { RoomSvg } from "./Room.svg";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import type {
  Campaign,
  CharacterName,
  IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import type {
  CharacterRooms,
  PickupsCollected,
} from "../../../../../gameState/GameState";
import { emptyObject } from "../../../../../../utils/empty";
import { roomWorldPosition } from "./roomWorldPosition";
import type { ReactElement } from "react";
import type { SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";
import type { ValueOf } from "type-fest";
import { mapSvgMargin } from "./mapConstants";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { getRoomItem } from "../../../../../../model/RoomState";
import type { PlayableItem } from "../../../../../physics/itemPredicates";

export type MapSvgProps<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  pickupsCollected: PickupsCollected<RoomId>;
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
  currentCharacterName: CharacterName;
  characterRooms: CharacterRooms<RoomId>;
  background: ReactElement | null;
  mapBounds: Bounds;
  containerWidth: number;
  roomsExplored: Record<RoomId, true>;
  onPlayableClick?: (name: IndividualCharacterName) => void;
};

const svgTranslateXyz = (xyz: Xyz) => {
  const xy = projectWorldXyzToScreenXy(xyz);
  return `translate(${xy.x}, ${xy.y})`;
};

export type Bounds = {
  b: number;
  t: number;
  l: number;
  r: number;
};

const selectPlayableItemInRoomAndSubroom = <
  C extends CharacterName,
  RoomId extends string,
>(
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
            playableItemInPlay,
            characterRooms[characterName]!.roomJson,
          )
    ) ?
      playableItemInPlay
    : undefined;
};

export const MapSvg = <RoomId extends string>({
  campaign,
  pickupsCollected,
  gridPositions,
  currentCharacterName,
  characterRooms,
  background,
  mapBounds,
  containerWidth,
  roomsExplored,
  onPlayableClick,
}: MapSvgProps<RoomId>) => {
  const contentW = mapBounds.r - mapBounds.l + 2 * mapSvgMargin;
  const contentH = mapBounds.b - mapBounds.t + 2 * mapSvgMargin;

  const orderedPositions = Object.values(gridPositions) as ValueOf<
    typeof gridPositions
  >[];

  return (
    <svg
      className={"w-full"}
      style={{
        minWidth: `${contentW}px`,
        height: `${contentH}px`,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {background}
      <g
        transform={`translate(${-mapBounds.l + mapSvgMargin + (containerWidth - contentW) / 2},${-mapBounds.t + +mapSvgMargin})`}
      >
        {orderedPositions.map((gridPositionSpec) => {
          const { roomId, subRoomId, gridPosition } = gridPositionSpec;
          const roomRenderingId = `${roomId}/${subRoomId}`;

          return (
            <g
              key={roomRenderingId}
              data-id={roomRenderingId}
              transform={svgTranslateXyz(roomWorldPosition(gridPosition))}
            >
              <RoomSvg
                roomGridPositionSpec={gridPositionSpec}
                roomPickupsCollected={pickupsCollected[roomId] ?? emptyObject}
                roomJson={campaign.rooms[roomId]}
                headItemInRoom={selectPlayableItemInRoomAndSubroom(
                  characterRooms,
                  "head",
                  roomId,
                  subRoomId,
                )}
                heelsItemInRoom={selectPlayableItemInRoomAndSubroom(
                  characterRooms,
                  "heels",
                  roomId,
                  subRoomId,
                )}
                headOverHeelsItemInRoom={selectPlayableItemInRoomAndSubroom(
                  characterRooms,
                  "headOverHeels",
                  roomId,
                  subRoomId,
                )}
                currentCharacterName={currentCharacterName}
                roomVisited={roomsExplored[roomId] ?? false}
                onPlayableClick={onPlayableClick}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
