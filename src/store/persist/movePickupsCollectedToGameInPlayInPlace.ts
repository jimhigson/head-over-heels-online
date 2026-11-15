import { type PickupsCollected } from "../slices/gameInPlay/gameInPlaySlice";

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
 * move a save's pickupsCollected from its gameState to its gameInPlay,
 * including in its chain of reincarnation points
 */
export const movePickupsCollectedToGameInPlayInPlace = (
  save: LegacyPickupsSavedGame,
): void => {
  save.gameInPlay.pickupsCollected ??= save.gameState.pickupsCollected ?? {};
  delete save.gameState.pickupsCollected;
  // reincarnation points are saves too, nested as a linked list:
  if (save.gameInPlay.reincarnationPoint !== undefined) {
    movePickupsCollectedToGameInPlayInPlace(save.gameInPlay.reincarnationPoint);
  }
};
