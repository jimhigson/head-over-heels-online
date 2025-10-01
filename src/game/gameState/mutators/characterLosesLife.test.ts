import { beforeEach, describe, expect, test } from "vitest";

import { resetStore } from "../../../_testUtils/initStoreForTests";
import { mutatorsTestHarness } from "../../../_testUtils/mutatorsTestHarness";
import {
  individualCharacterNames,
  otherIndividualCharacterName,
} from "../../../model/modelTypes";
import { originalGameStartingLives } from "../../physics/mechanicsConstants";
import { selectAbilities } from "../gameStateSelectors/selectPlayableItem";

beforeEach(() => {
  resetStore();
});

describe("while not in symbiosis", () => {
  describe.each(individualCharacterNames)(
    "%s loses life",
    (playableLosingLifeName) => {
      const otherName = otherIndividualCharacterName(playableLosingLifeName);

      describe(`and it is ${playableLosingLifeName}'s last life`, () => {
        test(`but ${otherName} has >2 lives left - Retrospec model applies`, () => {
          const h = mutatorsTestHarness();

          h.swopToPlayer(playableLosingLifeName);
          h.playableLosesLives(
            playableLosingLifeName,
            originalGameStartingLives,
          );
          // player who lost lives is still in the game:
          expect(h.selectPlayable(playableLosingLifeName)).not.toBeUndefined();
          // they got one back from the other player:
          expect(h.selectPlayable(playableLosingLifeName)?.state.lives).toEqual(
            1,
          );
          // to do this the other sacrificed 2:
          expect(h.selectPlayable(otherName)?.state.lives).toEqual(6);

          // we are still on the same character:
          expect(h.gameState.currentCharacterName).toEqual(
            playableLosingLifeName,
          );
          h.expectGameContinues();
          h.teardown();
        });
        test(`but ${otherName} has exactly 2 lives left - the 2 are shared for one last try at doing the game`, () => {
          const h = mutatorsTestHarness();

          // other player loses all but 2:
          h.playableLosesLives(otherName, originalGameStartingLives - 2);

          h.swopToPlayer(playableLosingLifeName);
          h.playableLosesLives(
            playableLosingLifeName,
            originalGameStartingLives,
          );
          // player who lost lives is still in the game:
          expect(h.selectPlayable(playableLosingLifeName)).not.toBeUndefined();
          // they got one back from the other player:
          expect(h.selectPlayable(playableLosingLifeName)?.state.lives).toEqual(
            1,
          );
          // to do this the other sacrificed 1 (since they only had 2):
          expect(h.selectPlayable(otherName)?.state.lives).toEqual(1);
          expect(h.gameState.currentCharacterName).toEqual(
            playableLosingLifeName,
          );
          h.expectGameContinues();
          h.teardown();
        });
        test(`and ${otherName} already out of the game`, () => {
          const h = mutatorsTestHarness();

          // other player loses all their lives:
          h.playableNotInTheGame(otherName);
          h.expectPlayableToBeOutOfTheGame(otherName);

          expect(h.selectPlayable(playableLosingLifeName)).not.toBeUndefined();
          h.playableLosesLives(
            playableLosingLifeName,
            originalGameStartingLives,
          );
          expect(h.selectPlayable(playableLosingLifeName)).toBeUndefined();
          h.expectGameOver();
          h.teardown();
        });
      });
      describe(`but it is not ${playableLosingLifeName}'s last life`, () => {
        test(`while ${otherName} not in game (already lost all lives)`, () => {
          const h = mutatorsTestHarness();
          h.carryItemIfHeels(playableLosingLifeName);

          // other player loses all their lives:
          h.playableNotInTheGame(otherName);
          expect(h.selectPlayable(otherName)).toBeUndefined();

          // now we lose just one life:
          h.playableLosesLives(playableLosingLifeName, 1);
          expect(h.selectPlayable(playableLosingLifeName)).not.toBeUndefined();
          h.expectLifeCount({
            playableName: playableLosingLifeName,
            count: originalGameStartingLives - 1,
          });
          h.expectGameContinues();
          h.expectNotCarryingIfHeels(playableLosingLifeName);
          h.teardown();
        });
        describe(`while ${otherName} is in a different room`, () => {
          test(`${playableLosingLifeName} is in a reloaded version of the same room, with one less life`, () => {
            const h = mutatorsTestHarness();
            h.swopToPlayer(playableLosingLifeName);

            h.carryItemIfHeels(playableLosingLifeName);

            h.playableLosesLives(playableLosingLifeName);

            h.expectGameContinues();

            h.expectCharacterToBeInANonIdenticalCopyOfTheirOriginalRoom(
              playableLosingLifeName,
            );

            // one life less than starting number:
            h.expectLifeCount({
              playableName: playableLosingLifeName,
              count: originalGameStartingLives - 1,
            });

            h.expectNotCarryingIfHeels(playableLosingLifeName);
            h.teardown();
          });
        });
        describe(`while ${otherName} is in the same room`, () => {
          describe("because they both entered the room as headOverHeels, and split once inside", () => {
            test("re-enter the room back in symbiosis", () => {
              const h = mutatorsTestHarness();
              h.playableWalksToRoom("head", "heelsStartingRoom");
              h.putIntoSymbiosis();
              h.playableWalksToRoom("headOverHeels", "thirdRoom");

              h.takeOutOfSymbiosis();

              const roomBeforeLosingLife = h.selectRoomOfPlayable("head")!;

              h.playableLosesLives(playableLosingLifeName);

              expect(h.selectPlayable("head")).toBeUndefined();
              expect(h.selectPlayable("heels")).toBeUndefined();
              expect(h.selectPlayable("headOverHeels")).toBeDefined();
              h.expectRoomToBeNonIdenticalCopy({
                thisRoom: h.selectRoomOfPlayable("headOverHeels"),
                shouldBeACopyOf: roomBeforeLosingLife,
              });
              expect(h.gameState.currentCharacterName).toEqual("headOverHeels");
              h.teardown();
            });
          });
          describe(`because ${otherName} entered ${playableLosingLifeName}'s room`, () => {
            test(`${playableLosingLifeName} is in the original version of the room they started in, with one less life`, () => {
              const h = mutatorsTestHarness();
              h.swopToPlayer(otherName);

              h.playableWalksToRoom(
                otherName,
                h.startingRooms[playableLosingLifeName],
              );

              h.carryItemIfHeels(playableLosingLifeName);

              h.playableLosesLives(playableLosingLifeName);

              h.expectGameContinues();

              h.expectCharacterToBeInRoom(
                playableLosingLifeName,
                // room has not been reloaded (is still original, haven't moved from it)
                h.originalRooms[playableLosingLifeName],
              );
              h.expectCharacterToBeInRoom(
                otherName,
                // the other player is also in the original room of the player who lost a life, having moved there:
                h.originalRooms[playableLosingLifeName],
              );

              // one life less than starting number:
              h.expectLifeCount({
                playableName: playableLosingLifeName,
                count: originalGameStartingLives - 1,
              });

              h.expectNotCarryingIfHeels(playableLosingLifeName);
              h.teardown();
            });
          });
          describe(`because ${playableLosingLifeName} entered ${otherName}'s room`, () => {
            test(`${playableLosingLifeName} is in the original version of the room they moved into, with one less life`, () => {
              const h = mutatorsTestHarness();
              h.swopToPlayer(playableLosingLifeName);

              h.playableWalksToRoom(
                playableLosingLifeName,
                h.startingRooms[otherName],
              );

              h.carryItemIfHeels(playableLosingLifeName);

              h.playableLosesLives(playableLosingLifeName);

              h.expectGameContinues();

              h.expectCharacterToBeInRoom(
                playableLosingLifeName,
                // room has not been reloaded (is still original)
                h.originalRooms[otherName],
              );

              // one life less than starting number:
              h.expectLifeCount({
                playableName: playableLosingLifeName,
                count: originalGameStartingLives - 1,
              });

              h.expectNotCarryingIfHeels(playableLosingLifeName);
              h.teardown();
            });
          });
        });
      });
    },
  );
});

describe("while in symbiosis", () => {
  describe("after losing lives, neither characters have any lives left", () => {
    test("game ends", () => {
      const h = mutatorsTestHarness();
      h.playableWalksToRoom("head", "heelsStartingRoom");
      h.putIntoSymbiosis();
      h.selectPlayable("headOverHeels")!.state.head.lives = 1;
      h.selectPlayable("headOverHeels")!.state.heels.lives = 1;
      h.playableLosesLives("headOverHeels");
      h.expectGameOver();
      h.teardown();
    });
  });
  describe.each(individualCharacterNames)(
    "after losing lives, only %s has > 1 life",
    (individualWithLivesLeft) => {
      test("having entered the room in symbiosis", () => {
        const h = mutatorsTestHarness();
        h.playableWalksToRoom("head", "heelsStartingRoom");
        h.putIntoSymbiosis();
        h.playableWalksToRoom("headOverHeels", "thirdRoom");

        // now: we have walked into the third room as headOverHeels, having joined in heelsStartingRoom

        h.selectPlayable("headOverHeels")!.state[
          otherIndividualCharacterName(individualWithLivesLeft)
        ].lives = 1;

        const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
        h.playableLosesLives("headOverHeels");

        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable("headOverHeels"),
          shouldBeACopyOf: roomBeforeLosingLife,
        });

        h.expectPlayableToBeInGame("headOverHeels");

        expect(
          h.selectPlayable("headOverHeels")!.state[individualWithLivesLeft]
            .lives,
          // started with 8, lost 1, and transferred 2 to save the other:
        ).toEqual(5);
        expect(
          h.selectPlayable("headOverHeels")!.state[
            otherIndividualCharacterName(individualWithLivesLeft)
          ].lives,
          // had 1 life, lost it, and had one transferred in from the other player to get back to 1:
        ).toEqual(1);

        h.teardown();
      });
      test("having entered the room individually", () => {
        const h = mutatorsTestHarness();
        h.playableWalksToRoom("head", "thirdRoom");
        h.playableWalksToRoom("heels", "thirdRoom");

        h.putIntoSymbiosis();

        // now: we have walked into the third room as individuals, and joined in thirdRoom:
        h.selectPlayable("headOverHeels")!.state[
          otherIndividualCharacterName(individualWithLivesLeft)
        ].lives = 1;

        const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
        h.playableLosesLives("headOverHeels");

        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable("head"),
          shouldBeACopyOf: roomBeforeLosingLife,
        });
        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable("heels"),
          shouldBeACopyOf: roomBeforeLosingLife,
        });

        h.expectPlayableToBeOutOfTheGame("headOverHeels");
        h.expectPlayableToBeInGame("head");
        h.expectPlayableToBeInGame("heels");

        expect(
          h.selectPlayable(individualWithLivesLeft)!.state.lives,
          // started with 8, lost 1, and transferred 2 to save the other:
        ).toEqual(5);
        expect(
          h.selectPlayable(
            otherIndividualCharacterName(individualWithLivesLeft),
          )!.state.lives,
          // had 1 life, lost it, and had one transferred in from the other player to get back to 1:
        ).toEqual(1);
        h.teardown();
      });
    },
  );
  describe.each(individualCharacterNames)(
    "both only have 1 life left (can't apply Retrospec model)",
    (individualWithLivesLeft) => {
      test("having entered the room in symbiosis", () => {
        const h = mutatorsTestHarness();
        h.playableWalksToRoom("head", "heelsStartingRoom");
        h.putIntoSymbiosis();
        h.playableWalksToRoom("headOverHeels", "thirdRoom");

        // now: we have walked into the third room as headOverHeels, having joined in heelsStartingRoom
        h.selectPlayable("headOverHeels")!.state[
          otherIndividualCharacterName(individualWithLivesLeft)
        ].lives = 1;
        h.selectPlayable("headOverHeels")!.state[
          individualWithLivesLeft
        ].lives = 1;

        h.playableLosesLives("headOverHeels");
        h.expectGameOver();
        h.teardown();
      });
      test("having entered the room individually", () => {
        const h = mutatorsTestHarness();
        h.playableWalksToRoom("head", "thirdRoom");
        h.playableWalksToRoom("heels", "thirdRoom");

        h.putIntoSymbiosis();

        // now: we have walked into the third room as headOverHeels, having joined in heelsStartingRoom
        h.selectPlayable("headOverHeels")!.state[
          otherIndividualCharacterName(individualWithLivesLeft)
        ].lives = 1;
        h.selectPlayable("headOverHeels")!.state[
          individualWithLivesLeft
        ].lives = 1;

        h.playableLosesLives("headOverHeels");
        h.expectGameOver();
        h.teardown();
      });
    },
  );
  describe("after losing lives, both characters have lives left", () => {
    test("after entering the room in symbiosis", () => {
      const h = mutatorsTestHarness();
      h.playableWalksToRoom("head", "heelsStartingRoom");
      h.putIntoSymbiosis();
      h.playableWalksToRoom("headOverHeels", "thirdRoom");

      h.carryItemIfHeels("headOverHeels");
      expect(selectAbilities(h.gameState, "heels")!.carrying).not.toBeNull();

      // now: we have walked into the third room in symbiosis from heel's starting room:

      const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
      h.playableLosesLives("headOverHeels");

      h.expectRoomToBeNonIdenticalCopy({
        thisRoom: h.selectRoomOfPlayable("headOverHeels"),
        shouldBeACopyOf: roomBeforeLosingLife,
      });

      h.expectPlayableToBeInGame("headOverHeels");
      expect(selectAbilities(h.gameState, "heels")!.carrying).toBeNull();
      h.expectPlayableToBeOutOfTheGame("heels");
      h.expectPlayableToBeOutOfTheGame("head");
      h.teardown();
    });
    describe("after entering the room individually", () => {
      /*  
      "Completion imminent, Ritman proceeded with his rigorous bug testing. A perfectionist,
      he would frequently track bugs while coding to avoid consequent errors. 
      "But one got through...only one..." he grimaces, draining the last of his pilsner. 
      "A friend of mine came round and wanted to play the game. I popped to the shop and was 
      gone five minutes. When I came back the game was frozen!"  
      from: https://www.eurogamer.net/the-making-of-head-over-heels
      */
      test(`having entered via the same door (would collide after room being reloaded and characters put in), 
        characters rejoin joined and at that door to avoid restarting with colliding individuals`, () => {
        const h = mutatorsTestHarness();
        h.playableWalksToRoom("head", "heelsStartingRoom");
        // both enter thirdRoom from heelsStartingRoom
        h.playableWalksToRoom("head", "thirdRoom");
        h.playableWalksToRoom("heels", "thirdRoom");
        h.carryItemIfHeels("heels");
        h.putIntoSymbiosis();

        // still has the item heels was carrying
        expect(selectAbilities(h.gameState, "heels")!.carrying).not.toBeNull();

        const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
        h.playableLosesLives("headOverHeels");

        // now: we entered as individuals, joined, and died. We need to re-enter the room in symbiosis
        // to avoid colliding at the entry door:

        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable("headOverHeels"),
          shouldBeACopyOf: roomBeforeLosingLife,
        });

        h.expectPlayableToBeInGame("headOverHeels");
        h.expectPlayableToBeOutOfTheGame("head");
        h.expectPlayableToBeOutOfTheGame("heels");

        h.expectPlayableToBeStoodAtPortal(
          "headOverHeels",
          "thirdRoom",
          "doorToHeelsStartingRoom",
        );
        // should no longer be carrying after death:
        expect(selectAbilities(h.gameState, "heels")!.carrying).toBeNull();
        h.expectPlayableAction("headOverHeels", "moving");
        h.teardown();
      });
      test("having entered via different doors, room is reloaded with characters separate and at their respective doors", () => {
        const h = mutatorsTestHarness();
        // both enter thirdRoom from their respective starting rooms:
        h.playableWalksToRoom("head", "thirdRoom");
        h.playableWalksToRoom("heels", "thirdRoom");
        h.putIntoSymbiosis();

        const roomBeforeLosingLife = h.selectRoomOfPlayable("headOverHeels")!;
        h.playableLosesLives("headOverHeels");

        // now: we entered as individuals, joined, and died. We need to re-enter the room in symbiosis
        // to avoid colliding at the entry door:

        h.expectRoomToBeNonIdenticalCopy({
          thisRoom: h.selectRoomOfPlayable("head"),
          shouldBeACopyOf: roomBeforeLosingLife,
        });
        // head and heels are in the same rooms
        expect(h.selectRoomOfPlayable("head")).toEqual(
          h.selectRoomOfPlayable("heels"),
        );

        h.expectPlayableToBeOutOfTheGame("headOverHeels");

        h.expectPlayableToBeStoodAtPortal(
          "head",
          "thirdRoom",
          "doorToHeadStartingRoom",
        );
        h.expectPlayableToBeStoodAtPortal(
          "heels",
          "thirdRoom",
          "doorToHeelsStartingRoom",
        );
        h.expectPlayableAction("head", "moving");
        h.expectPlayableAction("heels", "moving");
        h.teardown();
      });
    });
  });
});
