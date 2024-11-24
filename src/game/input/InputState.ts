import { fromAllEntries } from "@/utils/entries";
import { directionsXy } from "@/utils/vectors/vectors";
import type { Key } from "./keys";

export const actions = [
  ...directionsXy,
  "jump",
  "fire",
  "carry",
  "swop",
  "pause",
] as const;
export type Action = (typeof actions)[number];

export type KeyAssignment = Record<Action, Key[]>;

/** The currently pressed input, to be processed on the next tick */
export type InputState = Record<Action, boolean> & { windowFocus: boolean };

export const noInput = (): InputState => ({
  ...fromAllEntries(actions.map((action) => [action, false])),
  windowFocus: true,
});
