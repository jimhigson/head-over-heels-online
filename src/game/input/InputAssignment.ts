import type { DirectionXy4 } from "../../utils/vectors/vectors";
import type { BooleanAction } from "./actions";
import type { Key } from "./keys";

export type ActionInputAssignment = {
  keys: Key[];
  gamepadButtons: number[];
};

/** actions which can have axes assigned to them */
type AxisAssignments = {
  /** move head/heels in x (either screen-relative x or world-relative) */
  x: number[];
  /** move head/heels in x (either screen-relative x or world-relative) */
  y: number[];
  /**
   * secondary x axis, probably on the right analogue stick,
   * for looking around larger rooms
   */
  xLook: number[];
  /**
   * secondary y axis, probably on the right analogue stick,
   * for looking around larger rooms
   */
  yLook: number[];
};

export type InputAssignment = {
  presses: Record<BooleanAction | DirectionXy4, ActionInputAssignment>;
  axes: AxisAssignments;
  /**
   * kept as optional for backwards compatibility with saves; added Oct '25
   * saves before then will not have it
   */
  radialAxes?: {
    xy: number[];
  };
};

/** equivalent of BooleanAction but for axis-assignable things */
export type AxisAssignableAction = keyof AxisAssignments;

export type InputAssignmentPreset = {
  inputAssignment: InputAssignment;
  description?: string;
};

export type InputPress =
  | {
      /** for when an axis is used like a button (non-analogue mode) */
      type: "gamepadAxes";
      input: number;
    }
  | {
      type: "gamepadButtons";
      input: ActionInputAssignment["gamepadButtons"][number];
    }
  | {
      type: "key";
      input: ActionInputAssignment["keys"][number];
    };
