import { type CharacterName } from "../../model/modelTypes";
import { type GameState } from "../gameState/GameState";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { type PlayableItem } from "../physics/itemPredicates";

/**
 * e2e-only: install `window.__e2e_currentPlayable`, giving the item the player
 * is currently controlling. Specs run their queries inside the browser, where
 * they cannot reach the selectors directly, so without this each one walks
 * `characterRooms` itself - which is how a rename of the item state's fields
 * went unnoticed until it failed at runtime
 */
export const installE2eCurrentPlayableHandle = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  if (import.meta.env.MODE !== "visual-regression") {
    throw new Error("visual regression code only");
  }

  window.__e2e_currentPlayable = () =>
    selectCurrentPlayableItem(gameState) as
      PlayableItem<CharacterName, string, string> | undefined;
};
