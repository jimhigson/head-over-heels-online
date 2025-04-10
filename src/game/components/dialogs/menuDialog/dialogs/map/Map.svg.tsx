import { type Xyz } from "../../../../../../utils/vectors/vectors";
import { RoomSvg } from "./Room.svg";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import type {
  Campaign,
  CharacterName,
} from "../../../../../../model/modelTypes";
import type { PickupsCollected } from "../../../../../gameState/GameState";
import { emptyObject } from "../../../../../../utils/empty";
import { roomWorldPosition } from "./roomWorldPosition";
import type { ReactElement } from "react";
import type { SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";
import type { ValueOf } from "type-fest";
import { mapSvgMargin } from "./mapConstants";
import type { PlayerLocations } from "./useMapData";

export type MapSvgProps<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  pickupsCollected: PickupsCollected<RoomId>;
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
  currentCharacterName?: CharacterName;
  playerLocations: PlayerLocations<RoomId>;
  background: ReactElement | null;
  mapBounds: Bounds;
  containerWidth: number;
  roomsExplored: Record<RoomId, true>;
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

export const MapSvg = <RoomId extends string>({
  campaign,
  pickupsCollected,
  gridPositions,
  currentCharacterName,
  playerLocations,
  background,
  mapBounds,
  containerWidth,
  roomsExplored,
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

          const hasHead =
            (
              playerLocations.head &&
              roomId === playerLocations.head.roomId &&
              subRoomId === playerLocations.head.subRoomId
            ) ?
              {
                current: currentCharacterName === "head",
                facingXy8: playerLocations.head.facingXy8,
              }
            : undefined;

          const hasHeels =
            (
              playerLocations.heels &&
              roomId === playerLocations.heels.roomId &&
              subRoomId === playerLocations.heels.subRoomId
            ) ?
              {
                current: currentCharacterName === "heels",
                facingXy8: playerLocations.heels.facingXy8,
              }
            : undefined;

          const hasHeadOverHeels =
            (
              playerLocations.headOverHeels &&
              roomId === playerLocations.headOverHeels.roomId &&
              subRoomId === playerLocations.headOverHeels.subRoomId
            ) ?
              { facingXy8: playerLocations.headOverHeels.facingXy8 }
            : undefined;

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
                hasHead={hasHead}
                hasHeels={hasHeels}
                hasHeadOverHeels={hasHeadOverHeels}
                roomVisited={roomsExplored[roomId] ?? false}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
