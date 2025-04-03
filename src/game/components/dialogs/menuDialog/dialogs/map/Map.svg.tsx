import type { RoomGridPositionSpec } from "./roomGridPositions";
import { type Xyz } from "../../../../../../utils/vectors/vectors";
import { RoomSvg } from "./Room.svg";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import type {
  Campaign,
  CharacterName,
} from "../../../../../../model/modelTypes";
import type { PickupsCollected } from "../../../../../gameState/GameState";
import { emptyObject } from "../../../../../../utils/empty";
import { BitmapText } from "../../../../Sprite";
import { useTotalUpscale } from "../../../../../../store/selectors";
import { roomWorldPosition } from "./roomWorldPosition";
import { findMapBounds } from "./findMapBounds";

export type MapSvgProps<RoomId extends string> = {
  className?: string;
  campaign: Campaign<RoomId>;
  pickupsCollected: PickupsCollected<RoomId>;
  roomGridPositionSpecs: Array<RoomGridPositionSpec<RoomId>>;
  currentCharacterName?: CharacterName;
  headRoomId?: RoomId;
  heelsRoomId?: RoomId;
  headOverHeelsRoomId?: RoomId;
  headSubRoomId?: string;
  heelsSubRoomId?: string;
  headOverHeelsSubRoomId?: string;
  mapTitle: string;
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
  className,
  campaign,
  pickupsCollected,
  roomGridPositionSpecs,
  currentCharacterName,
  headRoomId,
  headSubRoomId,
  heelsRoomId,
  heelsSubRoomId,
  headOverHeelsRoomId,
  headOverHeelsSubRoomId,
  mapTitle,
}: MapSvgProps<RoomId>) => {
  const scale = useTotalUpscale();

  const mapBounds = findMapBounds(roomGridPositionSpecs);

  const mapSvgMargin = 8;

  return (
    <svg
      className={className || ""}
      width={mapBounds.r - mapBounds.l + 2 * mapSvgMargin}
      height={mapBounds.b - mapBounds.t + 2 * mapSvgMargin}
    >
      <foreignObject
        width={scale * mapTitle.length * 8}
        height={scale * 16}
        x={mapSvgMargin}
        y={mapSvgMargin}
      >
        <BitmapText className="sprites-double-height">{mapTitle}</BitmapText>
      </foreignObject>
      <g
        transform={`translate(${-mapBounds.l + mapSvgMargin},${-mapBounds.t + +mapSvgMargin})`}
      >
        {roomGridPositionSpecs.map((gridPositionSpec) => {
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
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
