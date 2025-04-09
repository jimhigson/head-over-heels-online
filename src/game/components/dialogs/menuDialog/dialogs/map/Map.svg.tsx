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

export type MapSvgProps<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  pickupsCollected: PickupsCollected<RoomId>;
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
  currentCharacterName?: CharacterName;
  headRoomId?: RoomId;
  heelsRoomId?: RoomId;
  headOverHeelsRoomId?: RoomId;
  headSubRoomId?: string;
  heelsSubRoomId?: string;
  headOverHeelsSubRoomId?: string;
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
  headRoomId,
  headSubRoomId,
  heelsRoomId,
  heelsSubRoomId,
  headOverHeelsRoomId,
  headOverHeelsSubRoomId,
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
    >
      {background}
      <g
        transform={`translate(${-mapBounds.l + mapSvgMargin + (containerWidth - contentW) / 2},${-mapBounds.t + +mapSvgMargin})`}
      >
        {orderedPositions.map((gridPositionSpec) => {
          const { roomId, subRoomId, gridPosition } = gridPositionSpec;

          const hasHead =
            (roomId === headRoomId &&
              subRoomId === headSubRoomId &&
              (currentCharacterName === "head" ? "active" : "present")) ??
            false;

          const hasHeels =
            (roomId === heelsRoomId &&
              subRoomId === heelsSubRoomId &&
              (currentCharacterName === "heels" ? "active" : "present")) ??
            false;

          const hasHeadOverHeels =
            (roomId === headOverHeelsRoomId &&
              subRoomId === headOverHeelsSubRoomId &&
              "active") ??
            false;

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
