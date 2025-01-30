import type { DirectionXy4 } from "../../utils/vectors/vectors";
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
  ...directionsXy4,
] as const;
export type BooleanAction = (typeof booleanActions)[number];

export type ActionInputAssignment = {
  keys: Key[];
  gamepadAxes: number[];
  gamepadButtons: number[];
};

export type InputAssignment = Record<
  BooleanAction | DirectionXy4,
  ActionInputAssignment
>;

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
      type: "gamepadAxes";
      input: ActionInputAssignment["gamepadAxes"][number];
    }
  | {
      type: "gamepadButtons";
      input: ActionInputAssignment["gamepadButtons"][number];
    };
