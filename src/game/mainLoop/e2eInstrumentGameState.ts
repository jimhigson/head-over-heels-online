import { type CharacterName } from "../../model/modelTypes";
import { type GameState } from "../gameState/GameState";
import { E2EEventBus } from "./E2EEventBus";

/**
 * e2e-only: instrument the game state for when some things change
 */
export const e2eInstrumentGameState = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  if (import.meta.env.MODE !== "visual-regression") {
    throw new Error("visual regression code only");
  }

  let { currentCharacterName } = gameState;

  Object.defineProperty(gameState, "currentCharacterName", {
    get: () => currentCharacterName,
    set(characterName: CharacterName) {
      currentCharacterName = characterName;
      E2EEventBus.emit("characterChanged", { characterName });
    },
    // enumerable so saving (which reads the game state's own keys) is unchanged
    enumerable: true,
    configurable: true,
  });
};
