import { type FunctionComponent } from "preact";
import { Suspense } from "preact/compat";
import { type ValueOf } from "type-fest";

import { type PlayableItem } from "../../../../../../model/ItemInPlayNarrowedUnions";
import { findSubRoomForItem } from "../../../../../../model/map/itemIsInSubRoom";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import { getRoomItem } from "../../../../../../model/RoomState";
import { type CharacterRooms } from "../../../../../gameState/GameState";
import { lowestRoomIdOfArea } from "./lowestRoomIdOfArea";
import { MapBackground } from "./MapBackground";
import { mapSvgMarginX, mapSvgMarginY } from "./mapConstants";
import { type MapArea, type MapData } from "./MapData";
import { RoomSvg } from "./Room.svg";
import {
  type PostfixRoomDecoratorComponent,
  type PrefixRoomDecoratorComponent,
  type RoomBehaviourComponent,
  type RoomDecoratorProps,
} from "./RoomDecoratorProps";
import { roomWorldPosition } from "./roomWorldPosition";
import { ScrollIntoView } from "./ScrollIntoView";
import { translateXyz } from "./svgHelpers";

export type MapSvgProps<RoomId extends string> = MapData<RoomId> & {
  /** which of the map's areas to draw */
  areaIndex?: number;
  containerWidth?: number;
  onPlayableClick?: (name: IndividualCharacterName) => void;
  behaviours?: RoomBehaviourComponent<RoomId>[];
  prefixDecorators?: PrefixRoomDecoratorComponent<RoomId>[];
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
            playableItemInPlay.state.box,
            "fine",
            characterRooms[characterName]!.roomJson,
          )
    ) ?
      playableItemInPlay
    : undefined;
};

type MapDecoratorLayerProps<RoomId extends string> = {
  decorators: FunctionComponent<RoomDecoratorProps<RoomId>>[];
  transform: string;
  orderedPositions: ValueOf<MapArea<RoomId>["gridPositions"]>[];
  mapData: MapSvgProps<RoomId>;
  areaIndex: number;
};

/**
 * renders one `<g>` per decorator, each invoking the decorator once for every
 * placed room. used both under the rooms (prefix) and over them (postfix)
 */
const MapDecoratorLayer = <RoomId extends string>({
  decorators,
  transform,
  orderedPositions,
  mapData,
  areaIndex,
}: MapDecoratorLayerProps<RoomId>) => {
  const { curRoomId, curSubRoomId, selectedRoomIds } = mapData;
  const { gridPositions } = mapData.areas[areaIndex];

  return (
    <>
      {decorators.map((Decorator, decoratorIndex) => (
        <g key={decoratorIndex} transform={transform}>
          {orderedPositions.map((gridPositionSpec) => {
            const { roomId, subRoomId, boundaries } = gridPositionSpec;

            const isSelected = selectedRoomIds?.includes(roomId) ?? false;

            return (
              <Suspense key={`${roomId}/${subRoomId}`} fallback={null}>
                <Decorator
                  roomId={roomId}
                  subRoomId={subRoomId}
                  boundaries={boundaries}
                  isCurrentRoom={curRoomId === roomId}
                  isCurrentSubRoom={
                    curRoomId === roomId && curSubRoomId === subRoomId
                  }
                  isSelected={isSelected}
                  allGridPositions={gridPositions}
                  mapData={mapData}
                  areaIndex={areaIndex}
                />
              </Suspense>
            );
          })}
        </g>
      ))}
    </>
  );
};

export const MapSvg = <RoomId extends string>(props: MapSvgProps<RoomId>) => {
  const {
    campaign,
    areas,
    areaIndex = 0,
    currentCharacterName,
    characterRooms,
    containerWidth,
    roomsExplored,
    onPlayableClick,
    curRoomId,
    behaviours,
    prefixDecorators,
    postfixDecorators,
    selectedRoomIds,
  } = props;
  const { notableItemsByCell, gridPositions, mapBounds } = areas[areaIndex];

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

  const gridTransform = `translate(${-mapBounds.l + mapSvgMarginX + (containerWidth - contentW) / 2},${-mapBounds.t + mapSvgMarginY})`;

  // the map's background (the planet artwork and title) normally comes from
  // the current room's planet. If the area being shown doesn't contain the
  // current room (eg after paging to another area with < >), the background
  // uses the planet of that area's first room (lowest room id) instead:
  const backgroundRoomId =
    curRoomId === undefined ? undefined
    : orderedPositions.some(({ roomId }) => roomId === curRoomId) ? curRoomId
    : lowestRoomIdOfArea(gridPositions);

  return (
    <svg
      class={"w-full"}
      style={{
        minWidth: `${contentW}px`,
        height: `${contentH}px`,
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {backgroundRoomId === undefined ? null : (
        <MapBackground<RoomId>
          {...props}
          backgroundRoomId={backgroundRoomId}
          areaIndex={areaIndex}
          containerWidth={containerWidth}
        />
      )}
      {prefixDecorators !== undefined && (
        <MapDecoratorLayer
          decorators={prefixDecorators}
          transform={gridTransform}
          orderedPositions={orderedPositions}
          mapData={props}
          areaIndex={areaIndex}
        />
      )}
      <g transform={gridTransform}>
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
      {postfixDecorators !== undefined && (
        <MapDecoratorLayer
          decorators={postfixDecorators}
          transform={gridTransform}
          orderedPositions={orderedPositions}
          mapData={props}
          areaIndex={areaIndex}
        />
      )}
    </svg>
  );
};
