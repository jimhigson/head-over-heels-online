import { getConsolidatableVector } from "../../consolidateItems/ConsolidatableJsonItem";
import { getJsonItemTimes } from "../../model/times";
import { type EditorRootState } from "../../store/store";
import { fromAllEntries } from "../../utils/entries";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  elementWiseProductXyz,
  originXyz,
  unitXyz,
  type Xyz,
} from "../../utils/vectors/vectors";
import { type EditorJsonItemUnion } from "../editorTypes";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  selectEditorCameraAngle,
} from "../slice/levelEditorSlice";
import { getMovableVector } from "../slice/reducers/moveOrResizeItemPreview/getMovableVector";
import {
  apparentGrowArgs,
  apparentMoveVector,
  apparentNudgeAxis,
  apparentShrinkArgs,
  type NudgeArgs,
} from "../toolbar/buttons/nudgeDirections";
import { type ActionCommand } from "./EditorCommand";
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

/** the axes every selected item can be resized along (1) or not (0) */
const selectConsolidatableAxes = (state: EditorRootState): Xyz => {
  const selectedItems = selectSelectedJsonItems(state);
  return selectedItems.length > 0 ?
      elementWiseProductXyz(...selectedItems.map(getConsolidatableVector))
    : originXyz;
};

/** the largest size of any selected item, along each axis */
const selectLargestSize = (state: EditorRootState): Xyz => {
  const selectedItems = selectSelectedJsonItems(state);
  return selectedItems.length > 0 ?
      selectedItems.map(getJsonItemTimes).reduce(
        (largest, times) => ({
          x: Math.max(largest.x, times.x),
          y: Math.max(largest.y, times.y),
          z: Math.max(largest.z, times.z),
        }),
        unitXyz,
      )
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
    dispatch(nudgeSelectedItemsThunk(nudgeArgs(getState()))),
});

/** moving, growing, shrinking and rotating the selected items */
export const nudgeCommandDefinitions = {
  ...fromAllEntries(
    apparentDirections.flatMap(
      ({
        direction,
        arrowKey,
        glyph,
      }): Array<
        [`${"grow" | "move" | "shrink"}.${typeof direction}`, ActionCommand]
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
          `grow.${direction}`,
          nudgeCommand(
            `Grow ${direction}`,
            glyph,
            [`⌥${arrowKey}`],
            (state) =>
              selectConsolidatableAxes(state)[
                selectApparentAxis(state, direction)
              ] !== 0,
            (state) =>
              apparentGrowArgs(direction, selectEditorCameraAngle(state)),
          ),
        ],
        [
          `shrink.${direction}`,
          nudgeCommand(
            `Shrink ${direction}`,
            glyph,
            [`⌥⇧${arrowKey}`],
            (state) =>
              selectLargestSize(state)[selectApparentAxis(state, direction)] >
              1,
            (state) =>
              apparentShrinkArgs(direction, selectEditorCameraAngle(state)),
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
  "grow.up": nudgeCommand(
    "Grow up",
    "⬆",
    ["⌥PageUp"],
    (state) => selectConsolidatableAxes(state).z !== 0,
    () => ({ timesDelta: { z: 1 } }),
  ),
  "grow.down": nudgeCommand(
    "Grow down",
    "⬇",
    ["⌥PageDown"],
    (state) => selectConsolidatableAxes(state).z !== 0,
    () => ({ posVector: { x: 0, y: 0, z: -1 }, timesDelta: { z: 1 } }),
  ),
  "shrink.up": nudgeCommand(
    "Shrink up",
    "⬆",
    ["⌥⇧PageUp"],
    (state) => selectLargestSize(state).z > 1,
    () => ({ posVector: { x: 0, y: 0, z: 1 }, timesDelta: { z: -1 } }),
  ),
  "shrink.down": nudgeCommand(
    "Shrink down",
    "⬇",
    ["⌥⇧PageDown"],
    (state) => selectLargestSize(state).z > 1,
    () => ({ timesDelta: { z: -1 } }),
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
