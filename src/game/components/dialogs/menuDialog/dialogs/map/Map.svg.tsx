import { useMemo } from "react";
import type { Campaign } from "../../../../../../model/modelTypes";
import { roomGridPositions } from "./roomGridPositions";
import { type Xyz } from "../../../../../../utils/vectors/vectors";
import { RoomSvg } from "./Room.svg";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import { roomGridSizeXY, roomGridSizeZ } from "./mapConstants";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import type { CharacterRooms } from "../../../../../gameState/GameState";
import { inPlayItemIsInSubRoom } from "./itemIsInSubRoom";

export type MapSvgProps<RoomId extends string> = {
  className?: string;
  startRoomId: RoomId;
  campaign: Campaign<RoomId>;
  characterRooms?: CharacterRooms<RoomId>;
};

const svgTranslateXyz = (xyz: Xyz) => {
  const xy = projectWorldXyzToScreenXy(xyz);
  return `translate(${xy.x}, ${xy.y})`;
};

export const MapSvg = <RoomId extends string>({
  campaign,
  startRoomId,
  className,
  characterRooms,
}: MapSvgProps<RoomId>) => {
  const gridPositionSpecs = useMemo(() => {
    return sortRoomGridPositions(
      roomGridPositions({ campaign, roomId: startRoomId }),
    );
  }, [campaign, startRoomId]);

  return (
    <svg className={className || ""}>
      <g transform="translate(600, 450)">
        {gridPositionSpecs.map((gridPositionSpec) => {
          const { roomId, subRoomId, gridPosition } = gridPositionSpec;

          const hasHead =
            characterRooms?.head &&
            characterRooms.head.roomJson.id === roomId &&
            inPlayItemIsInSubRoom(
              characterRooms.head.items.head,
              subRoomId,
              characterRooms.head.roomJson,
            );

          const hasHeels =
            characterRooms?.heels &&
            characterRooms.heels.roomJson.id === roomId &&
            inPlayItemIsInSubRoom(
              characterRooms.heels.items.heels,
              subRoomId,
              characterRooms.heels.roomJson,
            );

          const hasHeadOverHeels =
            characterRooms?.headOverHeels &&
            characterRooms.headOverHeels.roomJson.id === roomId &&
            inPlayItemIsInSubRoom(
              characterRooms.headOverHeels.items.headOverHeels,
              subRoomId,
              characterRooms.headOverHeels.roomJson,
            );

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
                campaign={campaign}
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
