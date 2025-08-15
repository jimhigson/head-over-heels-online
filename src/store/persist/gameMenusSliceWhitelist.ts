import type { GameMenusState } from "../slices/gameMenusSlice";

export const gameMenusSliceWhitelist = [
  `userSettings`,
  "savedGames",
] as const satisfies Array<keyof GameMenusState>;
