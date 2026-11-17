import { memo } from "preact/compat";
import { useMemo, useRef } from "preact/hooks";

import { type Boundaries } from "../../../../../../model/map/roomGridPositions";
import { type IndividualCharacterName } from "../../../../../../model/modelTypes";
import { hudCharTextureSize } from "../../../../../../sprites/spritesheet/spritesheetData/textureSizes";
import { range } from "../../../../../../utils/iterators/range";
import { useUniqueId } from "../../../../../../utils/preact/useUniqueId";
import {
  addXy,
  type DirectionXy4,
  lengthXy,
  type Xy,
} from "../../../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../../../../render/projections";
import { floorFillPathD } from "./floorFillPathD";
import {
  InPlayItemsInRoomLayout,
  notableItemSlotPositions,
  NotableJsonItemsInRoomLayout,
} from "./ItemsInRoomLayout";
import { type MapCellOutline, mapCellOutline } from "./mapCellOutline";
import { roomAccentColourClass } from "./mapColours";
import {
  doorwayGap,
  roomBack,
  roomFront,
  roomGridSizeXY,
  roomGridSizeZ,
  strokeWidth,
} from "./mapConstants";
import { useMapContext } from "./MapContext";
import { PlayableItemInRoom } from "./NotableItem";
import { RoomDecoration } from "./RoomDecoration";
import { roomWorldPosition } from "./roomWorldPosition";
import { project, roundForSvg, translateXyz } from "./svgHelpers";
import { useIsCurrentCell } from "./useIsCurrentCell";
import { useRoomNode } from "./useRoomNode";
import { VisitedFootprint } from "./VisitedFootprint";

const boundaryLineLength = lengthXy(
  projectWorldXyzToScreenXy({ x: roomGridSizeXY, y: 0 }),
);

// open sides draw no boundary line at all:
const boundaryDashArrays = {
  wall: undefined,
  doorway: `${roundForSvg(boundaryLineLength * ((1 - doorwayGap) / 2) - strokeWidth / 2)}, ${roundForSvg(boundaryLineLength * doorwayGap + strokeWidth)}, 999`,
};

const floorPathFillPathD = (
  boundaries: Boundaries,
  openCorners: MapCellOutline["openCorners"],
  pathThickness = doorwayGap,
) => {
  const roomFront = roomGridSizeXY * ((1 - pathThickness) / 2);
  const roomBack = roomGridSizeXY - roomFront;

  const awayOpen = boundaries.away !== "wall";
  const towardsOpen = boundaries.towards !== "wall";
  const leftOpen = boundaries.left !== "wall";
  const rightOpen = boundaries.right !== "wall";

  // at each corner, the inside corner of the middle - or, where the floor
  // carries on into the cell diagonally across, the cell's own corner:
  const corner = (open: boolean, inside: Xy, outside: Xy) =>
    `L${project(open ? outside : inside)}`;

  let shape = `M${project(
    openCorners.rightTowards ? { x: 0, y: 0 } : { x: roomFront, y: roomFront },
  )}`;

  if (rightOpen) {
    shape += `L${project({ x: 0, y: roomFront })} L${project({ x: 0, y: roomBack })}`;
  }

  shape += corner(
    openCorners.rightAway,
    { x: roomFront, y: roomBack },
    { x: 0, y: roomGridSizeXY },
  );

  if (awayOpen) {
    shape += `L${project({ x: roomFront, y: roomGridSizeXY })} L${project({ x: roomBack, y: roomGridSizeXY })}`;
  }

  shape += corner(
    openCorners.leftAway,
    { x: roomBack, y: roomBack },
    { x: roomGridSizeXY, y: roomGridSizeXY },
  );

  if (leftOpen) {
    shape += `L${project({ x: roomGridSizeXY, y: roomBack })} L${project({ x: roomGridSizeXY, y: roomFront })}`;
  }

  shape += corner(
    openCorners.leftTowards,
    { x: roomBack, y: roomFront },
    { x: roomGridSizeXY, y: 0 },
  );
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

/**
 * the vertical edge of a high room's box, at a corner of its floor
 */
const verticalLinePathD = (corner: Xy) => `
M${project({ ...corner, z: roomGridSizeZ })}
L${project(corner)}
`;

/**
 * the vertical edges of a high cell's box that its outline has
 */
const highCellVerticalLinesPathD = (
  outline: MapCellOutline,
  which: "back" | "front",
) =>
  (which === "front" ?
    [outline.frontPost && verticalLinePathD({ x: 0, y: 0 })]
  : [
      outline.backCornerPost &&
        verticalLinePathD({ x: roomGridSizeXY, y: roomGridSizeXY }),
      outline.leftWallFrontPost &&
        verticalLinePathD({ x: roomGridSizeXY, y: 0 }),
      outline.awayWallRightPost &&
        verticalLinePathD({ x: 0, y: roomGridSizeXY }),
    ]
  )
    .filter((pathD) => pathD !== false)
    .join("");

// the interactive area's <a> exists to be an interest invoker (and click
// target), not to navigate:
const preventDefault = (e: Event) => e.preventDefault();

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
  roomId: RoomId;
  subRoomId: string;
};

const RoomSvgUnmemoised = <RoomId extends string>({
  roomId,
  subRoomId,
}: RoomSvgProps<RoomId>) => {
  const roomNode = useRoomNode(roomId, subRoomId);
  const { boundaries } = roomNode;
  const { isCurrentRoom } = useIsCurrentCell(roomId, subRoomId);
  const {
    behaviours,
    currentCharacterName,
    onPlayableClick,
    useRoomJson,
    useNotableItems,
    useCellPlayables,
    useRoomVisited,
    useIsRoomSelected,
  } = useMapContext<RoomId>();
  const roomJson = useRoomJson(roomId);
  const notableItems = useNotableItems(roomId, subRoomId);
  const notableItemPositions = useMemo(
    () => notableItemSlotPositions(notableItems, roomJson, subRoomId),
    [notableItems, roomJson, subRoomId],
  );
  const {
    head: headItemInRoom,
    heels: heelsItemInRoom,
    headOverHeels: headOverHeelsItemInRoom,
  } = useCellPlayables(roomId, subRoomId);
  const roomVisited = useRoomVisited(roomId);
  const isRoomSelected = useIsRoomSelected(roomId);

  const { id, color } = roomJson;
  const outline = useMemo(
    () => mapCellOutline(roomJson, roomNode),
    [roomJson, roomNode],
  );
  const label = roomJson.meta?.label;
  const labelLayout = label && labelLayoutByDirection[label.direction];
  const interactiveAreaRef = useRef<null | SVGPathElement>(null);
  const tipId = useUniqueId();
  const hasBehaviours = behaviours.length > 0;

  return (
    <g
      data-room-id={id}
      strokeWidth={strokeWidth}
      class={`
        ${roomAccentColourClass(color)}
        ${
          isCurrentRoom ?
            `[--floorColor:theme(colors.shadow)] zx:[--floorColor:theme(colors.zxBlack)] toppy:[--floorColor:theme(colors.toppyGrey3)]`
          : isRoomSelected ?
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
      {outline.floor === "hole" ?
        <>
          {/* show a floor outlining the room with a hole: */}
          <path
            class="fill-[var(--roomHintColor)]"
            fillRule="evenodd"
            // whole tile, then use evenodd to cut out the middle:
            d={`${floorFillPathD} ${floorPathFillPathD(boundaries, outline.openCorners)}`}
          />
          <path
            class="fill-[var(--floorColor)]"
            fillRule="evenodd"
            // whole tile, then use evenodd to cut out the middle:
            d={`${floorPathFillPathD(boundaries, outline.openCorners)} ${floorPathFillPathD(boundaries, outline.openCorners, doorwayGap * 0.7)}`}
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
            d={floorPathFillPathD(boundaries, outline.openCorners)}
          />
          {outline.deadlyFloor && (
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
      {outline.awayWall !== "none" && (
        <path
          class="fill-[var(--roomHintColorDarker)]"
          fillRule="evenodd"
          d={awayWallFillPathD(outline.awayWall === "doorway")}
        />
      )}
      {/* left wall is just the away wall flipped: */}
      {outline.leftWall !== "none" && (
        <path
          class="fill-[var(--roomHintColor)]"
          fillRule="evenodd"
          transform="scale(-1, 1)"
          d={awayWallFillPathD(outline.leftWall === "doorway")}
        />
      )}
      {/* boundary lines */}
      <g class="fill-transparent stroke-midGreyHalfbrite">
        {boundaries.right !== "open" && (
          <path // right
            d={`M${project({ x: 0, y: roomGridSizeXY })} L0, 0`}
            data-direction="right"
            data-boundary={boundaries.right}
            strokeDasharray={boundaryDashArrays[boundaries.right]}
          />
        )}
        {boundaries.left !== "open" && (
          <path // left
            d={`M${project({ x: roomGridSizeXY, y: 0 })} L${project({ x: roomGridSizeXY, y: roomGridSizeXY })}`}
            data-direction="left"
            data-boundary={boundaries.left}
            strokeDasharray={boundaryDashArrays[boundaries.left]}
          />
        )}
        {boundaries.towards !== "open" && (
          <path // towards
            d={`M${project({ x: roomGridSizeXY, y: 0 })} L0, 0`}
            data-direction="towards"
            data-boundary={boundaries.towards}
            strokeDasharray={boundaryDashArrays[boundaries.towards]}
          />
        )}
        {boundaries.away !== "open" && (
          <path // away
            d={`M${project({ x: 0, y: roomGridSizeXY })} L${project({ x: roomGridSizeXY, y: roomGridSizeXY })}`}
            data-direction="away"
            data-boundary={boundaries.away}
            strokeDasharray={boundaryDashArrays[boundaries.away]}
          />
        )}
      </g>
      {roomVisited && <VisitedFootprint class="fill-[var(--roomHintColor)]" />}

      {outline.high && (
        // vertical lines
        <path
          class="fill-transparent stroke-midGreyHalfbrite"
          d={highCellVerticalLinesPathD(outline, "back")}
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
          items={notableItems}
          positions={notableItemPositions}
        />
      }
      {outline.high && (
        // vertical lines
        <path
          class="fill-transparent stroke-midGreyHalfbrite"
          d={highCellVerticalLinesPathD(outline, "front")}
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
          <a
            href="#"
            interestfor={tipId}
            tabIndex={-1}
            class="cursor-pointer outline-none"
            onClick={preventDefault}
          >
            <path
              ref={interactiveAreaRef}
              class="fill-transparent"
              d={floorFillPathD}
            />
          </a>
          {behaviours.map((Behaviour, i) => (
            <Behaviour
              key={i}
              interactiveAreaRef={interactiveAreaRef}
              tipId={tipId}
              roomId={id}
              subRoomId={subRoomId}
            />
          ))}
        </>
      )}
    </g>
  );
};

/**
 * a room on the map, redrawn only when its own place on the map, or what the
 * map's context gives for it, changes - so an edit to one room leaves the rest
 * of the map's rooms alone
 */
export const RoomSvg = memo(RoomSvgUnmemoised);
