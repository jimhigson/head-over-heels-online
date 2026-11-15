import { expect, test } from "vitest";

import {
  type LegacyPickupsSavedGame,
  movePickupsCollectedToGameInPlayInPlace,
} from "./movePickupsCollectedToGameInPlayInPlace";

test("moves pickupsCollected from the save's gameState to its gameInPlay", () => {
  const save: LegacyPickupsSavedGame = {
    gameState: { pickupsCollected: { room1: { bag: true } } },
    gameInPlay: {},
  };

  movePickupsCollectedToGameInPlayInPlace(save);

  expect<LegacyPickupsSavedGame>(save).toEqual<LegacyPickupsSavedGame>({
    gameState: {},
    gameInPlay: { pickupsCollected: { room1: { bag: true } } },
  });
});

test("moves pickupsCollected in every save of the reincarnation point chain", () => {
  const save: LegacyPickupsSavedGame = {
    gameState: { pickupsCollected: { room1: { bag: true, fish: true } } },
    gameInPlay: {
      reincarnationPoint: {
        gameState: { pickupsCollected: { room1: { fish: true } } },
        gameInPlay: {},
      },
    },
  };

  movePickupsCollectedToGameInPlayInPlace(save);

  expect<LegacyPickupsSavedGame>(save).toEqual<LegacyPickupsSavedGame>({
    gameState: {},
    gameInPlay: {
      pickupsCollected: { room1: { bag: true, fish: true } },
      reincarnationPoint: {
        gameState: {},
        gameInPlay: { pickupsCollected: { room1: { fish: true } } },
      },
    },
  });
});
