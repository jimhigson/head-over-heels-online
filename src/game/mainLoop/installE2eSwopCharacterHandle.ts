import { type IndividualCharacterName } from "../../model/modelTypes";
import { type GameState } from "../gameState/GameState";
import { swopPlayables } from "../gameState/mutators/swopPlayables";

/**
 * e2e-only: install `window.__e2e_swopCharacter`, which swops the active
 * character to a named one (head/heels) by calling the swop mutator directly.
 * The normal swop input is only read inside the speed-scaled physics step, so
 * it can never fire while the game speed is zero (as the visual-regression
 * specs run) - this handle bypasses the input path, deterministically and with
 * no ticks.
 */
export const installE2eSwopCharacterHandle = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  if (import.meta.env.MODE !== "visual-regression") {
    throw new Error("visual regression code only");
  }

  window.__e2e_swopCharacter = (name: IndividualCharacterName) => {
    swopPlayables(gameState, name);
  };
};
