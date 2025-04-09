import { useMemo } from "react";
import { lengthXy } from "../../../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import {
  roomBack,
  doorwayGap,
  roomFront,
  roomGridSizeXY,
  roomGridSizeZ,
} from "./mapConstants";
import { iterate } from "../../../../../../utils/iterate";
import { objectEntries } from "iter-tools";
import type { Boundaries, RoomGridPositionSpec } from "./roomGridPositions";
import { roundForSvg, project } from "./svgHelpers";
import type { NotableItem } from "./NotableItem";
import { NotableItemSvg, SpriteInRoom } from "./NotableItem";
import { ItemInRoomLayout } from "./NotableItemsCollection";
import { jsonItemIsNotable } from "./jsonItemIsNotable";
import type { RoomJson } from "../../../../../../model/RoomJson";
import type { RoomPickupsCollected } from "../../../../../gameState/GameState";
import { roomAccentColourClass } from "./mapColours";
import { VisitedFootprint } from "./VisitedFootprint";

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

const floorEdgeFillPathD = (boundaries: Boundaries, thickness = doorwayGap) => {
  const roomFront = roomGridSizeXY * ((1 - thickness) / 2);
  const roomBack = roomGridSizeXY - roomFront;

  const smallSquareSize = roomFront;

  const awayOpen = boundaries.away !== "wall";
  const towardsOpen = boundaries.towards !== "wall";
  const leftOpen = boundaries.left !== "wall";
  const rightOpen = boundaries.right !== "wall";

  const away = awayOpen ? roomGridSizeXY : roomBack;
  const towards = towardsOpen ? 0 : roomFront;
  const left = leftOpen ? roomGridSizeXY : roomBack;
  const right = rightOpen ? 0 : roomFront;

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
M ${project({ y: roomBack })}
${smallSquareLines}`;
  }

  if (awayOpen && leftOpen) {
    shape += `
M ${project({ x: roomBack, y: roomBack })}    
${smallSquareLines}`;
  }

  if (leftOpen && towardsOpen) {
    shape += `
M ${project({ x: roomBack })}    
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

  return (
    wall +
    `
M ${project({ x: roomFront, y: roomGridSizeXY })}
L ${project({ x: roomFront, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: roomBack, y: roomGridSizeXY, z: roomGridSizeZ })}
L ${project({ x: roomBack, y: roomGridSizeXY })}
L ${project({ x: roomFront, y: roomGridSizeXY })}
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

const useNotableItems = <RoomId extends string>(
  roomJson: RoomJson<RoomId, string>,
  roomPickupsCollected: RoomPickupsCollected,
  subRoomId: string,
) => {
  return useMemo<Array<NotableItem<RoomId>>>(() => {
    let foundHushPuppy = false;
    let foundTeleporter = false;
    let foundCrown = false;

    const nonCollectedNotableItemsItr = iterate(objectEntries(roomJson.items))
      .filter(([itemId]) => !roomPickupsCollected[itemId])
      .map(([_, item]) => item)
      .filter((item) => {
        // only allow one hush puppy/teleporter to be found - the map doesn't
        // need to show multiple of them in a room
        if (item.type === "hushPuppy") {
          if (foundHushPuppy) {
            return false;
          }
          foundHushPuppy = true;
        }
        if (item.type === "teleporter") {
          if (foundTeleporter) {
            return false;
          }
          foundTeleporter = true;
        }
        if (item.type === "pickup" && item.config.gives === "crown") {
          if (foundCrown) {
            return false;
          }
          foundCrown = true;
        }
        return true;
      })
      .filter((item) => jsonItemIsNotable(item, subRoomId, roomJson));

    return [...nonCollectedNotableItemsItr];
  }, [roomJson, roomPickupsCollected, subRoomId]);
};

type RoomSvgProps<RoomId extends string> = {
  roomGridPositionSpec: RoomGridPositionSpec<RoomId>;
  roomJson: RoomJson<RoomId, string>;
  roomVisited: boolean;
  hasHead?: false | "active" | "present";
  hasHeels?: false | "active" | "present";
  hasHeadOverHeels?: false | "active" | "present";
  roomPickupsCollected: RoomPickupsCollected;
};

export const RoomSvg = <RoomId extends string>({
  roomGridPositionSpec: { boundaries, subRoomId },
  roomPickupsCollected,
  roomJson,
  roomVisited,
  hasHead,
  hasHeels,
  hasHeadOverHeels,
}: RoomSvgProps<RoomId>) => {
  const { id, roomAbove, roomBelow, color } = roomJson;

  // find some notable items:
  const notableItems = useNotableItems(
    roomJson,
    roomPickupsCollected,
    subRoomId,
  );

  return (
    <g data-room-id={id} strokeWidth={3} className="[--scale:2]">
      {/* floor */}
      {roomBelow === undefined ?
        <path className="fill-white" d={floorFillPathD} />
      : <path
          className="fill-white"
          fillRule="evenodd"
          d={floorEdgeFillPathD(boundaries, doorwayGap * 0.7)}
        />
      }
      {/* colourful floor edge  */}
      <path
        className={roomAccentColourClass(color).floor}
        fillRule="evenodd"
        d={floorEdgeFillPathD(boundaries)}
      />

      {roomAbove && (
        // walls
        <>
          {/* away wall: */}
          <path
            className={roomAccentColourClass(color).awayWall}
            fillRule="evenodd"
            d={awayWallFillPathD(boundaries.away === "doorway")}
          />
          {/* left wall is just the away wall flipped: */}
          <path
            className={roomAccentColourClass(color).floor}
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

      {roomVisited && (
        <VisitedFootprint className={`${roomAccentColourClass(color).floor}`} />
      )}

      {/* characters */}
      <ItemInRoomLayout heightAdjust={14}>
        {hasHead && (
          <SpriteInRoom
            className={`${hasHeels ? "[--scale:1.5]" : "[--scale:2.5]"} ${
              hasHead === "active" ?
                "texture-animated-head.walking.right"
              : "texture-animated-head.idle.right"
            }`}
            scrollTo={hasHead === "active"}
          />
        )}
        {hasHeels && (
          <SpriteInRoom
            className={`${hasHead ? "[--scale:1.5]" : "[--scale:2.5]"} ${
              hasHeels === "active" ?
                "texture-animated-heels.walking.right"
              : "texture-heels.walking.right.2"
            }`}
            scrollTo={hasHeels === "active"}
          />
        )}
      </ItemInRoomLayout>
      {hasHeadOverHeels && (
        <g transform="translate(0,-16)" className="[--scale:1.5]">
          <SpriteInRoom className="texture-animated-heels.walking.right" />
          <g transform="translate(0, -20)">
            <SpriteInRoom
              // headOverHeels is always active (if they exist)
              className="texture-animated-head.walking.right"
              scrollTo
            />
          </g>
        </g>
      )}
      {!hasHead && !hasHeels && !hasHeadOverHeels && (
        <ItemInRoomLayout heightAdjust={11}>
          {notableItems.map((item, i) => {
            const isBigItem =
              item.type === "hushPuppy" || item.type === "teleporter";

            return (
              <NotableItemSvg
                key={i}
                notableItem={item}
                className={isBigItem ? "[--scale:1.25]" : "[--scale:1.5]"}
              />
            );
          })}
        </ItemInRoomLayout>
      )}

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
