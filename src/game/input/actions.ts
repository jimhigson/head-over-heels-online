import { directionsXy4, type DirectionXy4 } from "../../utils/vectors/vectors";

export const lookDirectionsXy4 = [
  "lookUp",
  "lookDown",
  "lookLeft",
  "lookRight",
] as const;

export type LookDirectionsXy4 = (typeof lookDirectionsXy4)[number];

export const booleanActions = [
  "jump",
  "fire",
  "carry",
  "swop",
  "swop.head",
  "swop.heels",
  "hold", // aka pause in modern games
  "toggleColourisation",
  "cycleResolution",
  "toggleShowFps",

  // non- re-assignable keys to ensure there are always keys assigned to
  // use the menus, no matter what the user selects in their key mappings
  "menu_select",
  "menu_openOrExit",
  // only exist the menu - can share gamepad buttons with in-game controls
  "menu_exit",
  "map",
  ...directionsXy4,

  // hold to use the main direction inputs to look around:
  "lookShift",
  ...lookDirectionsXy4,
] as const;
export type BooleanAction = (typeof booleanActions)[number];
// TODO: this is just a copy of booleanActions - probably redundant
export const allActions: (BooleanAction | DirectionXy4)[] = [...booleanActions];
