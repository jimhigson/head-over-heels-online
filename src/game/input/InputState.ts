import { fromAllEntries } from "../../utils/entries";
import type { DirectionXy4, Xyz } from "../../utils/vectors/vectors";
import { directionsXy4 } from "../../utils/vectors/vectors";
import type { Key } from "./keys";

export const booleanActions = [
  "jump",
  "fire",
  "carry",
  "swop",
  "hold", // aka pause in modern games
  "menu",
  ...directionsXy4,
] as const;
export type Action = (typeof booleanActions)[number];

export type AssignableInput = Key | `joystick:${number | "x" | "y"}`;

export type InputAssignment = Record<
  Action | DirectionXy4,
  Readonly<AssignableInput[]>
>;

export type InputAssignmentPreset = {
  inputAssignment: InputAssignment;
  description?: string;
};

/** The currently pressed input, to be processed on the next tick */
export type InputState = Record<Action, boolean> & {
  windowBlurred: boolean;
  /**
   * direction pressed on the joystick, keyboard, etc - normalised to -1..1 in x and y
   * z will always be zero, but including it makes it easier to convert to 3-space
   * velocities later
   */
  direction: Xyz;

  /**
   * the raw keys/buttons being pressed right now. Not usually used in-game
   */
  raw: Partial<Record<AssignableInput, true>>;
};

export const createEmptyInput = (): InputState => ({
  ...fromAllEntries(booleanActions.map((action) => [action, false])),
  ...fromAllEntries(directionsXy4.map((action) => [action, false])),
  windowBlurred: false,
  direction: { x: 0, y: 0, z: 0 },
  raw: {},
});

export const emptyInput = Object.freeze(createEmptyInput());
