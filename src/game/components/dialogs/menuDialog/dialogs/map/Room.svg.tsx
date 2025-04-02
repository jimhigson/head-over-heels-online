import { useMemo } from "react";
import { lengthXy } from "../../../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import { roomGridSizeXY, roomGridSizeZ } from "./mapConstants";
import { iterate } from "../../../../../../utils/iterate";
import { objectValues } from "iter-tools";
import type { Boundaries, RoomGridPositionSpec } from "./roomGridPositions";
import type { Campaign } from "../../../../../../model/modelTypes";
import type { ZxSpectrumRoomColour } from "../../../../../../originalGame";
import { roundForSvg, project } from "./svgHelpers";
import type { NotableItem } from "./NotableItem";
import { NotableItemSvg, SpriteInRoom } from "./NotableItem";
import { jsonItemIsNotable } from "./jsonItemIsNotable";

const doorwayGap = 0.6;

const boundaryLineLength = lengthXy(
  projectWorldXyzToScreenXy({ x: roomGridSizeXY, y: 0 }),
);

const boundaryDashArrays = {
  wall: undefined,
  open: "0,999",
  doorway: `${roundForSvg(boundaryLineLength * ((1 - doorwayGap) / 2))}, ${roundForSvg(boundaryLineLength * doorwayGap)}, 999`,
};

const floorFillPathD = `
M ${project({ x: 0, y: 0 })}
L ${project({ x: 0, y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY, y: 0 })}
z`;

const floorColourFillPathD = (boundaries: Boundaries) => {
  const front = roomGridSizeXY * ((1 - doorwayGap) / 2);
  const back = roomGridSizeXY - front;
  const smallSquareSize = front;

  const awayOpen = boundaries.away !== "wall";
  const towardsOpen = boundaries.towards !== "wall";
  const leftOpen = boundaries.left !== "wall";
  const rightOpen = boundaries.right !== "wall";

  const away = awayOpen ? roomGridSizeXY : back;
  const towards = towardsOpen ? 0 : front;
  const left = leftOpen ? roomGridSizeXY : back;
  const right = rightOpen ? 0 : front;

  let shape = `
M ${project({})}
L ${project({ y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY })}
M ${project({ x: right, y: towards })}
L ${project({ x: right, y: away })}
L ${project({ x: left, y: away })}
L ${project({ x: left, y: towards })}
L ${project({ x: right, y: towards })}
z`;

  const smallSquareLines = `
l ${project({ x: smallSquareSize })}
l ${project({ y: smallSquareSize })}
l ${project({ x: -smallSquareSize })}
z`;

  if (towardsOpen && rightOpen) {
    shape += `
M 0, 0    
${smallSquareLines}`;
  }

  if (rightOpen && awayOpen) {
    shape += `
M ${project({ y: back })}
${smallSquareLines}`;
  }

  if (awayOpen && leftOpen) {
    shape += `
M ${project({ x: back, y: back })}    
${smallSquareLines}`;
  }

  if (leftOpen && towardsOpen) {
    shape += `
M ${project({ x: back })}    
${smallSquareLines}`;
  }

  return shape;
};

const awayWallFillPathD = (withDoorWay: boolean) => {
  const wall = `
M ${project({ x: 0, y: roomGridSizeXY })}
L ${project({ x: 0, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
z
`;

  if (!withDoorWay) {
    return wall;
  }

  // cut a doorway into the wall
  const front = roomGridSizeXY * ((1 - doorwayGap) / 2);
  const back = roomGridSizeXY - front;
  return (
    wall +
    `
M ${project({ x: front, y: roomGridSizeXY })}
L ${project({ x: front, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: back, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: back, y: roomGridSizeXY })}
L ${project({ x: front, y: roomGridSizeXY })}
  `
  );
};

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
  hasHead?: false | "active" | "present";
  hasHeels?: false | "active" | "present";
  hasHeadOverHeels?: false | "active" | "present";
};

const roomAccentColourClass = (color: ZxSpectrumRoomColour) => {
  switch (color.hue) {
    case "cyan":
      return "fill-pastelBlue zx:fill-zxCyan";
    case "green":
      return "fill-moss zx:fill-zxGreen";
    case "magenta":
      return "fill-pink zx:fill-zxMagenta";
    case "white":
      return "fill-lightGrey zx:fill-zxWhite";
    case "yellow":
      return "fill-highlightBeige zx:fill-zxYellow";
    default:
      color.hue satisfies never;
  }
};

export const RoomSvg = <RoomId extends string>({
  roomGridPositionSpec: { boundaries, roomId, subRoomId },
  campaign,
  hasHead,
  hasHeels,
  hasHeadOverHeels,
}: RoomSvgProps<RoomId>) => {
  const room = campaign.rooms[roomId];
  const { id, roomAbove, roomBelow, color } = campaign.rooms[roomId];

  // find some notable items:
  const mappableItems = useMemo<Array<NotableItem<RoomId>>>(() => {
    const inRoomJson = iterate(objectValues(room.items)).filter((item) =>
      jsonItemIsNotable(item, subRoomId, room),
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
      {/* floor */}
      {roomBelow || <path className="fill-white" d={floorFillPathD} />}
      <path
        className={roomAccentColourClass(color)}
        fillRule="evenodd"
        d={floorColourFillPathD(boundaries)}
      />

      {roomAbove && (
        // walls
        <>
          {/* away wall: */}
          <path
            className="fill-midGrey"
            fillRule="evenodd"
            d={awayWallFillPathD(boundaries.away === "doorway")}
          />
          {/* left wall is just the away wall flipped: */}
          <path
            className="fill-lightGrey"
            fillRule="evenodd"
            transform="scale(-1, 1)"
            d={awayWallFillPathD(boundaries.left === "doorway")}
          />
        </>
      )}

      {/* boundary lines */}
      <g className="fill-transparent stroke-midGreyHalfbrite">
        <path // right
          d={`M ${project({ x: 0, y: roomGridSizeXY })} L 0, 0`}
          data-direction="right"
          data-boundary={boundaries.right}
          strokeDasharray={boundaryDashArrays[boundaries.right]}
        />
        <path // left
          d={`M ${project({ x: roomGridSizeXY, y: 0 })} L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}`}
          data-direction="left"
          data-boundary={boundaries.left}
          strokeDasharray={boundaryDashArrays[boundaries.left]}
        />
        <path // towards
          d={`M ${project({ x: roomGridSizeXY, y: 0 })} L 0, 0`}
          data-direction="towards"
          data-boundary={boundaries.towards}
          strokeDasharray={boundaryDashArrays[boundaries.towards]}
        />
        <path // away
          d={`M ${project({ x: 0, y: roomGridSizeXY })} L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}`}
          data-direction="away"
          data-boundary={boundaries.away}
          strokeDasharray={boundaryDashArrays[boundaries.away]}
        />
      </g>

      {/* characters */}
      <g className="[--scale:2.5]">
        {hasHead && (
          <SpriteInRoom
            className={
              hasHead === "active" ?
                "texture-animated-head.walking.right"
              : "texture-animated-head.idle.right"
            }
          />
        )}
        {hasHeels && (
          <SpriteInRoom
            className={
              hasHeels === "active" ?
                "texture-animated-heels.walking.right"
              : "texture-heels.walking.right.2"
            }
          />
        )}
      </g>
      {hasHeadOverHeels && (
        <g className="[--scale:1.5]">
          <SpriteInRoom className="texture-animated-heels.walking.right" />
          <g transform="translate(0, -20)">
            <SpriteInRoom className="texture-animated-head.walking.right" />
          </g>
        </g>
      )}
      <g className="[--scale:2]">
        {!hasHead &&
          !hasHeels &&
          !hasHeadOverHeels &&
          mappableItems.map((item, i) => (
            <NotableItemSvg key={i} notableItem={item} />
          ))}
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
