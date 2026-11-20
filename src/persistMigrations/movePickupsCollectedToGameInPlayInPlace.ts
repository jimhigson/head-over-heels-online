import type { PickupsCollected } from "../store/slices/gameInPlay/gameInPlaySlice";

/**
 * a save as written before v28, which kept pickupsCollected in its gameState
 */
export type LegacyPickupsSavedGame = {
  gameState: { pickupsCollected?: PickupsCollected<string> };
  gameInPlay: {
    pickupsCollected?: PickupsCollected<string>;
    reincarnationPoint?: LegacyPickupsSavedGame;
  };
};

/**
 * move one save's pickupsCollected from its gameState to its gameInPlay - not
 * the reincarnation points it carries, which are saves of their own
 */
export const movePickupsCollectedToGameInPlayInPlace = (
  save: LegacyPickupsSavedGame,
): void => {
  save.gameInPlay.pickupsCollected ??= save.gameState.pickupsCollected ?? {};
  delete save.gameState.pickupsCollected;
};
