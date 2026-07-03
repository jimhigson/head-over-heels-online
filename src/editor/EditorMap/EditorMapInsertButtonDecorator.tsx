import { type ComponentChildren } from "preact";

import { roomGridSizeXY } from "../../game/components/dialogs/menuDialog/dialogs/map/mapConstants";
import { type RoomDecoratorProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { roomWorldPosition } from "../../game/components/dialogs/menuDialog/dialogs/map/roomWorldPosition";
import { translateXyz } from "../../game/components/dialogs/menuDialog/dialogs/map/svgHelpers";
import { projectWorldXyzToScreenXy } from "../../game/render/projections";
import { type Boundaries } from "../../model/map/roomGridPositions";
import { type SortedObjectOfRoomGridPositionSpecs } from "../../model/map/sortRoomGridPositions";
import { editorStore, useEditorAppSelector } from "../../store/store";
import { Tooltip } from "../../ui/tooltip/Tooltip";
import { valuesIter } from "../../utils/entries";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  addXyz,
  type Direction8Xyz,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { type EditorRoomId } from "../editorTypes";
import { selectCursorSubRoomVerticalLink } from "../slice/levelEditorSelectors";
import { insertRoom, setRoomAboveOrBelow } from "../slice/levelEditorSlice";

const half = roomGridSizeXY / 2;
const xyOutwardOffset = 52;
const zOutwardOffset = 44;

const centre = projectWorldXyzToScreenXy({ x: half, y: half });

type InsertDirection =
  | "above"
  | "away"
  | "below"
  | "left"
  | "right"
  | "towards";

const allDirections: InsertDirection[] = [
  "left",
  "right",
  "away",
  "towards",
  "above",
  "below",
];

const directionToUnitVector: Record<InsertDirection, Direction8Xyz> = {
  left: "left",
  right: "right",
  away: "away",
  towards: "towards",
  above: "up",
  below: "down",
};

const rightOff = projectWorldXyzToScreenXy({ x: -xyOutwardOffset });
const leftOff = projectWorldXyzToScreenXy({ x: xyOutwardOffset });
const towardsOff = projectWorldXyzToScreenXy({ y: -xyOutwardOffset });
const awayOff = projectWorldXyzToScreenXy({ y: xyOutwardOffset });
const aboveOff = projectWorldXyzToScreenXy({ z: zOutwardOffset });
const belowOff = projectWorldXyzToScreenXy({ z: -zOutwardOffset });

const screenPositions: Record<InsertDirection, { x: number; y: number }> = {
  right: { x: centre.x + rightOff.x, y: centre.y + rightOff.y },
  left: { x: centre.x + leftOff.x, y: centre.y + leftOff.y },
  towards: { x: centre.x + towardsOff.x, y: centre.y + towardsOff.y },
  away: { x: centre.x + awayOff.x, y: centre.y + awayOff.y },
  above: { x: centre.x + aboveOff.x, y: centre.y + aboveOff.y },
  below: { x: centre.x + belowOff.x, y: centre.y + belowOff.y },
};

const isXyConnected = (
  direction: "away" | "left" | "right" | "towards",
  boundaries: Boundaries,
): boolean => boundaries[direction] === "doorway";

const hasRoomAtTarget = (
  direction: InsertDirection,
  roomId: EditorRoomId,
  subRoomId: string,
  allGridPositions: SortedObjectOfRoomGridPositionSpecs<EditorRoomId>,
): boolean => {
  const currentSpec = valuesIter(allGridPositions).find(
    (spec) => spec.roomId === roomId && spec.subRoomId === subRoomId,
  );
  if (!currentSpec) {
    return false;
  }

  const targetPosition = addXyz(
    currentSpec.gridPosition,
    unitVectors[directionToUnitVector[direction]],
  );
  return valuesIter(allGridPositions).some(
    (spec) =>
      spec.roomId !== roomId && xyzEqual(spec.gridPosition, targetPosition),
  );
};

type ButtonMode = "add" | "door" | "floor" | "insert";

const getXyButtonMode = (
  direction: "away" | "left" | "right" | "towards",
  boundaries: Boundaries,
  roomId: EditorRoomId,
  subRoomId: string,
  allGridPositions: SortedObjectOfRoomGridPositionSpecs<EditorRoomId>,
): ButtonMode => {
  if (isXyConnected(direction, boundaries)) {
    return "insert";
  }
  if (hasRoomAtTarget(direction, roomId, subRoomId, allGridPositions)) {
    return "door";
  }
  return "add";
};

const getZButtonMode = (
  direction: "above" | "below",
  hasRoomVertically: boolean,
  roomId: EditorRoomId,
  subRoomId: string,
  allGridPositions: SortedObjectOfRoomGridPositionSpecs<EditorRoomId>,
): ButtonMode => {
  if (hasRoomVertically) {
    return "insert";
  }
  if (hasRoomAtTarget(direction, roomId, subRoomId, allGridPositions)) {
    return "floor";
  }
  return "add";
};

const buttonLabels: Record<ButtonMode, string> = {
  insert: "i",
  door: "d",
  floor: "f",
  add: "+",
};

const directionNames: Record<InsertDirection, string> = {
  left: "**↖** *left* of",
  right: "**↘** *right* of",
  away: "**↗** *behind*",
  towards: "**↙** *in front* of",
  above: "**⬆** *above*",
  below: "**⬇** *below*",
};

const tooltipForMode = (
  mode: ButtonMode,
  direction: InsertDirection,
): string => {
  const where = directionNames[direction];
  switch (mode) {
    case "add":
      return `*Add* a room ${where} this one`;
    case "door":
      return `Add a *door* to join these rooms`;
    case "floor":
      return direction === "above" ?
          `Remove the *floor above*`
        : `Remove the *floor*`;
    case "insert":
      return `*Insert* a room ${where} this one`;
  }
};

const dispatchForDirection = (direction: InsertDirection) => {
  switch (direction) {
    case "left":
    case "right":
    case "away":
    case "towards":
      editorStore.dispatch(insertRoom({ direction }));
      break;
    case "above":
    case "below":
      editorStore.dispatch(setRoomAboveOrBelow({ direction, createNew: true }));
      break;
  }
};

// matches the small toolbar button (buttonSmallSizeClassNames): two blocks minus
// one scaled pixel, in the editor map's scale-editor context (--block: 16px,
// --scale: 2). the glyph is one block tall, as it was when drawn as sprites
const buttonSize = 2 * 16 - 1 * 2;
const buttonFontSize = 16;

type InsertButtonProps = {
  x: number;
  y: number;
  label: string;
  tooltipContent: ComponentChildren;
  onClick: () => void;
};

const InsertButton = ({
  x,
  y,
  label,
  tooltipContent,
  onClick,
}: InsertButtonProps) => (
  <Tooltip
    tooltipContent={tooltipContent}
    triggerContent={
      <g class="group cursor-pointer" onClick={onClick}>
        <rect
          x={x - buttonSize / 2}
          y={y - buttonSize / 2}
          width={buttonSize}
          height={buttonSize}
          class="
            fill-metallicBlue zx:fill-zxBlue toppy:fill-toppyCool3
            group-hover:fill-pastelBlue
            zx:group-hover:fill-zxYellow
            toppy:group-hover:fill-toppyWarm3"
        />
        <text
          x={x}
          y={y}
          fill="white"
          fontFamily="HeadOverHeels"
          fontSize={buttonFontSize}
          textAnchor="middle"
          dominantBaseline="central"
          class="zx:group-hover:fill-zxBlack toppy:group-hover:fill-toppyBlack translate-x-oneScaledPix group-active:translate-y-oneScaledPix"
        >
          {label}
        </text>
      </g>
    }
  />
);

const EditorMapInsertButtonDecorator = ({
  roomId,
  subRoomId,
  boundaries,
  isCurrentSubRoom,
  allGridPositions,
}: RoomDecoratorProps<EditorRoomId>) => {
  const hasRoomAbove = useEditorAppSelector(
    (state) =>
      selectCursorSubRoomVerticalLink(state.levelEditor, "above") !== undefined,
  );
  const hasRoomBelow = useEditorAppSelector(
    (state) =>
      selectCursorSubRoomVerticalLink(state.levelEditor, "below") !== undefined,
  );

  if (!isCurrentSubRoom) {
    return null;
  }

  const gridPositionKey: `${EditorRoomId}/${string}` = `${roomId}/${subRoomId}`;
  const currentGridPosition = allGridPositions[gridPositionKey]?.gridPosition;
  if (currentGridPosition === undefined) {
    return null;
  }

  const getModeForDirection = (direction: InsertDirection): ButtonMode => {
    switch (direction) {
      case "left":
      case "right":
      case "away":
      case "towards":
        return getXyButtonMode(
          direction,
          boundaries,
          roomId,
          subRoomId,
          allGridPositions,
        );
      case "above":
        return getZButtonMode(
          direction,
          hasRoomAbove,
          roomId,
          subRoomId,
          allGridPositions,
        );
      case "below":
        return getZButtonMode(
          direction,
          hasRoomBelow,
          roomId,
          subRoomId,
          allGridPositions,
        );
    }
  };

  const visibleDirections = allDirections.filter((direction) => {
    switch (direction) {
      case "left":
      case "right":
      case "away":
      case "towards":
        return boundaries[direction] !== "open";
      case "above":
      case "below":
        return true;
    }
  });

  return (
    <g transform={translateXyz(roomWorldPosition(currentGridPosition))}>
      {visibleDirections.map((direction) => {
        const { x, y } = screenPositions[direction];
        const mode = getModeForDirection(direction);

        return (
          <InsertButton
            key={direction}
            x={x}
            y={y}
            label={buttonLabels[mode]}
            tooltipContent={tooltipForMode(mode, direction)}
            onClick={() => dispatchForDirection(direction)}
          />
        );
      })}
    </g>
  );
};

export default EditorMapInsertButtonDecorator;
