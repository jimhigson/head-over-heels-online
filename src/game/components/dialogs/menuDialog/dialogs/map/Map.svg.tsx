import { useMemo } from "react";
import type { Campaign } from "../../../../../../model/modelTypes";
import { roomGridPositions } from "./roomGridPositions";
import { type Xyz } from "../../../../../../utils/vectors/vectors";
import { RoomSvg } from "./Room.svg";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import { roomGridSizeXY, roomGridSizeZ } from "./mapConstants";
import { sortRoomGridPositions } from "./sortRoomGridPositions";
import type { GameState } from "../../../../../gameState/GameState";
import { inPlayItemIsInSubRoom } from "./itemIsInSubRoom";
import { useResizeDetector } from "react-resize-detector";

export type MapSvgProps<RoomId extends string> = {
  className?: string;
  startRoomId: RoomId;
  startSubRoomId: string;
  campaign: Campaign<RoomId>;
  gameState?: GameState<RoomId>;
};

const svgTranslateXyz = (xyz: Xyz) => {
  const xy = projectWorldXyzToScreenXy(xyz);
  return `translate(${xy.x}, ${xy.y})`;
};

export const MapSvg = <RoomId extends string>({
  campaign,
  startRoomId,
  startSubRoomId,
  className,
  gameState,
}: MapSvgProps<RoomId>) => {
  const { width, height, ref } = useResizeDetector({});

  const gridPositionSpecs = useMemo(() => {
    return sortRoomGridPositions(
      roomGridPositions({
        campaign,
        roomId: startRoomId,
        subRoomId: startSubRoomId,
      }),
    );
  }, [campaign, startRoomId, startSubRoomId]);

  const characterRooms = gameState?.characterRooms;

  return (
    <svg className={className || ""} ref={ref}>
      <g
        transform={
          width !== undefined && height !== undefined ?
            `translate(${width / 2},${height / 2})`
          : ""
        }
      >
        {gridPositionSpecs.map((gridPositionSpec) => {
          const { roomId, subRoomId, gridPosition } = gridPositionSpec;

          const hasHead =
            (characterRooms?.head &&
              characterRooms.head.roomJson.id === roomId &&
              inPlayItemIsInSubRoom(
                characterRooms.head.items.head,
                subRoomId,
                characterRooms.head.roomJson,
              ) &&
              (gameState?.currentCharacterName === "head" ?
                "active"
              : "present")) ??
            false;

          const hasHeels =
            (characterRooms?.heels &&
              characterRooms.heels.roomJson.id === roomId &&
              inPlayItemIsInSubRoom(
                characterRooms.heels.items.heels,
                subRoomId,
                characterRooms.heels.roomJson,
              ) &&
              (gameState?.currentCharacterName === "heels" ?
                "active"
              : "present")) ??
            false;

          const hasHeadOverHeels =
            (characterRooms?.headOverHeels &&
              characterRooms.headOverHeels.roomJson.id === roomId &&
              inPlayItemIsInSubRoom(
                characterRooms.headOverHeels.items.headOverHeels,
                subRoomId,
                characterRooms.headOverHeels.roomJson,
              ) &&
              (gameState?.currentCharacterName === "headOverHeels" ?
                "active"
              : "present")) ??
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
