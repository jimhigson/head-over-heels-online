import { lengthXy } from "../../../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../../../../render/projectToScreen";
import {
  roomBack,
  doorwayGap,
  roomFront,
  roomGridSizeXY,
  roomGridSizeZ,
} from "./mapConstants";
import type { Boundaries, RoomGridPositionSpec } from "./roomGridPositions";
import { roundForSvg, project } from "./svgHelpers";
import { PlayableItemInRoom } from "./NotableItem";
import {
  InPlayItemsInRoomLayout,
  NotableJsonItemsInRoomLayout,
} from "./ItemsInRoomLayout";
import type { RoomJson } from "../../../../../../model/RoomJson";
import type { RoomPickupsCollected } from "../../../../../gameState/GameState";
import { roomAccentColourClass } from "./mapColours";
import { VisitedFootprint } from "./VisitedFootprint";
import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import type { PlayableItem } from "../../../../../physics/itemPredicates";
import { useNotableItems } from "./useNotableItems";

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

type RoomSvgProps<RoomId extends string> = {
  roomGridPositionSpec: RoomGridPositionSpec<RoomId>;
  roomJson: RoomJson<RoomId, string>;
  roomVisited: boolean;
  headItemInRoom?: PlayableItem<"head", RoomId>;
  heelsItemInRoom?: PlayableItem<"heels", RoomId>;
  headOverHeelsItemInRoom?: PlayableItem<"headOverHeels", RoomId>;
  roomPickupsCollected: RoomPickupsCollected;
  onPlayableClick?: (name: IndividualCharacterName) => void;
  currentCharacterName: CharacterName;
};

export const RoomSvg = <RoomId extends string>({
  roomGridPositionSpec: { boundaries, subRoomId },
  roomPickupsCollected,
  roomJson,
  roomVisited,
  headItemInRoom,
  heelsItemInRoom,
  headOverHeelsItemInRoom,
  currentCharacterName,
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
    <g
      data-room-id={id}
      strokeWidth={strokeWidth}
      className={roomAccentColourClass(color)}
    >
      {
        roomBelow === undefined ?
          <>
            // whole floor in colour
            <path className="fill-[var(--roomHintColor)]" d={floorFillPathD} />
            <path className="fill-white" d={floorPathFillPathD(boundaries)} />
          </>
          //or outline of room with a hole:
        : <>
            <path
              className="fill-[var(--roomHintColor)]"
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

      {roomJson.id === "blacktooth11" ?
        // everyone loves this room, so a set piece to keep the map interesting:
        <path
          className="fill-[var(--roomHintColor)]"
          d={`
M${project({ x: roomFront, y: roomFront })}
L${project({ x: roomBack, y: roomFront })}
L${project({ x: roomBack, y: roomFront - strokeWidth * 2 })}
L${project({ x: roomFront, y: roomFront - strokeWidth * 2 })}
z
M${project({ x: roomFront, y: roomBack })}
L${project({ x: roomBack, y: roomBack })}
L${project({ x: roomBack, y: roomBack + strokeWidth * 2 })}
L${project({ x: roomFront, y: roomBack + strokeWidth * 2 })}
z
`}
        />
      : roomJson.id === "moonbase20" || roomJson.id === "moonbase23" ?
        <path
          className={"stroke-[var(--roomHintColor)]"}
          strokeWidth={strokeWidth * 2}
          d={`
M${project({ x: roomFront, y: roomGridSizeXY / 2 })}
L${project({ x: roomBack, y: roomGridSizeXY / 2 })}

M${project({ x: roomGridSizeXY / 2, y: roomFront })}
L${project({ x: roomBack, y: roomGridSizeXY / 2 })}

M${project({ x: roomGridSizeXY / 2, y: roomBack })}
L${project({ x: roomBack, y: roomGridSizeXY / 2 })}
`}
        />
      : null}
      {roomAbove && (
        // walls
        <>
          {/* away wall: */}
          <path
            className="fill-[var(--roomHintColorDarker)]"
            fillRule="evenodd"
            d={awayWallFillPathD(boundaries.away === "doorway")}
          />
          {/* left wall is just the away wall flipped: */}
          <path
            className="fill-[var(--roomHintColor)]"
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
        <VisitedFootprint className="fill-[var(--roomHintColor)]" />
      )}
      {/* characters */}
      {headItemInRoom && heelsItemInRoom ?
        // both in room but not in symbiosis:

        <InPlayItemsInRoomLayout
          roomJson={roomJson}
          currentCharacterName={currentCharacterName as IndividualCharacterName}
          headItemInRoom={headItemInRoom}
          heelsItemInRoom={heelsItemInRoom}
          onClick={onPlayableClick}
        />
      : headItemInRoom ?
        <PlayableItemInRoom
          characterName="head"
          isCurrent={currentCharacterName === "head"}
          onlyPlayableInRoom
          facing={headItemInRoom.state.facing}
          yAdjust={-8}
          onClick={onPlayableClick}
        />
      : heelsItemInRoom ?
        <PlayableItemInRoom
          characterName="heels"
          isCurrent={currentCharacterName === "heels"}
          onlyPlayableInRoom
          facing={heelsItemInRoom.state.facing}
          yAdjust={-8}
          onClick={onPlayableClick}
        />
      : headOverHeelsItemInRoom ?
        <>
          <PlayableItemInRoom
            characterName="heels"
            onlyPlayableInRoom={false}
            facing={headOverHeelsItemInRoom.state.facing}
            yAdjust={-16}
            isCurrent
          />
          <PlayableItemInRoom
            characterName="head"
            onlyPlayableInRoom={false}
            facing={headOverHeelsItemInRoom.state.facing}
            isCurrent
            yAdjust={-36}
          />
        </>
      : <NotableJsonItemsInRoomLayout
          roomJson={roomJson}
          subRoomId={subRoomId}
          items={notableItems}
        />
      }
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
