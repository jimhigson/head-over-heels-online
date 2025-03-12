import type { RootState } from "../../../store/store";
import { pick } from "../../../utils/pick";
import type { GameState } from "../GameState";
import {
  savedGameGameMenuSliceFields,
  savedGameGameStateFields,
  type SavedGameState,
} from "./SavedGameState";

export const createSavableReincarnationPoint = <RoomId extends string>(
  gameState: GameState<RoomId>,
  storeState: RootState,
) => {
  // we stringify->parse (not structuredClone) because we want to
  // explicitly find circular structures or non-serializable data
  const reincarnationPoint: SavedGameState = JSON.parse(
    JSON.stringify({
      saveTime: Date.now(),
      screenshotBase64: "IAMANIMAGE",
      gameState: pick(gameState, ...savedGameGameStateFields),
      store: {
        gameMenus: pick(storeState.gameMenus, ...savedGameGameMenuSliceFields),
      },
    } satisfies SavedGameState),
  );

  return reincarnationPoint;
};
