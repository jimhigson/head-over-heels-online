import { type PropsWithChildren, type Ref } from "react";

import { roomGridSizeXY } from "../../game/components/dialogs/menuDialog/dialogs/map/mapConstants";
import { type RoomDecoratorProps } from "../../game/components/dialogs/menuDialog/dialogs/map/RoomDecoratorProps";
import { type Boundaries } from "../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { type SortedObjectOfRoomGridPositionSpecs } from "../../game/components/dialogs/menuDialog/dialogs/map/sortRoomGridPositions";
import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { projectWorldXyzToScreenXy } from "../../game/render/projections";
import { editorStore, useEditorAppSelector } from "../../store/store";
import { valuesIter } from "../../utils/entries";
import { useElementSize } from "../../utils/react/useElementSize";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  addXyz,
  type Direction8Xyz,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { type EditorRoomId } from "../editorTypes";
import { selectCurrentRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import { insertRoom, setRoomAboveOrBelow } from "../slice/levelEditorSlice";
import { ToolbarButton } from "../toolbar/buttons/ToolbarButton";

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

type ButtonAtPositionProps = PropsWithChildren<{
  x: number;
  y: number;
  buttonW: number;
  buttonH: number;
  foRef?: Ref<SVGForeignObjectElement>;
}>;

const ButtonAtPosition = ({
  x,
  y,
  buttonW,
  buttonH,
  foRef,
  children,
}: ButtonAtPositionProps) => (
  <foreignObject
    ref={foRef}
    x={x - buttonW / 2}
    y={y - buttonH / 2}
    width={buttonW}
    height={buttonH}
  >
    {children}
  </foreignObject>
);

const EditorMapInsertButtonDecorator = ({
  roomId,
  subRoomId,
  boundaries,
  isCurrentSubRoom,
  allGridPositions,
}: RoomDecoratorProps<EditorRoomId>) => {
  const {
    ref: measureRef,
    width: buttonW,
    height: buttonH,
  } = useElementSize<SVGForeignObjectElement>({ measureFirstChild: true });

  const hasRoomAbove = useEditorAppSelector(
    (state) =>
      selectCurrentRoomFromLevelEditorState(state.levelEditor).roomAbove !==
      undefined,
  );
  const hasRoomBelow = useEditorAppSelector(
    (state) =>
      selectCurrentRoomFromLevelEditorState(state.levelEditor).roomBelow !==
      undefined,
  );

  if (!isCurrentSubRoom) {
    return null;
  }

  const w = buttonW ?? 0;
  const h = buttonH ?? 0;

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
    <>
      {visibleDirections.map((direction, i) => {
        const { x, y } = screenPositions[direction];
        const mode = getModeForDirection(direction);

        return (
          <ButtonAtPosition
            key={direction}
            x={x}
            y={y}
            buttonW={w}
            buttonH={h}
            foRef={i === 0 ? measureRef : undefined}
          >
            <ToolbarButton
              small
              className="block"
              onClick={() => dispatchForDirection(direction)}
              tooltipContent={tooltipForMode(mode, direction)}
            >
              <BitmapText className="relative leading-none text-white">
                {buttonLabels[mode]}
              </BitmapText>
            </ToolbarButton>
          </ButtonAtPosition>
        );
      })}
    </>
  );
};

export default EditorMapInsertButtonDecorator;
