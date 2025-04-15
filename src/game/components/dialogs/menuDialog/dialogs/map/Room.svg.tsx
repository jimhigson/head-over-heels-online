import { useMemo } from "react";
import type { DirectionXy8 } from "../../../../../../utils/vectors/vectors";
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
import { playableTailwindSpriteClassname } from "../../../../tailwindSprites/PlayableTailwindSprite";
import type { IndividualCharacterName } from "../../../../../../model/modelTypes";

const strokeWidth = 3;

const boundaryLineLength = lengthXy(
  projectWorldXyzToScreenXy({ x: roomGridSizeXY, y: 0 }),
);

const boundaryDashArrays = {
  wall: undefined,
  open: "0,999",
  doorway: `${roundForSvg(boundaryLineLength * ((1 - doorwayGap) / 2) - strokeWidth / 2)}, ${roundForSvg(boundaryLineLength * doorwayGap + strokeWidth)}, 999`,
};

const floorFillPathD = `
M ${project({})}
L ${project({ y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
L ${project({ x: roomGridSizeXY })}
z`;

const floorPathFillPathD = (
  boundaries: Boundaries,
  pathThickness = doorwayGap,
) => {
  const roomFront = roomGridSizeXY * ((1 - pathThickness) / 2);
  const roomBack = roomGridSizeXY - roomFront;

  const awayOpen = boundaries.away !== "wall";
  const towardsOpen = boundaries.towards !== "wall";
  const leftOpen = boundaries.left !== "wall";
  const rightOpen = boundaries.right !== "wall";

  let shape = `M${project({ x: roomFront, y: roomFront })}`;

  if (rightOpen)
    shape += `L${project({ x: 0, y: roomFront })} L${project({ x: 0, y: roomBack })}`;

  shape += `L${project({ x: roomFront, y: roomBack })}`;

  if (awayOpen)
    shape += `L${project({ x: roomFront, y: roomGridSizeXY })} L${project({ x: roomBack, y: roomGridSizeXY })}`;

  shape += `L${project({ x: roomBack, y: roomBack })}`;

  if (leftOpen)
    shape += `L${project({ x: roomGridSizeXY, y: roomBack })} L${project({ x: roomGridSizeXY, y: roomFront })}`;

  shape += `L${project({ x: roomBack, y: roomFront })}`;
  if (towardsOpen)
    shape += `L${project({ x: roomBack, y: 0 })} L${project({ x: roomFront, y: 0 })}`;

  shape += "z";

  return shape;
};

const awayWallFillPathD = (withDoorWay: boolean) => {
  const wall = `
M${project({ x: 0, y: roomGridSizeXY })}
L${project({ x: 0, y: roomGridSizeXY, z: roomGridSizeZ })}
L${project({ x: roomGridSizeXY, y: roomGridSizeXY, z: roomGridSizeZ })}
L${project({ x: roomGridSizeXY, y: roomGridSizeXY })}
z
`;

  if (!withDoorWay) {
    return wall;
  }

  return (
    wall +
    `
M${project({ x: roomFront, y: roomGridSizeXY })}
L${project({ x: roomFront, y: roomGridSizeXY, z: roomGridSizeZ })}
L${project({ x: roomBack, y: roomGridSizeXY, z: roomGridSizeZ })}
L${project({ x: roomBack, y: roomGridSizeXY })}
L${project({ x: roomFront, y: roomGridSizeXY })}`
  );
};

const highRoomVerticalLinesPathD = `            
M${project({ x: roomGridSizeXY, y: roomGridSizeXY, z: roomGridSizeZ })}            
L${project({ x: roomGridSizeXY, y: roomGridSizeXY })}            
M${project({ x: roomGridSizeXY, y: 0, z: roomGridSizeZ })}            
L${project({ x: roomGridSizeXY, y: 0 })}            
M${project({ x: 0, y: roomGridSizeXY, z: roomGridSizeZ })}            
L${project({ x: 0, y: roomGridSizeXY })}            
M${project({ x: 0, y: 0, z: roomGridSizeZ })}            
L0, 0            
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
  hasHead?: { current: boolean; facingXy8: DirectionXy8 };
  hasHeels?: { current: boolean; facingXy8: DirectionXy8 };
  hasHeadOverHeels?: { facingXy8: DirectionXy8 };
  roomPickupsCollected: RoomPickupsCollected;
  onPlayableClick?: (name: IndividualCharacterName) => void;
};

export const RoomSvg = <RoomId extends string>({
  roomGridPositionSpec: { boundaries, subRoomId },
  roomPickupsCollected,
  roomJson,
  roomVisited,
  hasHead,
  hasHeels,
  hasHeadOverHeels,
  onPlayableClick,
}: RoomSvgProps<RoomId>) => {
  const { id, roomAbove, roomBelow, color } = roomJson;

  // find some notable items:
  const notableItems = useNotableItems(
    roomJson,
    roomPickupsCollected,
    subRoomId,
  );

  return (
    <g data-room-id={id} strokeWidth={strokeWidth} className="[--scale:2]">
      {
        roomBelow === undefined ?
          <>
            // whole floor in colour
            <path
              className={roomAccentColourClass(color).floor}
              d={floorFillPathD}
            />
            <path className="fill-white" d={floorPathFillPathD(boundaries)} />
          </>
          //or outline of room with a hole:
        : <>
            <path
              className={roomAccentColourClass(color).floor}
              fillRule="evenodd"
              // whole tile, then use evenodd to cut out the middle:
              d={`${floorFillPathD} ${floorPathFillPathD(boundaries)}`}
            />
            <path
              className="fill-white"
              fillRule="evenodd"
              // whole tile, then use evenodd to cut out the middle:
              d={`${floorPathFillPathD(boundaries)} ${floorPathFillPathD(boundaries, doorwayGap * 0.7)}`}
            />
          </>

      }

      {roomJson.id === "blacktooth11" && (
        // everyone loves this room, so a set piece to keep the map interesting:
        <path
          className={roomAccentColourClass(color).floor}
          d={`
M${project({ x: roomFront, y: roomFront })} L${project({ x: roomFront, y: roomBack })} L${project({ x: roomFront - strokeWidth, y: roomBack })} L${project({ x: roomFront - strokeWidth, y: roomFront })} z
M${project({ x: roomBack, y: roomFront })} L${project({ x: roomBack, y: roomBack })} L${project({ x: roomBack + strokeWidth, y: roomBack })} L${project({ x: roomBack + strokeWidth, y: roomFront })} z
`}
        />
      )}

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
          d={`M${project({ x: 0, y: roomGridSizeXY })} L0, 0`}
          data-direction="right"
          data-boundary={boundaries.right}
          strokeDasharray={boundaryDashArrays[boundaries.right]}
        />
        <path // left
          d={`M${project({ x: roomGridSizeXY, y: 0 })} L${project({ x: roomGridSizeXY, y: roomGridSizeXY })}`}
          data-direction="left"
          data-boundary={boundaries.left}
          strokeDasharray={boundaryDashArrays[boundaries.left]}
        />
        <path // towards
          d={`M${project({ x: roomGridSizeXY, y: 0 })} L0, 0`}
          data-direction="towards"
          data-boundary={boundaries.towards}
          strokeDasharray={boundaryDashArrays[boundaries.towards]}
        />
        <path // away
          d={`M${project({ x: 0, y: roomGridSizeXY })} L${project({ x: roomGridSizeXY, y: roomGridSizeXY })}`}
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
            className={`${hasHeels ? "[--scale:1.5]" : "[--scale:2.5]"}
              ${playableTailwindSpriteClassname({
                character: "head",
                action: hasHead.current ? "walking" : "idle",
                facingXy8: hasHead.facingXy8,
              })}`}
            scrollTo={hasHead.current}
            onClick={(e) => {
              onPlayableClick?.("head");
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        )}
        {hasHeels && (
          <SpriteInRoom
            className={`${hasHead ? "[--scale:1.5]" : "[--scale:2.5]"}
            ${playableTailwindSpriteClassname({
              character: "heels",
              action: hasHeels.current ? "walking" : "idle",
              facingXy8: hasHeels.facingXy8,
            })}`}
            scrollTo={hasHeels.current}
            onClick={(e) => {
              onPlayableClick?.("heels");
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        )}
      </ItemInRoomLayout>
      {hasHeadOverHeels && (
        <g transform="translate(0,-16)" className="[--scale:1.5]">
          <SpriteInRoom
            className={playableTailwindSpriteClassname({
              character: "heels",
              action: "walking",
              facingXy8: hasHeadOverHeels.facingXy8,
            })}
          />
          <g transform="translate(0, -20)">
            <SpriteInRoom
              // headOverHeels is always active (if they exist)
              className={playableTailwindSpriteClassname({
                character: "head",
                action: "walking",
                facingXy8: hasHeadOverHeels.facingXy8,
              })}
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
