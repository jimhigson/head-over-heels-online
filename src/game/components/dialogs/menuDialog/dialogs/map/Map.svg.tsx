import type { RoomGridPositionSpec } from "./roomGridPositions";
import { type Xyz } from "../../../../../../utils/vectors/vectors";
import { RoomSvg } from "./Room.svg";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import { roomGridSizeXY, roomGridSizeZ } from "./mapConstants";
import { useResizeDetector } from "react-resize-detector";
import type {
  Campaign,
  CharacterName,
} from "../../../../../../model/modelTypes";
import type { PickupsCollected } from "../../../../../gameState/GameState";
import { emptyObject } from "../../../../../../utils/empty";

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
};

const svgTranslateXyz = (xyz: Xyz) => {
  const xy = projectWorldXyzToScreenXy(xyz);
  return `translate(${xy.x}, ${xy.y})`;
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
}: MapSvgProps<RoomId>) => {
  const { width, height, ref } = useResizeDetector({});

  return (
    <svg className={className || ""} ref={ref}>
      <g
        transform={
          width !== undefined && height !== undefined ?
            `translate(${width / 2},${height / 2})`
          : ""
        }
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

          return (
            <g
              key={`${roomId}/${subRoomId}`}
              data-id={`${roomId}/${subRoomId}`}
              transform={svgTranslateXyz({
                x: gridPosition.x * roomGridSizeXY,
                y: gridPosition.y * roomGridSizeXY,
                z: gridPosition.z * roomGridSizeZ,
              })}
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
