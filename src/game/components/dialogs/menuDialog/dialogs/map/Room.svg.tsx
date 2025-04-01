import { useMemo } from "react";
import { lengthXy, type Xyz } from "../../../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import { roomGridSizeXY, roomGridSizeZ } from "./mapConstants";
import { iterate } from "../../../../../../utils/iterate";
import { objectValues } from "iter-tools";
import type { JsonItem } from "../../../../../../model/json/JsonItem";
import { jsonItemIsInSubRoom } from "./itemIsInSubRoom";
import type { RoomGridPositionSpec } from "./roomGridPositions";
import type { Campaign } from "../../../../../../model/modelTypes";

export const translateXyz = (xyz: Partial<Xyz>) => {
  const xy = projectWorldXyzToScreenXy(xyz);
  return `translate(${xy.x},${xy.y})`;
};
export const project = (xyz: Partial<Xyz>) => {
  const xy = projectWorldXyzToScreenXy(xyz);
  return `${xy.x},${xy.y}`;
};

const doorwayGap = 0.6;

const boundaryLineLength = lengthXy(
  projectWorldXyzToScreenXy({ x: roomGridSizeXY, y: 0 }),
);

export const boundaryDasharrays = {
  wall: undefined,
  open: "0,999",
  doorway: `${boundaryLineLength * ((1 - doorwayGap) / 2)}, ${boundaryLineLength * doorwayGap}, 999`,
};

const floorFillPathD = `
M ${project({ x: 0, y: 0 })}
L ${project({ x: 0, y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY, y: 0 })}
z`;

const awayWallFillPathD = `
M ${project({ x: 0, y: roomGridSizeXY })}
L ${project({ x: 0, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
z`;
const leftWallFillPathD = `
M ${project({ x: roomGridSizeXY, y: 0 })}
L ${project({ x: roomGridSizeXY, y: 0, z: roomGridSizeZ })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
z`;

const highRoomVerticalLinesPathD = `            
M ${project({ x: roomGridSizeXY, y: roomGridSizeXY, z: roomGridSizeZ })}            
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}            
M ${project({ x: roomGridSizeXY, y: 0, z: roomGridSizeZ })}            
L ${project({ x: roomGridSizeXY, y: 0 })}            
M ${project({ x: 0, y: roomGridSizeXY, z: roomGridSizeZ })}            
L ${project({ x: 0, y: roomGridSizeXY })}            
M ${project({ x: 0, y: 0, z: roomGridSizeZ })}            
L 0, 0            
`;

type RoomSvgProps<RoomId extends string> = {
  roomGridPositionSpec: RoomGridPositionSpec<RoomId>;
  campaign: Campaign<RoomId>;
  hasHead?: boolean;
  hasHeels?: boolean;
  hasHeadOverHeels?: boolean;
};

/** items that get rendered on the map if they are found in the room's json
 */
type NotableItem<RoomId extends string> =
  | JsonItem<"pickup", RoomId>
  | JsonItem<"teleporter", RoomId>;

export const RoomSvg = <RoomId extends string>({
  roomGridPositionSpec: { boundaries, roomId, subRoomId },
  campaign,
  hasHead,
  hasHeels,
  hasHeadOverHeels,
}: RoomSvgProps<RoomId>) => {
  const room = campaign.rooms[roomId];
  const { id, roomAbove } = campaign.rooms[roomId];

  // find some notable items:
  const mappableItems = useMemo<Array<NotableItem<RoomId>>>(() => {
    // TODO: don't include if already collected!

    const inRoomJson = iterate(objectValues(room.items)).filter(
      (item): item is NotableItem<RoomId> =>
        jsonItemIsInSubRoom(item, subRoomId, room) &&
        (item.type === "teleporter" ||
          (item.type === "pickup" && item.config.gives !== "scroll")),
    );

    return [...inRoomJson];
  }, [room, subRoomId]);

  return (
    <g
      data-room-id={id}
      strokeWidth={3}
      strokeLinecap="round"
      className="[--scale:2]"
    >
      <path className="fill-white" d={floorFillPathD} />
      {roomAbove && (
        // walls
        <>
          <path className="fill-midGrey" d={awayWallFillPathD} />
          <path className="fill-lightGrey" d={leftWallFillPathD} />
        </>
      )}

      {/* boundary lines */}
      <g className="fill-transparent stroke-midGreyHalfbrite">
        <path // right
          d={`M ${project({ x: 0, y: roomGridSizeXY })} L 0, 0`}
          data-direction="right"
          data-boundary={boundaries.right}
          strokeDasharray={boundaryDasharrays[boundaries.right]}
        />
        <path // left
          d={`M ${project({ x: roomGridSizeXY, y: 0 })} L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}`}
          data-direction="left"
          data-boundary={boundaries.left}
          strokeDasharray={boundaryDasharrays[boundaries.left]}
        />
        <path // towards
          d={`M ${project({ x: roomGridSizeXY, y: 0 })} L 0, 0`}
          data-direction="towards"
          data-boundary={boundaries.towards}
          strokeDasharray={boundaryDasharrays[boundaries.towards]}
        />
        <path // away
          d={`M ${project({ x: 0, y: roomGridSizeXY })} L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}`}
          data-direction="away"
          data-boundary={boundaries.away}
          strokeDasharray={boundaryDasharrays[boundaries.away]}
        />
      </g>

      {/* characters */}
      {hasHead && (
        <foreignObject
          x={-28}
          y={-68}
          className="sprite texture-head.walking.right.2 [--scale:2.5]"
        ></foreignObject>
      )}
      {hasHeels && (
        <foreignObject
          x={-28}
          y={-68}
          className="sprite texture-heels.walking.right.2 [--scale:2.5]"
        ></foreignObject>
      )}
      <g>
        {!hasHead &&
          !hasHeels &&
          !hasHeadOverHeels &&
          mappableItems.map((item, i) => {
            return (
              <foreignObject
                key={i}
                x={-24}
                y={-48}
                className={`sprite [--scale:1.5] ${
                  item.type === "teleporter" ? "texture-teleporter"
                  : (
                    item.config.gives === "extra-life" ||
                    item.config.gives === "fast" ||
                    item.config.gives === "jumps" ||
                    item.config.gives === "shield"
                  ) ?
                    "texture-whiteRabbit"
                  : item.config.gives === "doughnuts" ? "texture-doughnuts"
                  : item.config.gives === "hooter" ? "texture-hooter"
                  : item.config.gives === "bag" ? "texture-bag"
                  : item.config.gives === "reincarnation" ?
                    "texture-animated-fish"
                  : item.config.gives === "crown" ? "texture-crown.blacktooth"
                  : "texture-block.organic"
                } `}
              />
            );
          })}
      </g>

      {roomAbove && (
        // vertical lines
        <path
          className="fill-transparent stroke-midGreyHalfbrite"
          d={highRoomVerticalLinesPathD}
        />
      )}
    </g>
  );
};
