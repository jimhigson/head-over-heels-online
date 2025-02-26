import type { DirectionXy4 } from "../../utils/vectors/vectors";
import type { BooleanAction } from "./actions";
import type { Key } from "./keys";

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
