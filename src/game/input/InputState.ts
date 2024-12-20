import { fromAllEntries } from "@/utils/entries";
import { directions4Xy } from "@/utils/vectors/vectors";
import type { Key } from "./keys";

export const actions = [
  ...directions4Xy,
  "jump",
  "fire",
  "carry",
  "swop",
  /* original game calls this hold (not pause) */
  "hold",
] as const;
export type Action = (typeof actions)[number];

export type KeyAssignment = Record<Action, Key[]>;

/** The currently pressed input, to be processed on the next tick */
export type InputState = Record<Action, boolean> & { windowFocus: boolean };

export const createEmptyInput = (): InputState => ({
  ...fromAllEntries(actions.map((action) => [action, false])),
  windowFocus: true,
});

export const emptyInput = Object.freeze(createEmptyInput());
