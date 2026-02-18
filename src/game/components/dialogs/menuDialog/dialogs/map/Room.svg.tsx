import { range } from "iter-tools-es";

import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import type { RoomJson } from "../../../../../../model/RoomJson";
import type { RoomPickupsCollected } from "../../../../../gameState/GameState";
import type { PlayableItem } from "../../../../../physics/itemPredicates";
import type { Boundaries, RoomGridPositionSpec } from "./roomGridPositions";

import { hudLowercaseCharTextureSize } from "../../../../../../sprites/spritesheet/spritesheetData/textureSizes";
import { iterate } from "../../../../../../utils/iterate";
import { addXy, lengthXy } from "../../../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../../../../render/projections";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import {
  InPlayItemsInRoomLayout,
  NotableJsonItemsInRoomLayout,
} from "./ItemsInRoomLayout";
import { roomAccentColourClass } from "./mapColours";
import {
  doorwayGap,
  roomBack,
  roomFront,
  roomGridSizeXY,
  roomGridSizeZ,
} from "./mapConstants";
import { PlayableItemInRoom } from "./NotableItem";
import { roomWorldPosition } from "./roomWorldPosition";
import { project, roundForSvg, translateXyz } from "./svgHelpers";
import { useNotableItems } from "./useNotableItems";
import { VisitedFootprint } from "./VisitedFootprint";

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

const spikyN = 4;
const deadlyFloorPathD: string = iterate(range(spikyN))
  .map(
    (i) => `
M${project({ x: roomGridSizeXY * ((i + 0.5) / spikyN), y: 0 })}
L${project({ x: roomGridSizeXY * ((i + 0.5) / spikyN), y: roomGridSizeXY })}`,
  )
  .toArray()
  .join("");

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

const highRoomBackVerticalLinesPathD = `            
M${project({ x: roomGridSizeXY, y: roomGridSizeXY, z: roomGridSizeZ })}            
L${project({ x: roomGridSizeXY, y: roomGridSizeXY })}            
M${project({ x: roomGridSizeXY, y: 0, z: roomGridSizeZ })}            
L${project({ x: roomGridSizeXY, y: 0 })}            
M${project({ x: 0, y: roomGridSizeXY, z: roomGridSizeZ })}            
L${project({ x: 0, y: roomGridSizeXY })}            
`;
const highRoomFrontVerticalLinesPathD = `            
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
  onRoomClick?: (roomId: RoomId) => void;
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
  onRoomClick,
}: RoomSvgProps<RoomId>) => {
  const { id, roomAbove, color, items } = roomJson;
  const label = roomJson.meta?.label;
  const highlightOnHover = onRoomClick !== undefined;

  // find some notable items:
  const notableItems = useNotableItems(
    roomJson,
    roomPickupsCollected,
    subRoomId,
  );

  const floors = Object.values(items).filter((item) => item.type === "floor");
  const noFloor = floors.every((floor) => floor.config.floorType === "none");
  const deadlyFloor = floors.some(
    (floor) => floor.config.floorType === "deadly",
  );

  return (
    <g
      data-room-id={id}
      strokeWidth={strokeWidth}
      className={`
        ${roomAccentColourClass(color)} 
        ${
          highlightOnHover ?
            `
            group/room
            hover:[--roomHintColor:theme(colors.midRed)] 
            zx:hover:[--roomHintColor:theme(colors.zxRed)]`
          : ""
        }
        `}
    >
      {noFloor ?
        <>
          {/* show a floor outlining the room with a hole: */}
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
      : <>
          {/* whole floor in colour */}
          <path className="fill-[var(--roomHintColor)]" d={floorFillPathD} />
          {/* white in the middle w/ to doors */}
          <path
            className={`fill-white
              ${
                highlightOnHover ?
                  `
                  group-hover/room:fill-pastelBlue
                  zx:group-hover/room:fill-zxCyan`
                : ""
              }
            `}
            d={floorPathFillPathD(boundaries)}
          />
          {deadlyFloor && (
            <path
              className="stroke-[var(--roomHintColor)]"
              strokeDasharray="1, 12.4"
              d={deadlyFloorPathD}
            />
          )}
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
      : roomJson.id === "blacktooth77" || roomJson.id === "safari26" ?
        <path
          className={"fill-[var(--roomHintColor)]"}
          strokeWidth={1}
          d={`
M${project({ x: roomGridSizeXY / 2 - strokeWidth, y: 0 })}
L${project({ x: roomGridSizeXY / 2 + strokeWidth, y: 0 })}
L${project({ x: roomGridSizeXY / 2 + strokeWidth, y: roomGridSizeXY })}
L${project({ x: roomGridSizeXY / 2 - strokeWidth, y: roomGridSizeXY })}
z
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

      {roomAbove && (
        // vertical lines
        <path
          className="fill-transparent stroke-midGreyHalfbrite"
          d={highRoomBackVerticalLinesPathD}
        />
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
          d={highRoomFrontVerticalLinesPathD}
        />
      )}
      {label && (
        <g
          transform={translateXyz(
            // + 0.5, 0.5 to make relative to the centre of the current room
            roomWorldPosition(addXy(label.gridOffset, { x: 0.5, y: 0.5 })),
          )}
        >
          <foreignObject
            width={label.text.length * 16}
            height={hudLowercaseCharTextureSize.h * 2}
            y={-8}
            x={label.align === "left" ? 0 : label.text.length * -16}
          >
            {/* css variables because Safari doesn't propagate correctly into
                foreign objects */}
            <BitmapText noTint className="[--scale:2] [--block:16px]">
              {label.text}
            </BitmapText>
          </foreignObject>
        </g>
      )}
      {onRoomClick ?
        // add a transparent area over the whole floor if we need to handle clicks.
        // otherwise, the rendering above is too complex to handle this
        <path
          className="fill-transparent cursor-pointer"
          d={floorFillPathD}
          onClick={() => {
            onRoomClick(id);
          }}
        />
      : null}
    </g>
  );
};
