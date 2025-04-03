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
import { BitmapText } from "../../../../Sprite";
import { useTotalUpscale } from "../../../../../../store/selectors";

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
  textClassName: string;
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
  mapTitle,
  textClassName,
}: MapSvgProps<RoomId>) => {
  const { width, height, ref } = useResizeDetector({});
  const scale = useTotalUpscale();

  return (
    <svg className={className || ""} ref={ref}>
      <foreignObject width={scale * mapTitle.length * 8} height={scale * 16}>
        <BitmapText className={`sprites-double-height ${textClassName}`}>
          {mapTitle}
        </BitmapText>
      </foreignObject>
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
