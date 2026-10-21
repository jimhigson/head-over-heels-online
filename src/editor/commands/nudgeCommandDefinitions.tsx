import { type EditorRootState } from "../../store/store";
import { fromAllEntries } from "../../utils/entries";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  elementWiseProductXyz,
  originXyz,
  type Xyz,
} from "../../utils/vectors/vectors";
import { editorLoadedRoom } from "../editorLoadedRoom";
import { type EditorJsonItemUnion } from "../editorTypes";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  selectEditorCameraAngle,
} from "../slice/levelEditorSlice";
import {
  canMultiplyAlong,
  multiplyPlan,
  type MultiplyType,
} from "../slice/multiplyPlan";
import { getMovableVector } from "../slice/reducers/moveOrResizeItemPreview/getMovableVector";
import {
  apparentMoveVector,
  apparentNudgeAxis,
  type NudgeArgs,
} from "../toolbar/buttons/nudgeDirections";
import { type ActionCommand } from "./EditorCommand";
import { multiplySelectedItemsThunk } from "./multiplySelectedItemsThunk";
import { nudgeSelectedItemsThunk } from "./nudgeSelectedItemsThunk";
import {
  rotateSelectionOrToolItemThunk,
  selectSelectionOrToolItemIsRotatable,
} from "./rotateSelectionOrToolItemThunk";

const selectSelectedJsonItems = (
  state: EditorRootState,
): EditorJsonItemUnion[] => {
  const roomJson = selectCurrentCommittedRoomJson(state);
  return selectCursorRoomSelectedJsonItemIds(state)
    .map((jsonItemId) => roomJson.items[jsonItemId])
    .filter((item) => item !== undefined);
};

/** the axes every selected item can move along (1) or not (0) */
const selectMovableAxes = (state: EditorRootState): Xyz => {
  const selectedItems = selectSelectedJsonItems(state);
  return selectedItems.length > 0 ?
      elementWiseProductXyz(...selectedItems.map(getMovableVector))
    : originXyz;
};

/** the world axis a screen direction acts on, at the camera's angle now */
const selectApparentAxis = (
  state: EditorRootState,
  apparentDirection: DirectionXy4,
) => apparentNudgeAxis(apparentDirection, selectEditorCameraAngle(state));

// the buttons and arrow keys are labelled with screen directions; which world
// axis each acts on follows the camera angle, so is worked out when run:
const apparentDirections = [
  { direction: "left", arrowKey: "ArrowLeft", glyph: "↖" },
  { direction: "right", arrowKey: "ArrowRight", glyph: "↘" },
  { direction: "away", arrowKey: "ArrowUp", glyph: "↗" },
  { direction: "towards", arrowKey: "ArrowDown", glyph: "↙" },
] as const satisfies {
  direction: DirectionXy4;
  arrowKey: string;
  glyph: string;
}[];

const glyphIcon = (glyph: string) => (
  <span class="relative text-single-line">{glyph}</span>
);

const nudgeCommand = (
  label: string,
  glyph: string,
  shortcutKeys: ActionCommand["shortcutKeys"],
  selectIsAvailable: (state: EditorRootState) => boolean,
  nudgeArgs: (state: EditorRootState) => NudgeArgs,
): ActionCommand => ({
  type: "action",
  label,
  icon: glyphIcon(glyph),
  shortcutKeys,
  selectIsAvailable,
  action: () => (dispatch, getState) =>
    dispatch(
      nudgeSelectedItemsThunk(
        nudgeArgs(getState()),
        editorLoadedRoom.getRoomState(),
      ),
    ),
});

const selectCanShrinkAlong = (state: EditorRootState, direction: Xyz) => {
  const { resizedItemIds, deletedItemIds } = multiplyPlan(
    selectCurrentCommittedRoomJson(state),
    selectCursorRoomSelectedJsonItemIds(state),
    direction,
    "shrink",
  );
  return resizedItemIds.length > 0 || deletedItemIds.length > 0;
};

const multiplyCommand = (
  label: string,
  glyph: string,
  shortcutKeys: ActionCommand["shortcutKeys"],
  multiplyType: MultiplyType,
  /**
   * the world direction to multiply or shrink in
   */
  worldDirection: (state: EditorRootState) => Xyz,
): ActionCommand => ({
  type: "action",
  label,
  icon: glyphIcon(glyph),
  shortcutKeys,
  selectIsAvailable: (state) =>
    multiplyType === "multiply" ?
      canMultiplyAlong(
        selectCurrentCommittedRoomJson(state),
        selectCursorRoomSelectedJsonItemIds(state),
        worldDirection(state),
      )
    : selectCanShrinkAlong(state, worldDirection(state)),
  action: () => (dispatch, getState) =>
    dispatch(
      multiplySelectedItemsThunk(
        worldDirection(getState()),
        multiplyType,
        editorLoadedRoom.getRoomState(),
      ),
    ),
});

/** moving, multiplying, shrinking and rotating the selected items */
export const nudgeCommandDefinitions = {
  ...fromAllEntries(
    apparentDirections.flatMap(
      ({
        direction,
        arrowKey,
        glyph,
      }): Array<
        [`${"move" | "multiply" | "shrink"}.${typeof direction}`, ActionCommand]
      > => [
        [
          `move.${direction}`,
          nudgeCommand(
            `Move ${direction}`,
            glyph,
            [arrowKey],
            (state) =>
              selectMovableAxes(state)[selectApparentAxis(state, direction)] !==
              0,
            (state) => ({
              posVector: apparentMoveVector(
                direction,
                selectEditorCameraAngle(state),
              ),
            }),
          ),
        ],
        [
          `multiply.${direction}`,
          multiplyCommand(
            `Multiply ${direction}`,
            glyph,
            [`⌥${arrowKey}`],
            "multiply",
            (state) =>
              apparentMoveVector(direction, selectEditorCameraAngle(state)),
          ),
        ],
        [
          `shrink.${direction}`,
          multiplyCommand(
            `Shrink ${direction}`,
            glyph,
            [`⌥⇧${arrowKey}`],
            "shrink",
            (state) =>
              apparentMoveVector(direction, selectEditorCameraAngle(state)),
          ),
        ],
      ],
    ),
  ),
  "move.up": nudgeCommand(
    "Move up",
    "⬆",
    // also the plain arrow key while moving away isn't possible (see
    // useCommandShortcuts, which runs the first available match):
    ["PageUp", "⇧ArrowUp", "ArrowUp"],
    (state) => selectMovableAxes(state).z !== 0,
    () => ({ posVector: unitVectors.up }),
  ),
  "move.down": nudgeCommand(
    "Move down",
    "⬇",
    ["PageDown", "⇧ArrowDown", "ArrowDown"],
    (state) => selectMovableAxes(state).z !== 0,
    () => ({ posVector: unitVectors.down }),
  ),
  "multiply.up": multiplyCommand(
    "Multiply up",
    "⬆",
    ["⌥PageUp"],
    "multiply",
    () => unitVectors.up,
  ),
  "multiply.down": multiplyCommand(
    "Multiply down",
    "⬇",
    ["⌥PageDown"],
    "multiply",
    () => unitVectors.down,
  ),
  "shrink.up": multiplyCommand(
    "Shrink up",
    "⬆",
    ["⌥⇧PageUp"],
    "shrink",
    () => unitVectors.up,
  ),
  "shrink.down": multiplyCommand(
    "Shrink down",
    "⬇",
    ["⌥⇧PageDown"],
    "shrink",
    () => unitVectors.down,
  ),
  "rotate.anticlockwise": {
    type: "action",
    label: "Rotate anti-clockwise",
    icon: glyphIcon("↺"),
    shortcutKeys: ["["],
    tooltipContent: `## Rotate anti-clockwise\n\nTurn the selected item(s) - or the item the current tool will place - a quarter-turn anti-clockwise`,
    selectIsAvailable: selectSelectionOrToolItemIsRotatable,
    action: () => rotateSelectionOrToolItemThunk("anticlockwise"),
  },
  "rotate.clockwise": {
    type: "action",
    label: "Rotate clockwise",
    icon: glyphIcon("↻"),
    shortcutKeys: ["]"],
    tooltipContent: `## Rotate clockwise\n\nTurn the selected item(s) - or the item the current tool will place - a quarter-turn clockwise`,
    selectIsAvailable: selectSelectionOrToolItemIsRotatable,
    action: () => rotateSelectionOrToolItemThunk("clockwise"),
  },
} satisfies Record<string, ActionCommand>;
