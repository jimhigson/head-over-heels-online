import {
  addPokeableNumbers,
  type PokeableNumber,
  pokeableToNumber,
} from "../../../model/itemInPlay/ItemStateMap";

export type LivesAfterLosingLife = {
  /**
   * the lives of the character that lost the life
   */
  losingLives: PokeableNumber;
  /**
   * the other character's lives, less any they gave
   */
  otherLives: PokeableNumber;
};

/**
 * the lives left once a character loses a life, by the innovation copied from
 * Retrospec: it avoids an unwinnable game when one character loses all their
 * lives but the other is still playing, while still making getting down to
 * zero lives a problem
 */
export const livesAfterLosingLife = (
  losingLives: PokeableNumber,
  /**
   * 0 when there is no other character to give a life
   */
  otherLives: PokeableNumber,
  livesLost: -1 | 0,
): LivesAfterLosingLife => {
  const losingLivesLeft = addPokeableNumbers(losingLives, livesLost);

  // allow the other player to send one of their lives over - this is the Retrospec revised lives model
  // and avoids an unwinnable situation where one player has lost all their lives but the other continues playing
  // an unwinnable game:
  const otherLivesNumber = pokeableToNumber(otherLives);
  if (losingLivesLeft === 0 && otherLivesNumber >= 2) {
    return {
      losingLives: addPokeableNumbers(losingLivesLeft, 1),
      otherLives: addPokeableNumbers(
        otherLives,
        otherLivesNumber > 2 ?
          // sacrifice two to continue with one:
          -2
          // make an exception if the other character has exactly 2 lives left -
          // they can give one life but keep one so they can continue playing:
        : -1,
      ),
    };
  }
  return { losingLives: losingLivesLeft, otherLives };
};
