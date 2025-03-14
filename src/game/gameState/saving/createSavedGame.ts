import type { RootState } from "../../../store/store";
import { pick } from "../../../utils/pick";
import type { GameState } from "../GameState";
import { badJsonClone } from "./badJsonClone";
import {
  savedGameGameMenuSliceFields,
  savedGameGameStateFields,
  type SavedGameState,
} from "./SavedGameState";

export const createSavedGame = <RoomId extends string>(
  gameState: GameState<RoomId>,
  storeState: RootState,
): SavedGameState => {
  const reincarnationPoint: SavedGameState = badJsonClone({
    saveTime: Date.now(),
    screenshotBase64: "IAMANIMAGE",
    campaignId: "original",
    gameState: pick(gameState, ...savedGameGameStateFields),
    store: {
      gameMenus: pick(storeState.gameMenus, ...savedGameGameMenuSliceFields),
    },
  } satisfies SavedGameState);

  return reincarnationPoint;
};
