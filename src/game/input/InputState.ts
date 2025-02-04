import type { AxisXy, DirectionXy4 } from "../../utils/vectors/vectors";
import { directionsXy4 } from "../../utils/vectors/vectors";
import type { Key } from "./keys";

export const booleanActions = [
  "jump",
  "fire",
  "carry",
  "swop",
  "hold", // aka pause in modern games
  "toggleColourisation",

  // non- re-assignable keys to ensure there are always keys assigned to
  // use the menus, no matter what the user selects in their key mappings
  "menu_select",
  "menu_openOrExit",
  // only exist the menu - can share gamepad buttons with in-game controls
  "menu_exit",
  ...directionsXy4,
] as const;
export type BooleanAction = (typeof booleanActions)[number];

export type ActionInputAssignment = {
  keys: Key[];
  gamepadButtons: number[];
};

export type InputAssignment = {
  presses: Record<BooleanAction | DirectionXy4, ActionInputAssignment>;
  axes: { x: number[]; y: number[] };
};

export type InputAssignmentPreset = {
  inputAssignment: InputAssignment;
  description?: string;
};

export type InputPress =
  | {
      type: "key";
      input: ActionInputAssignment["keys"][number];
    }
  | {
      /** for when an axis is used like a button (non-analogue mode) */
      type: "gamepadAxes";
      input: number;
      //direction: -1 | 1; nothing uses this
    }
  | {
      type: "gamepadButtons";
      input: ActionInputAssignment["gamepadButtons"][number];
    };

// for actions with an axis equivalent, get the axis and direction of the action:
export const actionToAxis = (
  action: BooleanAction,
): { axis: AxisXy; direction: -1 | 1 } | undefined => {
  return (
    action === "left" ?
      {
        axis: "x",
        direction: -1,
      }
    : action === "right" ?
      {
        axis: "x",
        direction: 1,
      }
    : action === "towards" ?
      {
        axis: "y",
        direction: 1,
      }
    : action === "away" ?
      {
        axis: "y",
        direction: -1,
      }
    : undefined
  );
};
