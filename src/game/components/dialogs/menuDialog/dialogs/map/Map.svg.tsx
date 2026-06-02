import { Suspense } from "react";
import { type ValueOf } from "type-fest";

import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import { getRoomItem } from "../../../../../../model/RoomState";
import { type CharacterRooms } from "../../../../../gameState/GameState";
import { type PlayableItem } from "../../../../../physics/itemPredicates";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { MapBackground } from "./MapBackground";
import { mapSvgMarginX, mapSvgMarginY } from "./mapConstants";
import { type MapData } from "./MapData";
import { RoomSvg } from "./Room.svg";
import {
  type PostfixRoomDecoratorComponent,
  type RoomBehaviourComponent,
} from "./RoomDecoratorProps";
import { roomWorldPosition } from "./roomWorldPosition";
import { ScrollIntoView } from "./ScrollIntoView";
import { translateXyz } from "./svgHelpers";

export type MapSvgProps<RoomId extends string> = MapData<RoomId> & {
  containerWidth?: number;
  onPlayableClick?: (name: IndividualCharacterName) => void;
  behaviours?: RoomBehaviourComponent<RoomId>[];
  postfixDecorators?: PostfixRoomDecoratorComponent<RoomId>[];
  selectedRoomIds?: ReadonlyArray<RoomId>;
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
            playableItemInPlay.state.position,
            "fine",
            characterRooms[characterName]!.roomJson,
          )
    ) ?
      playableItemInPlay
    : undefined;
};

export const MapSvg = <RoomId extends string>(props: MapSvgProps<RoomId>) => {
  const {
    campaign,
    notableItemsByCell,
    gridPositions,
    currentCharacterName,
    characterRooms,
    mapBounds,
    containerWidth,
    roomsExplored,
    onPlayableClick,
    curRoomId,
    curSubRoomId,
    behaviours,
    postfixDecorators,
    selectedRoomIds,
  } = props;

  if (containerWidth === undefined) {
    // until the container width is known, don't render anything. This prop is optional
    // to avoid the multiple call-sites that all need the same check from having to
    // do the branching themselves
    return null;
  }

  const contentW = mapBounds.r - mapBounds.l + 2 * mapSvgMarginX;
  const contentH = mapBounds.b - mapBounds.t + 2 * mapSvgMarginY;

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
      {curRoomId === undefined ? null : (
        <MapBackground<RoomId>
          {...props}
          curRoomId={curRoomId}
          containerWidth={containerWidth}
        />
      )}
      <g
        transform={`translate(${-mapBounds.l + mapSvgMarginX + (containerWidth - contentW) / 2},${-mapBounds.t + mapSvgMarginY})`}
      >
        {orderedPositions.map((gridPositionSpec) => {
          const { roomId, subRoomId, gridPosition } = gridPositionSpec;
          const roomRenderingId: `${RoomId}/${string}` = `${roomId}/${subRoomId}`;
          const isCurrentRoom = curRoomId === roomId;
          const isSelected = selectedRoomIds?.includes(roomId) ?? false;

          return (
            <g
              key={roomRenderingId}
              data-id={roomRenderingId}
              transform={translateXyz(roomWorldPosition(gridPosition))}
            >
              <RoomSvg
                roomGridPositionSpec={gridPositionSpec}
                notableItemsInCell={notableItemsByCell?.[roomRenderingId]}
                roomJson={campaign.rooms[roomId]}
                isCurrentRoom={isCurrentRoom}
                isSelected={isSelected}
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
                behaviours={behaviours}
              />
              {isCurrentRoom ?
                <ScrollIntoView svg smooth />
              : null}
            </g>
          );
        })}
      </g>
      {postfixDecorators?.map((PostFixDecorator, decoratorIndex) => (
        <g
          key={decoratorIndex}
          transform={`translate(${-mapBounds.l + mapSvgMarginX + (containerWidth - contentW) / 2},${-mapBounds.t + mapSvgMarginY})`}
        >
          {orderedPositions.map((gridPositionSpec) => {
            const { roomId, subRoomId, boundaries } = gridPositionSpec;

            const isSelected = selectedRoomIds?.includes(roomId) ?? false;

            return (
              <Suspense key={`${roomId}/${subRoomId}`} fallback={null}>
                <PostFixDecorator
                  roomId={roomId}
                  subRoomId={subRoomId}
                  boundaries={boundaries}
                  isCurrentRoom={curRoomId === roomId}
                  isCurrentSubRoom={
                    curRoomId === roomId && curSubRoomId === subRoomId
                  }
                  isSelected={isSelected}
                  allGridPositions={gridPositions}
                  mapData={props}
                />
              </Suspense>
            );
          })}
        </g>
      ))}
    </svg>
  );
};
