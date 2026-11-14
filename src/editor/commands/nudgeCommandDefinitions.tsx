import { type EditorRootState } from "../../store/store";
import { fromAllEntries } from "../../utils/entries";
import { twClass } from "../../utils/twClass.tsx" with { type: "macro" };
import { directionXyz4Glyphs } from "../../utils/vectors/directionGlyphs";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  directionsXyz4,
  type DirectionXyz4,
  elementWiseProductXyz,
  originXyz,
  type Xyz,
} from "../../utils/vectors/vectors";
import { type EditorJsonItemUnion } from "../editorTypes";
import { type RotationSense } from "../itemRotation";
import { activePaneLoadedRoom } from "../paneLoadedRooms";
import {
  type NudgeKind,
  nudgeKinds,
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
  directionAxis,
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

/**
 * the world direction a nudge goes in, at the camera's angle now: the four
 * screen directions turn with the camera, up and down never do
 */
const selectNudgeWorldVector = (
  state: EditorRootState,
  direction: DirectionXyz4,
): Xyz =>
  direction === "up" || direction === "down" ?
    unitVectors[direction]
  : apparentMoveVector(direction, selectEditorCameraAngle(state));

/** each nudge direction's key - each kind of nudge adds its own modifiers */
const nudgeDirectionKeys = {
  left: "ArrowLeft",
  right: "ArrowRight",
  away: "ArrowUp",
  towards: "ArrowDown",
  up: "PageUp",
  down: "PageDown",
} as const satisfies Record<DirectionXyz4, string>;

const nudgeKindShortcutsAndLabels = {
  move: { modifiers: "", verb: "Move" },
  multiplyOrGrow: { modifiers: "⌥", verb: "Multiply" },
  removeOrShrink: { modifiers: "⌥⇧", verb: "Shrink" },
} as const satisfies Record<NudgeKind, { modifiers: string; verb: string }>;

const glyphIconClassName = twClass("relative text-single-line");

const nudgeCommand = (
  label: string,
  /**
   * the direction shown as the command's icon
   */
  iconDirection: DirectionXyz4,
  shortcutKeys: ActionCommand["shortcutKeys"],
  selectIsAvailable: (state: EditorRootState) => boolean,
  nudgeArgs: (state: EditorRootState) => NudgeArgs,
): ActionCommand => ({
  type: "action",
  label,
  icon: (
    <span class={glyphIconClassName}>{directionXyz4Glyphs[iconDirection]}</span>
  ),
  shortcutKeys,
  selectIsAvailable,
  action: () => (dispatch, getState) => {
    const loadedRoom = activePaneLoadedRoom();
    if (loadedRoom !== undefined) {
      dispatch(
        nudgeSelectedItemsThunk(
          nudgeArgs(getState()),
          loadedRoom.getRoomState(),
        ),
      );
    }
  },
});

const selectCanShrinkAlong = (state: EditorRootState, direction: Xyz) => {
  const { resizedItemIds, deletedItemIds } = multiplyPlan(
    selectCurrentCommittedRoomJson(state),
    selectCursorRoomSelectedJsonItemIds(state),
    direction,
    "removeOrShrink",
  );
  return resizedItemIds.length > 0 || deletedItemIds.length > 0;
};

const multiplyCommand = (
  label: string,
  /**
   * the direction shown as the command's icon
   */
  iconDirection: DirectionXyz4,
  shortcutKeys: ActionCommand["shortcutKeys"],
  multiplyType: MultiplyType,
  /**
   * the world direction to multiply or shrink in
   */
  worldDirection: (state: EditorRootState) => Xyz,
): ActionCommand => ({
  type: "action",
  label,
  icon: (
    <span class={glyphIconClassName}>{directionXyz4Glyphs[iconDirection]}</span>
  ),
  shortcutKeys,
  selectIsAvailable: (state) =>
    multiplyType === "multiplyOrGrow" ?
      canMultiplyAlong(
        selectCurrentCommittedRoomJson(state),
        selectCursorRoomSelectedJsonItemIds(state),
        worldDirection(state),
      )
    : selectCanShrinkAlong(state, worldDirection(state)),
  action: () => (dispatch, getState) => {
    const loadedRoom = activePaneLoadedRoom();
    if (loadedRoom !== undefined) {
      dispatch(
        multiplySelectedItemsThunk(
          worldDirection(getState()),
          multiplyType,
          loadedRoom.getRoomState(),
        ),
      );
    }
  },
});

/** a move, multiply and shrink command for every nudge direction */
function* nudgeCommandEntries(): Generator<[NudgeCommandId, ActionCommand]> {
  for (const direction of directionsXyz4) {
    for (const nudgeKind of nudgeKinds) {
      const { modifiers, verb } = nudgeKindShortcutsAndLabels[nudgeKind];
      const label = `${verb} ${direction}`;
      const shortcutKeys: ActionCommand["shortcutKeys"] = [
        `${modifiers}${nudgeDirectionKeys[direction]}`,
      ];
      yield [
        `${nudgeKind}.${direction}`,
        nudgeKind === "move" ?
          nudgeCommand(
            label,
            direction,
            shortcutKeys,
            (state) =>
              selectMovableAxes(state)[
                directionAxis(selectNudgeWorldVector(state, direction))
              ] !== 0,
            (state) => ({
              posVector: selectNudgeWorldVector(state, direction),
            }),
          )
        : multiplyCommand(label, direction, shortcutKeys, nudgeKind, (state) =>
            selectNudgeWorldVector(state, direction),
          ),
      ];
    }
  }
}

/** the id of a command that moves, multiplies, shrinks or rotates the selection */
export type NudgeCommandId =
  `${NudgeKind}.${DirectionXyz4}` | `rotate.${RotationSense}`;

/** moving, multiplying, shrinking and rotating the selected items */
export const nudgeCommandDefinitions: Record<NudgeCommandId, ActionCommand> = {
  ...fromAllEntries(nudgeCommandEntries()),
  "rotate.anticlockwise": {
    type: "action",
    label: "Rotate anti-clockwise",
    icon: <span class={glyphIconClassName}>↺</span>,
    shortcutKeys: ["["],
    tooltipContent: `## Rotate anti-clockwise\n\nTurn the selected item(s) - or the item the current tool will place - a quarter-turn anti-clockwise`,
    selectIsAvailable: selectSelectionOrToolItemIsRotatable,
    action: () => rotateSelectionOrToolItemThunk("anticlockwise"),
  },
  "rotate.clockwise": {
    type: "action",
    label: "Rotate clockwise",
    icon: <span class={glyphIconClassName}>↻</span>,
    shortcutKeys: ["]"],
    tooltipContent: `## Rotate clockwise\n\nTurn the selected item(s) - or the item the current tool will place - a quarter-turn clockwise`,
    selectIsAvailable: selectSelectionOrToolItemIsRotatable,
    action: () => rotateSelectionOrToolItemThunk("clockwise"),
  },
};
