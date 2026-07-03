import { Suspense } from "preact/compat";
import { useRef } from "preact/hooks";

import {
  type Boundaries,
  type RoomNode,
} from "../../../../../../model/map/roomGridPositions";
import {
  type CharacterName,
  type IndividualCharacterName,
} from "../../../../../../model/modelTypes";
import {
  type RoomJson,
  roomVerticalLinkHolders,
} from "../../../../../../model/RoomJson";
import { hudCharTextureSize } from "../../../../../../sprites/spritesheet/spritesheetData/textureSizes";
import { valuesIter } from "../../../../../../utils/entries";
import { range } from "../../../../../../utils/iterators/range";
import {
  addXy,
  type DirectionXy4,
  lengthXy,
  type Xy,
} from "../../../../../../utils/vectors/vectors";
import { type PlayableItem } from "../../../../../physics/itemPredicates";
import { projectWorldXyzToScreenXy } from "../../../../../render/projections";
import { floorFillPathD } from "./floorFillPathD";
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
  strokeWidth,
} from "./mapConstants";
import { PlayableItemInRoom } from "./NotableItem";
import { type NotableItemsInCell } from "./notableItemsByCell";
import { RoomDecoration } from "./RoomDecoration";
import { type RoomBehaviourComponent } from "./RoomDecoratorProps";
import { roomWorldPosition } from "./roomWorldPosition";
import { project, roundForSvg, translateXyz } from "./svgHelpers";
import { VisitedFootprint } from "./VisitedFootprint";

const boundaryLineLength = lengthXy(
  projectWorldXyzToScreenXy({ x: roomGridSizeXY, y: 0 }),
);

const boundaryDashArrays = {
  wall: undefined,
  open: "0,999",
  doorway: `${roundForSvg(boundaryLineLength * ((1 - doorwayGap) / 2) - strokeWidth / 2)}, ${roundForSvg(boundaryLineLength * doorwayGap + strokeWidth)}, 999`,
};

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

  if (rightOpen) {
    shape += `L${project({ x: 0, y: roomFront })} L${project({ x: 0, y: roomBack })}`;
  }

  shape += `L${project({ x: roomFront, y: roomBack })}`;

  if (awayOpen) {
    shape += `L${project({ x: roomFront, y: roomGridSizeXY })} L${project({ x: roomBack, y: roomGridSizeXY })}`;
  }

  shape += `L${project({ x: roomBack, y: roomBack })}`;

  if (leftOpen) {
    shape += `L${project({ x: roomGridSizeXY, y: roomBack })} L${project({ x: roomGridSizeXY, y: roomFront })}`;
  }

  shape += `L${project({ x: roomBack, y: roomFront })}`;
  if (towardsOpen) {
    shape += `L${project({ x: roomBack, y: 0 })} L${project({ x: roomFront, y: 0 })}`;
  }

  shape += "z";

  return shape;
};

const spikyN = 4;
const deadlyFloorPathD: string = range(spikyN)
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

// map labels render at a fixed 2x the 8px design grid, independent of the page
// upscale (the font's em maps to the 8px grid, so font-size is grid * scale)
const mapLabelScale = 2;
const mapLabelFontSize = hudCharTextureSize.h * mapLabelScale;

const labelLayoutByDirection = {
  away: { gridOffset: { x: 0, y: 0.75 }, align: "left" },
  towards: { gridOffset: { x: 0, y: -0.75 }, align: "right" },
  left: { gridOffset: { x: 0.75, y: 0 }, align: "left" },
  right: { gridOffset: { x: -0.75, y: 0 }, align: "right" },
} as const satisfies {
  [D in DirectionXy4]: { gridOffset: Xy; align: "left" | "right" };
};

type RoomSvgProps<RoomId extends string> = {
  roomGridPositionSpec: RoomNode<RoomId>;
  roomJson: RoomJson<RoomId, string>;
  roomVisited: boolean;
  headItemInRoom?: PlayableItem<"head", RoomId>;
  heelsItemInRoom?: PlayableItem<"heels", RoomId>;
  headOverHeelsItemInRoom?: PlayableItem<"headOverHeels", RoomId>;
  notableItemsInCell?: NotableItemsInCell<RoomId>;
  onPlayableClick?: (name: IndividualCharacterName) => void;
  currentCharacterName: CharacterName;
  isCurrentRoom: boolean;
  isSelected: boolean;
  behaviours?: RoomBehaviourComponent<RoomId>[];
};

export const RoomSvg = <RoomId extends string>({
  roomGridPositionSpec: { boundaries, subRoomId },
  notableItemsInCell,
  roomJson,
  roomVisited,
  headItemInRoom,
  heelsItemInRoom,
  headOverHeelsItemInRoom,
  currentCharacterName,
  onPlayableClick,
  isCurrentRoom,
  isSelected,
  behaviours,
}: RoomSvgProps<RoomId>) => {
  const { id, color, items } = roomJson;
  const roomAbove = roomVerticalLinkHolders(roomJson).some(
    (holder) => holder.above !== undefined,
  );
  const label = roomJson.meta?.label;
  const labelLayout = label && labelLayoutByDirection[label.direction];
  const interactiveAreaRef = useRef<null | SVGPathElement>(null);
  const hasBehaviours = behaviours !== undefined && behaviours.length > 0;

  const floors = valuesIter(items)
    .filter((item) => item.type === "floor")
    .toArray();
  const noFloor = floors.every((floor) => floor.config.floorType === "none");
  const deadlyFloor = floors.some(
    (floor) => floor.config.floorType === "deadly",
  );

  return (
    <g
      data-room-id={id}
      strokeWidth={strokeWidth}
      class={`
        ${roomAccentColourClass(color)}
        ${
          isCurrentRoom ?
            `[--floorColor:theme(colors.shadow)] zx:[--floorColor:theme(colors.zxBlack)] toppy:[--floorColor:theme(colors.toppyGrey3)]`
          : isSelected ?
            `[--floorColor:theme(colors.midGrey)] zx:[--floorColor:theme(colors.zxBlueDimmed)] toppy:[--floorColor:theme(colors.toppyCool3)]`
          : `[--floorColor:theme(colors.white)]`
        }
        ${
          hasBehaviours ?
            `group/room
            hover:[--roomHintColor:theme(colors.midRed)]
            zx:hover:[--roomHintColor:theme(colors.zxRed)]
            toppy:hover:[--roomHintColor:theme(colors.toppyPink2)]`
          : ""
        }
        `}
    >
      {noFloor ?
        <>
          {/* show a floor outlining the room with a hole: */}
          <path
            class="fill-[var(--roomHintColor)]"
            fillRule="evenodd"
            // whole tile, then use evenodd to cut out the middle:
            d={`${floorFillPathD} ${floorPathFillPathD(boundaries)}`}
          />
          <path
            class="fill-[var(--floorColor)]"
            fillRule="evenodd"
            // whole tile, then use evenodd to cut out the middle:
            d={`${floorPathFillPathD(boundaries)} ${floorPathFillPathD(boundaries, doorwayGap * 0.7)}`}
          />
        </>
      : <>
          {/* whole floor in colour */}
          <path class="fill-[var(--roomHintColor)]" d={floorFillPathD} />
          {/* white in the middle w/ to doors */}
          <path
            class={`fill-[var(--floorColor)]
              ${
                !isCurrentRoom ?
                  `group-hover/room:fill-pastelBlue
                  zx:group-hover/room:fill-zxCyan
                  toppy:group-hover/room:fill-toppyCool1`
                : ""
              }
            `}
            d={floorPathFillPathD(boundaries)}
          />
          {deadlyFloor && (
            <path
              class="stroke-[var(--roomHintColor)]"
              strokeDasharray="1, 12.4"
              d={deadlyFloorPathD}
            />
          )}
        </>
      }

      {roomJson.meta?.roomDecoration && (
        <RoomDecoration decoration={roomJson.meta.roomDecoration} />
      )}
      {roomAbove && (
        // walls
        <>
          {/* away wall: */}
          <path
            class="fill-[var(--roomHintColorDarker)]"
            fillRule="evenodd"
            d={awayWallFillPathD(boundaries.away === "doorway")}
          />
          {/* left wall is just the away wall flipped: */}
          <path
            class="fill-[var(--roomHintColor)]"
            fillRule="evenodd"
            transform="scale(-1, 1)"
            d={awayWallFillPathD(boundaries.left === "doorway")}
          />
        </>
      )}
      {/* boundary lines */}
      <g class="fill-transparent stroke-midGreyHalfbrite">
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
      {roomVisited && <VisitedFootprint class="fill-[var(--roomHintColor)]" />}

      {roomAbove && (
        // vertical lines
        <path
          class="fill-transparent stroke-midGreyHalfbrite"
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
      : notableItemsInCell ?
        <NotableJsonItemsInRoomLayout
          items={notableItemsInCell.items}
          positions={notableItemsInCell.positions}
        />
      : null}
      {roomAbove && (
        // vertical lines
        <path
          class="fill-transparent stroke-midGreyHalfbrite"
          d={highRoomFrontVerticalLinesPathD}
        />
      )}
      {label && labelLayout && (
        <g
          transform={translateXyz(
            // + 0.5, 0.5 to make relative to the centre of the current room
            roomWorldPosition(
              addXy(labelLayout.gridOffset, { x: 0.5, y: 0.5 }),
            ),
          )}
        >
          <text
            fill="white"
            fontFamily="HeadOverHeels"
            fontSize={mapLabelFontSize}
            textAnchor={labelLayout.align === "left" ? "start" : "end"}
            // baseline placed so the cap-height is centred on the label anchor
            y={mapLabelFontSize / 2}
          >
            {label.text}
          </text>
        </g>
      )}
      {hasBehaviours && (
        <>
          <path
            ref={interactiveAreaRef}
            class="fill-transparent cursor-pointer outline-none"
            d={floorFillPathD}
            tabIndex={-1}
          />
          {behaviours.map((Behaviour, i) => (
            <Suspense key={i} fallback={null}>
              <Behaviour
                interactiveAreaRef={interactiveAreaRef}
                roomId={id}
                subRoomId={subRoomId}
                isCurrentRoom={isCurrentRoom}
              />
            </Suspense>
          ))}
        </>
      )}
    </g>
  );
};
