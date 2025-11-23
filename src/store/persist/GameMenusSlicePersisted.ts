import type { GameMenusState } from "../slices/gameMenus/gameMenusSlice";
import type { gameMenusSliceWhitelist } from "./gameMenusSliceWhitelist";

export type GameMenusSlicePersisted = Pick<
  GameMenusState,
  (typeof gameMenusSliceWhitelist)[number]
>;
