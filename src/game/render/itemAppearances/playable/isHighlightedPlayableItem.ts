import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import { type CharacterName } from "../../../../model/modelTypes";
import { type GameState } from "../../../gameState/GameState";
import { switchCharacterHighlightTime } from "../../../physics/mechanicsConstants";

const isHighlighted = (
  {
    gameTime,
    switchedToAt,
  }: {
    switchedToAt: number;
    gameTime: number;
  },
  characterName: CharacterName,
  currentCharacterName: CharacterName,
): boolean =>
  (characterName === "headOverHeels" ||
    characterName === currentCharacterName) &&
  switchedToAt + switchCharacterHighlightTime > gameTime;

/**
 * show the outline highlight from when the player has just switched to this
 * character?
 */
export const isHighlightedPlayableItem = (
  gameState: Pick<GameState, "currentCharacterName"> | undefined,
  playableItem: ItemTypeUnion<
    "head" | "headOverHeels" | "heels",
    string,
    string
  >,
): boolean =>
  // if no game state, there isn't any game (probably rendering for the level
  // editor) so do not highlight
  gameState !== undefined &&
  (playableItem.type === "headOverHeels" ?
    // cheat by just looking if head is highlighted inside the symbiosis and use
    // that result for both characters - they were switched to at the same time
    // so it doesn't matter:
    isHighlighted(playableItem.state.head, "headOverHeels", "headOverHeels")
  : isHighlighted(
      playableItem.state,
      playableItem.type,
      gameState.currentCharacterName,
    ));
