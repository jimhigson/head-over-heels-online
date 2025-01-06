import { fromAllEntries } from "@/utils/entries";
import type { Key } from "./keys";
import type { Xyz } from "@/utils/vectors/vectors";
import { type DirectionXy4 } from "@/utils/vectors/vectors";

export const booleanActions = [
  "jump",
  "fire",
  "carry",
  "swop",
  /* original game calls this hold (not pause) */
  "hold",
] as const;
export type Action = (typeof booleanActions)[number];

export type KeyAssignment = Record<Action | DirectionXy4, Key[]>;

/** The currently pressed input, to be processed on the next tick */
export type InputState = Record<Action, boolean> & {
  windowFocus: boolean;
  /**
   * direction pressed on the joystick, keyboard, etc - normalised to -1..1 in x and y
   * z will always be zero, but including it makes it easier to convert to 3-space
   * velocities later
   */
  direction: Xyz;
};

export const createEmptyInput = (): InputState => ({
  ...fromAllEntries(booleanActions.map((action) => [action, false])),
  windowFocus: true,
  direction: { x: 0, y: 0, z: 0 },
});

export const emptyInput = Object.freeze(createEmptyInput());
