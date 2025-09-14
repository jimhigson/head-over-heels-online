import type { GameMenusState } from "../slices/gameMenus/gameMenusSlice";

export const gameMenusSliceWhitelist = [
  `userSettings`,
  "savedGames",
] as const satisfies Array<keyof GameMenusState>;
