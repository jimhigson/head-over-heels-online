import type { ValueOf } from "type-fest";

import { Suspense } from "react";

import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import type { CharacterRooms } from "../../../../../gameState/GameState";
import type { PlayableItem } from "../../../../../physics/itemPredicates";
import type { MapData } from "./MapData";
import type {
  PostfixRoomDecoratorComponent,
  WrapClickableRoomDecoratorComponent,
} from "./RoomDecoratorProps";

import { getRoomItem } from "../../../../../../model/RoomState";
import { emptyObject } from "../../../../../../utils/empty";
import { findSubRoomForItem } from "./itemIsInSubRoom";
import { MapBackground } from "./MapBackground";
import { mapSvgMarginX, mapSvgMarginY } from "./mapConstants";
import { RoomSvg } from "./Room.svg";
import { roomWorldPosition } from "./roomWorldPosition";
import { ScrollIntoView } from "./ScrollIntoView";
import { translateXyz } from "./svgHelpers";

export type MapSvgProps<RoomId extends string> = MapData<RoomId> & {
  containerWidth?: number;
  onPlayableClick?: (name: IndividualCharacterName) => void;
  /** outermost first — the last decorator in the array wraps the clickable path directly */
  clickableAreaDecorators?: WrapClickableRoomDecoratorComponent<RoomId>[];
  postfixDecorators?: PostfixRoomDecoratorComponent<RoomId>[];
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
    pickupsCollected,
    gridPositions,
    currentCharacterName,
    characterRooms,
    mapBounds,
    containerWidth,
    roomsExplored,
    onPlayableClick,
    curRoomId,
    curSubRoomId,
    clickableAreaDecorators,
    postfixDecorators,
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
        transform={`translate(${-mapBounds.l + mapSvgMarginX + (containerWidth - contentW) / 2},${-mapBounds.t + +mapSvgMarginY})`}
      >
        {orderedPositions.map((gridPositionSpec) => {
          const { roomId, subRoomId, gridPosition } = gridPositionSpec;
          const roomRenderingId = `${roomId}/${subRoomId}`;
          const isCurrentRoom = curRoomId === roomId;
          const isCurrentSubRoom = isCurrentRoom && curSubRoomId === subRoomId;

          return (
            <g
              key={roomRenderingId}
              data-id={roomRenderingId}
              transform={translateXyz(roomWorldPosition(gridPosition))}
            >
              <RoomSvg
                roomGridPositionSpec={gridPositionSpec}
                roomPickupsCollected={pickupsCollected[roomId] ?? emptyObject}
                roomJson={campaign.rooms[roomId]}
                isCurrentRoom={isCurrentRoom}
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
                ClickableAreaWrapper={
                  clickableAreaDecorators?.length ?
                    ({ children }) =>
                      clickableAreaDecorators.reduceRight(
                        (wrapped, ClickableAreaDecorator) => (
                          <Suspense fallback={null}>
                            <ClickableAreaDecorator
                              roomId={roomId}
                              subRoomId={subRoomId}
                              boundaries={gridPositionSpec.boundaries}
                              isCurrentRoom={isCurrentRoom}
                              isCurrentSubRoom={isCurrentSubRoom}
                              allGridPositions={gridPositions}
                            >
                              {wrapped}
                            </ClickableAreaDecorator>
                          </Suspense>
                        ),
                        children,
                      )
                  : undefined
                }
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
          transform={`translate(${-mapBounds.l + mapSvgMarginX + (containerWidth - contentW) / 2},${-mapBounds.t + +mapSvgMarginY})`}
        >
          {orderedPositions.map((gridPositionSpec) => {
            const { roomId, subRoomId, gridPosition, boundaries } =
              gridPositionSpec;

            return (
              <g
                key={`${roomId}/${subRoomId}`}
                transform={translateXyz(roomWorldPosition(gridPosition))}
              >
                <Suspense fallback={null}>
                  <PostFixDecorator
                    roomId={roomId}
                    subRoomId={subRoomId}
                    boundaries={boundaries}
                    isCurrentRoom={curRoomId === roomId}
                    isCurrentSubRoom={
                      curRoomId === roomId && curSubRoomId === subRoomId
                    }
                    allGridPositions={gridPositions}
                  />
                </Suspense>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
};
