import { directionsXy4 } from "../../utils/vectors/vectors";


export const booleanActions = [
  "jump",
  "fire",
  "carry",
  "swop",
  "hold", // aka pause in modern games
  "toggleColourisation",
  "toggleShowFps",

  // non- re-assignable keys to ensure there are always keys assigned to
  // use the menus, no matter what the user selects in their key mappings
  "menu_select",
  "menu_openOrExit",
  // only exist the menu - can share gamepad buttons with in-game controls
  "menu_exit",
  ...directionsXy4,
] as const;
export type BooleanAction = (typeof booleanActions)[number];
