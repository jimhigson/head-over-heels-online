import { describe, test, expect, vi, beforeEach } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { PlayableItem } from "../physics/itemPredicates";
import {
  defaultRoomHeightBlocks,
  playerJumpHeightPx,
} from "../physics/mechanicsConstants";
import { smallItemAabb } from "../collision/boundingBoxes";

import type {
  TestRoomId,
  BasicGameStateOptions,
} from "../../_testUtils/basicRoom";
import {
  basicGameState,
  firstRoomId,
  secondRoomId,
} from "../../_testUtils/basicRoom";
import {
  currentPlayableState,
  headState,
  heelsState,
  itemState,
} from "../../_testUtils/characterState";
import {
  playGameThrough,
  stopJumpingAMomentAfterStartingPlay,
  stopAllInputAfter,
} from "../../_testUtils/playGameThrough";
import type { ItemInPlay } from "../../model/ItemInPlay";
import { blockSizePx } from "../../sprites/spritePivots";
import { testFrameRates } from "../../_testUtils/testFrameRates";
import { selectCurrentRoomState } from "../gameState/gameStateSelectors/selectCurrentRoomState";
import type { CharacterName } from "../../model/modelTypes";
import { individualCharacterNames } from "../../model/modelTypes";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { store } from "../../store/store";
import { iterateRoomItems } from "../../model/RoomState";
import { size } from "iter-tools";

beforeEach(() => {
  store.dispatch({ type: "@@_RESET_FOR_TESTS" });
});

describe("pickups", () => {
  test("character walks into pickup", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "head",
          },
        },
        pickupTwoSquaresFromHead: {
          type: "pickup",
          position: { x: 2, y: 0, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        pickupCharactersWillNotGetInThisTest: {
          type: "pickup",
          position: { x: 4, y: 4, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
      },
    });

    expect(headState(gameState).lives).toBe(8);

    // walk left for one second at 60fps:
    playGameThrough(gameState, {
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = "left";
      },
    });

    // should have recorded collecting the pickup:
    expect(
      gameState.pickupsCollected[firstRoomId]?.["pickupTwoSquaresFromHead"],
    ).toBe(true);
    // the pickup should have disappeared:
    expect(
      selectCurrentRoomState(gameState)?.items["pickupTwoSquaresFromHead"],
    ).toBeUndefined();
    expect(headState(gameState).lives).toBe(10);

    // but not this one (included as a control):
    expect(
      gameState.pickupsCollected[firstRoomId]?.[
        "pickupCharactersWillNotGetInThisTest"
      ],
    ).toBeFalsy();
    expect(
      selectCurrentRoomState(gameState)?.items[
        "pickupCharactersWillNotGetInThisTest"
      ],
    ).not.toBeUndefined();
  });

  test("when character walks into pickup that they are not eligible to collect, they just push it", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "head",
          },
        },
        bag: {
          type: "pickup",
          position: { x: 2, y: 0, z: 0 },
          config: {
            gives: "bag",
          },
        },
      },
    });

    // the pickup should have moved:
    const bagStartingX =
      selectCurrentRoomState(gameState)!.items["bag"].state.position.x;

    playGameThrough(gameState, {
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = "left";
      },
    });

    // should *not* have recorded collecting the pickup:
    expect(gameState.pickupsCollected[firstRoomId]?.["bag"]).toBeUndefined();
    // the pickup should *not* have disappeared:
    expect(selectCurrentRoomState(gameState)?.items["bag"]).toBeDefined();

    // the pickup should have moved (been pushed):
    expect(
      selectCurrentRoomState(gameState)?.items["bag"].state.position.x,
    ).toBeGreaterThan(bagStartingX);
  });

  test("character stand on pickup by walking off adjacent block", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 1 },
          config: {
            which: "head",
          },
        },
        block0: {
          type: "block",
          position: { x: 0, y: 0, z: 0 },
          config: {
            style: "organic",
          },
        },
        block1: {
          type: "block",
          position: { x: 1, y: 0, z: 0 },
          config: {
            style: "organic",
          },
        },
        block2: {
          type: "block",
          position: { x: 2, y: 0, z: 0 },
          config: {
            style: "organic",
          },
        },
        pickupOnTheFloor: {
          type: "pickup",
          position: { x: 3, y: 0, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
      },
    });

    expect(headState(gameState).lives).toBe(8);

    // walk left for one second at 60fps:
    playGameThrough(gameState, {
      until: 3_000,
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = "left";
      },
    });

    // should have recorded collecting the pickup:
    expect(gameState.pickupsCollected[firstRoomId]?.["pickupOnTheFloor"]).toBe(
      true,
    );
    // the pickup should have disappeared:
    expect(
      selectCurrentRoomState(gameState)?.items["pickupOnTheFloor"],
    ).toBeUndefined();
    expect(headState(gameState).lives).toBe(10);
  });

  test("pickup can land on character", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 4, z: 0 },
          config: {
            which: "heels",
          },
        },
        pickupAboveHeels: {
          type: "pickup",
          position: { x: 0, y: 4, z: 2 },
          config: {
            gives: "extra-life",
          },
        },
      },
    });

    // walk left for one second at 60fps:
    playGameThrough(gameState);

    // should have collected the pickup:
    expect(gameState.pickupsCollected[firstRoomId]?.["pickupAboveHeels"]).toBe(
      true,
    );
    expect(heelsState(gameState).lives).toBe(10);
    // the pickup should have disappeared:
    expect(
      selectCurrentRoomState(gameState)?.items["pickupAboveHeels"],
    ).toBeUndefined();
  });

  test("after collecting a fast pickup, head has fast steps", () => {
    // confirms fix for a bug where head couldn't collect the fast steps:
    // https://discord.com/channels/1346483548290285568/1346483548290285571/1386696014236352612

    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 4, z: 0 },
          config: {
            which: "head",
          },
        },
        pickupLeftOfHead: {
          type: "pickup",
          position: { x: 2, y: 4, z: 0 },
          config: {
            gives: "fast",
          },
        },
      },
    });

    //confirm it sets up with this number negative:
    expect(headState(gameState).fastStepsStartedAtDistance).toBeLessThan(0);

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      until(gameState) {
        //picked up means no longer negative:
        return headState(gameState).fastStepsStartedAtDistance > 0;
      },
      // set frame rate low since it doesn't matter for this test:
      frameRate: 15,
    });
  });

  test.todo(
    "pickups do not reload back after collecting, leaving room, and coming back",
    () => {
      const gameState = basicGameState({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 5, y: 2.5, z: 0 },
            config: {
              which: "heels",
            },
          },
          pickupOnFloor: {
            type: "pickup",
            position: { x: 2.5, y: 2, z: 0 },
            config: {
              gives: "extra-life",
            },
          },
          doorToSecondRoom: {
            type: "door",
            position: { x: 0, y: 2, z: 0 },
            config: { direction: "right", toRoom: secondRoomId },
          },
        },
        secondRoomItems: {
          doorToFirstRoom: {
            type: "door",
            position: { x: 8, y: 2, z: 0 },
            config: { direction: "left", toRoom: firstRoomId },
          },
        },
      });

      let visitedSecond = false;

      // walk left for one second at 60fps:
      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "right";
        },
        frameCallbacks(gameState, mockInputStateTracker) {
          if (gameState.characterRooms.heels?.id === "secondRoom") {
            visitedSecond = true;
            // walk back to the first room:
            mockInputStateTracker.mockDirectionPressed = "left";
          }
        },
        until(gameState) {
          return (
            visitedSecond && gameState.characterRooms.heels?.id === "firstRoom"
          );
        },
      });

      expect(gameState.pickupsCollected[firstRoomId]?.["pickupOnFloor"]).toBe(
        true,
      );
      expect(gameState.characterRooms.heels?.id).toBe("firstRoom");
      expect(
        gameState.characterRooms.heels?.items.pickupOnFloor,
      ).toBeUndefined();
    },
  );
});

describe("jumping", () => {
  test.each(testFrameRates)(
    "head can jump between two blocks forming a ladder (%fHz)",
    (frameRate) => {
      const gameState = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 1, z: 0 },
            config: {
              which: "head",
            },
          },
          lowerBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "organic" },
          },
          upperBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 2 },
            config: { style: "organic" },
          },
        },
      });

      playGameThrough(gameState, {
        frameRate,
        until: 1200,
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "towards";
        },
        frameCallbacks: [
          function startJumpingSoonAfterTheStart(gameState) {
            const shouldPressJump =
              gameState.gameTime > 100 && headState(gameState).position.z === 0;

            gameState.inputStateTracker.setMockPressing(
              "jump",
              shouldPressJump,
            );

            // since head gets into the gap, should not go past one block of height:
            expect(headState(gameState).position.z).toBeLessThan(
              blockSizePx.h + 1,
            );
          },
        ],
      });
      expect(headState(gameState).standingOnItemId).toEqual("lowerBlock");
    },
  );

  test.each(testFrameRates)(
    "doesn't snag on the boundary between bounding boxes on the way up a jump (%fHz)",
    (frameRate) => {
      const gameState = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 1, z: 0 },
            config: {
              which: "head",
            },
          },
          // player will need to slide past the boundary between these two blocks via sliding collision
          lowBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "organic" },
          },
          highBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 1 },
            config: { style: "organic" },
          },
        },
      });

      playGameThrough(gameState, {
        until: 1_500,
        frameRate,
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "towards";
          mockInputStateTracker.mockPressing("jump");
        },
        frameCallbacks: stopJumpingAMomentAfterStartingPlay,
      });

      expect(headState(gameState).standingOnItemId).toEqual("highBlock");
    },
  );

  test.each(testFrameRates)(
    "doesn't snag on the boundary between bounding boxes while falling (%fHz)",
    (frameRate) => {
      const gameState = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 1, z: 2 },
            config: {
              which: "head",
            },
          },
          // player will need to slide past the boundary between these two blocks via sliding collision
          lowBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "organic" },
          },
          mediumBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 1 },
            config: { style: "organic" },
          },
          highBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 2 },
            config: { style: "organic" },
          },
        },
      });

      // TODO: test that standing on is ull all the way though the fall - should never be a block

      playGameThrough(gameState, {
        // plenty of time to reach the floor:
        until: 3_000,
        frameRate,
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "towards";
        },
        frameCallbacks: [
          stopJumpingAMomentAfterStartingPlay,
          (gameState) => {
            expect(headState(gameState).standingOnItemId).not.toBeOneOf([
              "lowBlock",
              "mediumBlock",
              "highBlock",
            ]);
            return gameState;
          },
        ],
      });
      expect(headState(gameState).position.z).toBe(0);
      expect(headState(gameState).standingOnItemId).toEqual("floor");
    },
  );

  describe.each(testFrameRates)("max jump heights (%fHz)", (frameRate) => {
    describe.each(individualCharacterNames)(
      `%s (without a spring) jump height`,
      (name) => {
        const expectedJumpHeight = playerJumpHeightPx[name];
        test(`expect a height of ${expectedJumpHeight}px`, () => {
          const gameState = basicGameState({
            firstRoomItems: {
              [name]: {
                type: "player",
                position: { x: 1, y: 0, z: 1 },
                config: {
                  which: name,
                },
              },
            },
          });

          let maxFoundHeight = Number.NEGATIVE_INFINITY;
          playGameThrough(gameState, {
            frameRate,
            until: 3_000,
            setupInitialInput(mockInputStateTracker) {
              mockInputStateTracker.mockDirectionPressed = "right";
              mockInputStateTracker.mockPressing("jump");
            },
            frameCallbacks(gameState, mockInputStateTracker) {
              const state = currentPlayableState(gameState);
              maxFoundHeight = Math.max(maxFoundHeight, state.position.z);

              if (state.jumped) {
                // stop pressing jump once we are jumping:
                mockInputStateTracker.mockNotPressing("jump");
              }
            },
          });

          /* 
            variable frame rate simulations aren't that accurate :-/
            to get better than this, we'd need to account for deceleration
            that happens between the velocity being reduced once per frame,
            or have a lower maximum tick delta ms
           */
          const allowableError = 0.95;

          expect(maxFoundHeight).toBeGreaterThan(
            expectedJumpHeight - allowableError,
          );
          expect(maxFoundHeight).toBeLessThan(
            expectedJumpHeight + allowableError,
          );
        });
      },
    );
  });

  test.each(testFrameRates)(
    "head can get onto a 4-high tower by jumping from a spring (%fHz)",
    (frameRate) => {
      // similar to safari9triple (except that needs more blocks under the spring)
      const gameState = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 1, y: 0, z: 1 },
            config: {
              which: "head",
            },
          },
          spring: {
            type: "spring",
            position: { x: 1, y: 0, z: 0 },
            config: {},
          },
          tower: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "tower", times: { z: 4 } },
          },
        },
      });

      playGameThrough(gameState, {
        frameRate,
        until: 3_000,
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "right";
          mockInputStateTracker.mockPressing("jump");
        },
        frameCallbacks(gameState, mockInputStateTracker) {
          if (headState(gameState).jumped) {
            // stop pressing jump once we are jumping:
            mockInputStateTracker.mockNotPressing("jump");
          }
        },
      });
      expect(headState(gameState).standingOnItemId).toEqual("tower");
    },
  );
  test.each(testFrameRates)(
    "head can't get onto a 5-high tower by jumping from a spring (%fHz)",
    (frameRate) => {
      // similar to safari9triple (except that needs more blocks under the spring)
      const gameState = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 1, y: 0, z: 1 },
            config: {
              which: "head",
            },
          },
          spring: {
            type: "spring",
            position: { x: 1, y: 0, z: 0 },
            config: {},
          },
          tower: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "tower", times: { z: 5 } },
          },
        },
      });

      playGameThrough(gameState, {
        frameRate,
        until: 3_000,
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "right";
          mockInputStateTracker.mockPressing("jump");
        },
        frameCallbacks(gameState, mockInputStateTracker) {
          if (headState(gameState).jumped) {
            // stop pressing jump once we are jumping:
            mockInputStateTracker.mockNotPressing("jump");
          }
        },
      });
      expect(headState(gameState).standingOnItemId).not.toEqual("tower");
    },
  );
});

describe("doors", () => {
  test.each([
    {
      x: 1,
      // at this y heels is pefectly aligned to get through the door without colliding with the doorframe
      y: 2.5,
      z: 0,
    },
    {
      x: 1,
      // at this y, heels is not perfectly aligned with the door - needs sliding to get through
      y: 2,
      z: 0,
    },
  ])("moving from first room to second through door", (startPosition) => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: startPosition,
          config: {
            which: "head",
          },
        },
        doorToSecondRoom: {
          type: "door",
          position: { x: 0, y: 2, z: 0 },
          config: { direction: "right", toRoom: secondRoomId },
        },
      },
      secondRoomItems: {
        doorToFirstRoom: {
          type: "door",
          position: { x: 8, y: 2, z: 0 },
          config: { direction: "left", toRoom: firstRoomId },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      until: 2_000,
    });
    expect(selectCurrentRoomState(gameState)?.id).toBe("secondRoom");
  });

  test("character can push each other through a door", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: {
            x: 3,
            // at this y heels is pefectly aligned to get through the door without colliding with the doorframe
            y: 2.5,
            z: 0,
          },
          config: {
            which: "head",
          },
        },
        // heels is here for head to push:
        heels: {
          type: "player",
          position: {
            x: 2,
            // lined up with door, a bit to the right of heels
            y: 2.5,
            z: 0,
          },
          config: {
            which: "heels",
          },
        },
        doorToSecondRoom: {
          type: "door",
          position: { x: 0, y: 2, z: 0 },
          config: { direction: "right", toRoom: secondRoomId },
        },
      },
      secondRoomItems: {
        doorToFirstRoom: {
          type: "door",
          position: { x: 8, y: 2, z: 0 },
          config: { direction: "left", toRoom: firstRoomId },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      until(gameState) {
        return (
          gameState.characterRooms.head?.id === "secondRoom" &&
          headState(gameState).standingOnItemId !== null
        );
      },
    });

    // both characters are on the floor - ie, haven't jumped on top of each other
    // due to items appearing overlapping and recovering
    expect(headState(gameState).standingOnItemId).toBe("floor");
    expect(heelsState(gameState).standingOnItemId).toBe("floor");
  });

  test("character can slide down a wall and through a door", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: {
            x: 3,
            y: 2.5,
            // high in the air
            z: 12,
          },
          config: {
            which: "head",
          },
        },
        doorToSecondRoom: {
          type: "door",
          position: { x: 0, y: 2, z: 0 },
          config: { direction: "right", toRoom: secondRoomId },
        },
      },
      secondRoomItems: {
        doorToFirstRoom: {
          type: "door",
          position: { x: 8, y: 2, z: 0 },
          config: { direction: "left", toRoom: firstRoomId },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      until(gameState) {
        return (
          gameState.characterRooms.head?.id === "secondRoom" &&
          headState(gameState).standingOnItemId !== null
        );
      },
    });
  });
});

describe("scrolls", () => {
  // this is tricky because the state this needs is kept in the store - state would leak between
  // test potentially!
  // THIS MAY CAUSE RANDOM FAILURES UNTIL THE STORE IS NO LONGER A SINGLETON!
  test("collecting a scroll in one room means it does not get loaded in another room with the same scroll", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: {
            x: 3,
            // at this y heels is pefectly aligned to get through the door without colliding with the doorframe
            y: 2.5,
            z: 0,
          },
          config: {
            which: "head",
          },
        },
        scrollThatGetsPickedUp: {
          type: "pickup",
          config: { gives: "scroll", page: "bag" },
          position: { x: 1, y: 2.5, z: 0 },
        },
        scrollThatDoesNotGetPickedUp: {
          type: "pickup",
          config: { gives: "scroll", page: "crowns" },
          position: { x: 5, y: 2.5, z: 0 },
        },
        doorToSecondRoom: {
          type: "door",
          position: { x: 0, y: 2, z: 0 },
          config: { direction: "right", toRoom: secondRoomId },
        },
      },
      secondRoomItems: {
        doorToFirstRoom: {
          type: "door",
          position: { x: 8, y: 2, z: 0 },
          config: { direction: "left", toRoom: firstRoomId },
        },
        scrollThatShouldNotLoad: {
          type: "pickup",
          config: { gives: "scroll", page: "bag" },
          position: { x: 0, y: 0, z: 0 },
        },
        scrollThatShouldLoad: {
          type: "pickup",
          config: { gives: "scroll", page: "crowns" },
          position: { x: 0, y: 0, z: 1 },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      until: (gameState) =>
        selectCurrentRoomState(gameState)?.id === "secondRoom",
    });

    expect(
      selectCurrentRoomState(gameState)?.items["scrollThatShouldNotLoad"],
    ).toBeUndefined();
    expect(
      selectCurrentRoomState(gameState)?.items["scrollThatShouldLoad"],
    ).toBeDefined();
  });
});

describe("teleporter", () => {
  test("can teleport to the next room", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 2, z: 1 },
          config: {
            which: "heels",
          },
        },
        teleporter: {
          type: "teleporter",
          position: { x: 0, y: 2, z: 0 },
          config: { toRoom: secondRoomId, toPosition: { x: 0, y: 2, z: 0 } },
        },
      },
      secondRoomItems: {
        teleporterLanding: {
          type: "block",
          position: { x: 0, y: 2, z: 0 },
          config: { style: "organic" },
        },
      },
    });

    playGameThrough(gameState, {
      frameRate: 15,

      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("jump");
      },
      frameCallbacks(gameState) {
        if (gameState.characterRooms.heels?.id === "secondRoom") {
          // stop jumping when gone through the teleporter
          gameState.inputStateTracker.mockNotPressing("jump");
        }
      },
      until(gameState) {
        return heelsState(gameState).standingOnItemId === "teleporterLanding";
      },
    });
  });
});

describe("conveyors", () => {
  test("items move on conveyors and can slide on top of other items", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        portableBlock: {
          type: "portableBlock",
          position: { x: 0, y: 0, z: 7 },
          config: {
            style: "cube",
          },
        },
        // block needs to be higher than player by enough (enough delayed in their fall)
        // that it doesn't land on the player while
        // player is moving on conveyor, or push the player while they're falling from the conveyor
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 2 },
          config: {
            which: "heels",
          },
        },
        conveyor: {
          type: "conveyor",
          position: { x: 0, y: 0, z: 0 },
          config: { direction: "away" },
        },
      },
    });

    playGameThrough(gameState, {
      until: 4_000,
    });
    const {
      items: { portableBlock },
    } = selectCurrentRoomState(gameState)!;
    // heels should have moved on the conveyor, fallen off, and now be on the floor next to it:
    expect(heelsState(gameState).standingOnItemId).toEqual("floor");
    expect(heelsState(gameState).position).toEqual({
      x: 1,
      y: blockSizePx.d,
      z: 0,
    });

    // the block should have also moved on the conveyor, and now be on heels:
    expect(
      (portableBlock as ItemInPlay<"portableBlock">).state.standingOnItemId,
    ).toEqual("heels");
    expect(portableBlock?.state.position).toEqual({
      x: 2,
      y: blockSizePx.d,
      z: blockSizePx.h,
    });
  });

  test("conveyors can take item around corners (see blacktooth26)", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        portableBlock: {
          type: "portableBlock",
          position: { x: 0, y: 0, z: 4 },
          config: {
            style: "cube",
          },
        },
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 2 },
          config: {
            which: "heels",
          },
        },
        // passing this requires only using the conveyor standingOn is set to when vertically on two of them
        conveyor1: {
          type: "conveyor",
          position: { x: 0, y: 0, z: 0 },
          config: { direction: "away" },
        },
        // note: different direction
        conveyor2: {
          type: "conveyor",
          position: { x: 0, y: 1, z: 0 },
          config: { direction: "left" },
        },
        // note: direction change again
        conveyor3: {
          type: "conveyor",
          position: { x: 1, y: 1, z: 0 },
          config: { direction: "away" },
        },
      },
    });

    playGameThrough(gameState, {
      until: 3_000,
    });

    expect(heelsState(gameState).position).toMatchInlineSnapshot(`
      {
        "x": 16,
        "y": 32,
        "z": 0,
      }
    `);
  });
});

describe("deadly blocks", () => {
  test("player loses life on touching volcano", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 2 },
          config: {
            which: "head",
          },
        },
        deadlyBlock: {
          type: "deadlyBlock",
          position: { x: 0, y: 0, z: 0 },
          config: { style: "volcano" },
        },
      },
      secondRoomItems: {
        heels: {
          type: "player",
          position: { x: 2, y: 2, z: 0 },
          config: {
            which: "heels",
          },
        },
      },
    });

    playGameThrough(gameState, {
      // this needs a long time now that the player gets invulnerability after dying for a few seconds
      until: (gameState) => gameState.characterRooms.head === undefined,
      frameRate: 15, // keep frame rate low to reduce computation since this runs for a long time
    });

    // heels fell on to the volcano and lost a life repeatedly until none left and switched to heels
    expect(gameState.characterRooms.head).toBe(undefined);
    expect(gameState.currentCharacterName).toBe("heels");
    expect(selectCurrentRoomState(gameState)?.id).toBe("secondRoom");
  });

  test("can't jump off of spikes during death animation", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 1.5 },
          config: {
            which: "head",
          },
        },
        spikes: {
          type: "spikes",
          position: { x: 0, y: 0, z: 0 },
          config: {},
        },
      },
      secondRoomItems: {
        heels: {
          type: "player",
          position: { x: 2, y: 2, z: 0 },
          config: {
            which: "heels",
          },
        },
      },
    });

    let sawDeathAction = false;
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("jump");
      },
      // this needs a long time now that the player gets invulnerability after dying for a few seconds
      frameCallbacks(gameState) {
        const hs = headState(gameState);
        if (hs.action === "death") {
          sawDeathAction = true;
          // should never go above one block of height during death anim:
          expect(hs.position.z).toBe(12);
          expect(hs.jumped).toBe(false);
        }
      },
      until: (gameState) => headState(gameState).lives === 7,
    });
    expect(sawDeathAction).toBe(true);
  });
});

describe("monsters", () => {
  // doesn't test that it rushes towards headOverHeels - loading the campaign doesn't support
  // starting in symbiosis
  test.each(["head", "heels"] as const)(
    "homing bot rushes towards %s",
    (playableName: CharacterName) => {
      const gameState = basicGameState({
        firstRoomItems: {
          [playableName]: {
            type: "player",
            position: { x: 0, y: 0, z: 0 },
            config: {
              which: playableName,
            },
          },
          monster: {
            type: "monster",
            position: { x: 0, y: 3, z: 0 },
            config: {
              which: "homingBot",
              activated: "on",
              movement: "towards-tripped-on-axis-xy4",
            },
          },
        },
      });

      playGameThrough(gameState, {
        // this needs a long time now that the player gets invulnerability after dying for a few seconds
        until(gameState) {
          const currentPlayableItem = selectCurrentPlayableItem(gameState);
          if (currentPlayableItem!.type === "headOverHeels") {
            return currentPlayableItem?.state.head.lives === 7;
          } else {
            return currentPlayableItem?.state.lives === 7;
          }
        },
      });
    },
  );
});

describe("snapping stationary items to pixel grid", () => {
  test("snaps to grid after moving and stopping", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: Math.PI, y: Math.PI, z: 0 },
          config: {
            which: "head",
          },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      frameCallbacks: stopAllInputAfter(400),
      until: 500,
    });

    // this should always be an integer position since head has been stopped for more than a frame
    expect(headState(gameState).position).toMatchInlineSnapshot(`
      {
        "x": 51,
        "y": 60,
        "z": 0,
      }
    `);
  });
});

describe("lifts", () => {
  const liftTop = 3;
  const playerOnALift: BasicGameStateOptions = {
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 1 },
        config: {
          which: "heels",
        },
      },
      lift: {
        type: "lift",
        position: { x: 0, y: 0, z: 0 },
        config: {
          bottom: 0,
          top: liftTop,
        },
      },
    },
  };

  test("heels stays stood on a lift", () => {
    // this is failing because heels hasn't had enough time to fall fast enough to match the lift's fall speed

    const gameState = basicGameState(playerOnALift);
    const heelsStandingOnPerFrame: Array<
      PlayableItem<"heels", TestRoomId>["state"]["standingOnItemId"]
    > = [];

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        // give a little time to fall onto the lift:
        if (gameState.gameTime > 200)
          heelsStandingOnPerFrame.push(heelsState(gameState).standingOnItemId);
      },
      until: 5_000, // run for quite a long time
    });

    expect(heelsStandingOnPerFrame).toMatchObject(
      new Array(heelsStandingOnPerFrame.length).fill("lift"),
    );
  });

  test("player on a lift reaches lift height", () => {
    const gameState = basicGameState(playerOnALift);

    let maxHeight = 0;

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        maxHeight = Math.max(maxHeight, heelsState(gameState).position.z);
      },
      until: 5_000, // run for quite a long time
    });

    const expectedMaxHeight = (liftTop + 1) * blockSizePx.h;

    expect(maxHeight).toBeCloseTo(expectedMaxHeight, 0);
  });

  test("player under a lift blocks it", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 0, y: 0, z: 1 },
          config: {
            bottom: 0,
            top: liftTop,
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: 5_000, // run for quite a long time
    });

    // lift is now stuck on top of the player
    expect(itemState(gameState, "lift")?.position.z).toBe(12);
    // player hasn't moved
    expect(heelsState(gameState).position.z).toBe(0);
  });

  test("lift can take player to next room vertically", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 1 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 0 },
          config: {
            bottom: 0,
            top: defaultRoomHeightBlocks,
          },
        },
      },
      firstRoomProps: {
        roomAbove: "secondRoom",
      },
      secondRoomItems: {
        // a block to stand on when getting to the new room:
        landing: {
          type: "block",
          config: { style: "organic" },
          position: { x: 5, y: 5, z: 0 },
        },
      },
      secondRoomProps: {
        roomBelow: "firstRoom",
        // 2nd room should have no floor?
      },
    });

    playGameThrough(gameState, {
      until: 5_000, // run for quite a long time
    });

    // heels is now in the above room and standing on the landing
    expect(gameState.characterRooms.heels?.id).toEqual("secondRoom");
    expect(heelsState(gameState).standingOnItemId).toEqual("landing");
  });

  test("player partially on lift can be deposited and picked up", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4.5, y: 5, z: 7 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 5 },
          config: {
            bottom: 0,
            top: 9,
          },
        },
        landing: {
          type: "block",
          config: { style: "organic" },
          position: { x: 4, y: 5, z: 5.5 },
        },
      },
    });

    const heelsStandingOnPerFrame: Array<
      PlayableItem<"heels", TestRoomId>["state"]["standingOnItemId"]
    > = [];

    playGameThrough(gameState, {
      until: 5_000, // run for quite a long time
      frameCallbacks(gameState) {
        heelsStandingOnPerFrame.push(heelsState(gameState).standingOnItemId);
      },
    });

    const categories = Object.groupBy(
      heelsStandingOnPerFrame,
      (itemId) => itemId ?? "null",
    ) as {
      lift?: string[];
      landing?: string[];
      null?: string[];
    };

    const fractionOnLanding =
      (categories.landing?.length ?? 0) / heelsStandingOnPerFrame.length;
    // should have spent about half the time on the lift and half on the landing
    // although this needs some slack due to acceleration at the end of the lift's journey
    // making it take more time
    expect(fractionOnLanding).toBeLessThan(0.65);
    expect(fractionOnLanding).toBeGreaterThan(0.35);
  });

  test("player squashed between rising lift and higher block stays in place standing on lift", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4.5, y: 5, z: 1 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 0 },
          config: {
            bottom: 0,
            top: defaultRoomHeightBlocks,
          },
        },
        landing: {
          type: "block",
          config: { style: "organic" },
          position: { x: 4, y: 5, z: 3 },
        },
      },
    });

    playGameThrough(gameState, {
      until: 5_000,
    });

    expect(heelsState(gameState).position.z).toBe(blockSizePx.h * 2);
    expect(heelsState(gameState).standingOnItemId).toEqual("lift");
  });

  test("lift does not move if a heavy item is on it (blacktooth 78)", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 2 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 0 },
          config: {
            bottom: 0,
            top: 5,
          },
        },
        heavyBlock: {
          type: "pushableBlock",
          config: {},
          position: { x: 5, y: 5, z: 1 },
        },
      },
    });

    playGameThrough(gameState, {
      until: 1_000,
    });

    expect(itemState(gameState, "lift")!.position.z).toBeCloseTo(0);
    expect(heelsState(gameState).position.z).toEqual(blockSizePx.h * 2);
    expect(heelsState(gameState).standingOnItemId).toEqual("heavyBlock");
  });
});

describe("carrying", () => {
  test("heels can pick up a cube", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 2 },
          config: {
            which: "heels",
          },
        },
        bag: {
          type: "pickup",
          position: { x: 5, y: 5, z: 1 },
          config: {
            gives: "bag",
          },
        },
        portable: {
          type: "portableBlock",
          position: { x: 5, y: 5, z: 0 },
          config: {
            style: "cube",
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: 2_000,
      frameCallbacks(gameState) {
        const hs = heelsState(gameState);

        if (hs.standingOnItemId === "portable" && hs.carrying === null) {
          gameState.inputStateTracker.mockPressing("carry");
        }
      },
    });

    expect(heelsState(gameState).carrying?.type).toBe("portableBlock");
  });

  test("heels can jump-pick up a cube by holding jump and carry while falling onto it", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 2 },
          config: {
            which: "heels",
          },
        },
        bag: {
          type: "pickup",
          position: { x: 5, y: 5, z: 1 },
          config: {
            gives: "bag",
          },
        },
        portable: {
          type: "portableBlock",
          position: { x: 5, y: 5, z: 0 },
          config: {
            style: "cube",
          },
        },
        // can only get on this block with the cube by carry-jumping:
        higherBlock: {
          type: "block",
          position: { x: 4, y: 5, z: 1 },
          config: {
            style: "organic",
          },
        },
      },
    });

    playGameThrough(gameState, {
      frameRate: 15,
      until: () => heelsState(gameState).standingOnItemId !== "higherBlock",
      frameCallbacks(gameState) {
        gameState.inputStateTracker.mockPressing("right");
        gameState.inputStateTracker.mockPressing("carry");
        gameState.inputStateTracker.mockPressing("jump");
      },
    });
  });
});

describe("pushing", () => {
  const withBlockToPush: BasicGameStateOptions = {
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "heels",
        },
      },
      somethingToPush: {
        type: "portableBlock",
        position: { x: 0, y: 1, z: 0 },
        config: {
          style: "cube",
        },
      },
      soothingToPushInto: {
        type: "block",
        position: { x: 0, y: 4, z: 0 },
        config: {
          style: "organic",
        },
      },
    },
  };

  test("player pushes a block until reaching an obstruction", () => {
    const gameState = basicGameState(withBlockToPush);

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      until: 2_000,
    });

    expect(itemState(gameState, "somethingToPush")?.position.y).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.w * 3 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.w - smallItemAabb.x),
    );
  });

  test("can push multiple blocks in a row", () => {
    const gameState = basicGameState({
      ...withBlockToPush,
      firstRoomItems: {
        ...withBlockToPush.firstRoomItems,
        somethingToPush2: {
          type: "portableBlock",
          position: { x: 0, y: 2, z: 0 },
          config: {
            style: "cube",
          },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      until: 2_000,
    });

    expect(itemState(gameState, "somethingToPush2")?.position.y).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.w * 3 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.w - smallItemAabb.x),
    );
  });

  test("can not push a charging cyberman", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        toaster: {
          type: "deadlyBlock",
          position: { x: 2, y: 0, z: 0 },
          config: {
            style: "toaster",
          },
        },
        cyberman: {
          type: "monster",
          position: { x: 2, y: 0, z: 0 },
          config: {
            which: "cyberman",
            activated: "off",
            movement: "towards-on-shortest-axis-xy4",
            startDirection: "right",
          },
        },
        block: {
          type: "block",
          position: { x: 0, y: 0, z: 0 },
          config: {
            style: "artificial",
            times: { x: 2 },
          },
        },
        // a shield so it can be pushed against without losing a life:
        shield: {
          type: "pickup",
          position: { x: 1, y: 0, z: 1 },
          config: {
            gives: "shield",
          },
        },
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 1 },
          config: {
            which: "heels",
          },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      until: 2_000,
    });

    expect(itemState(gameState, "cyberman")?.position.x).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.w * 2 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.w - smallItemAabb.x) / 2,
    );
  });
});

describe("jumping", () => {
  test.todo("heels can't jump between a two block gap", () => {
    //     (h) --> jump    can't land here
    // (block) (gap) (gap) (block)
  });
});

describe("dissapearing items", () => {
  const gameStateWithDisappearingBlocks = () =>
    basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 1 },
          config: {
            which: "heels",
          },
        },
        disappearingBlock0: {
          type: "block",
          position: { x: 0, y: 0, z: 0 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
          },
        },
        disappearingBlock1: {
          type: "block",
          // note elevated block tests that can get up on and jump off disappearing blocks
          // - this is needed for heels' tricky jumping rooms such as #egyptus15
          position: { x: 0, y: 1, z: 1 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
          },
        },
        disappearingBlock2: {
          type: "block",
          position: { x: 0, y: 2, z: 0 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
          },
        },
        disappearingBlock3: {
          type: "block",
          position: { x: 0, y: 3, z: 0 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
          },
        },
        pickup: {
          type: "pickup",
          position: { x: 0, y: 4, z: 2 },
          config: {
            gives: "extra-life",
          },
        },
      },
      firstRoomDeadlyFloor: true,
    });

  test("can jump along a line of disappearing blocks", () => {
    playGameThrough(gameStateWithDisappearingBlocks(), {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
        mockInputStateTracker.mockPressing("jump");
      },
      frameCallbacks(gameState) {
        // should not lose any lives
        expect(heelsState(gameState).lives).toBeGreaterThanOrEqual(8);
      },
      until(gameState) {
        // got two more lives
        return heelsState(gameState).lives === 10;
      },
    });
  });
  test("can partially destroy a multiplied dissapearing blocks in the json", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 3, y: 0, z: 3 },
          config: {
            which: "heels",
          },
        },
        // 3- long block, but should only land on the middle one:
        disappearingBlock0: {
          type: "block",
          position: { x: 2, y: 0, z: 0 },
          config: {
            style: "organic",
            times: { x: 3 },
            disappearing: { on: "stand" },
          },
        },
      },
      firstRoomDeadlyFloor: true,
    });

    playGameThrough(gameState, {
      until: 2_000,
    });

    const blocksInRoomCount = size(
      iterateRoomItems(gameState.characterRooms.heels!.items).filter(
        (item) => item.type === "block",
      ),
    );

    expect(blocksInRoomCount).toBe(2);
  });
  test("can not walk along a line of disappearing blocks", () => {
    playGameThrough(gameStateWithDisappearingBlocks(), {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
        // not jumping
      },
      until(gameState) {
        // lost a life
        return heelsState(gameState).lives === 7;
      },
    });
  });
  test("can jump along a line of pickups, collecting them", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 2 },
          config: {
            which: "heels",
          },
        },
        disappearingpickup0: {
          type: "pickup",
          position: { x: 0, y: 0, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        disappearingpickup1: {
          type: "pickup",
          position: { x: 0, y: 1, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        disappearingpickup2: {
          type: "pickup",
          position: { x: 0, y: 2, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        disappearingpickup3: {
          type: "pickup",
          // note the block is higher, testing that the player can climb up disappearing blocks as heels.
          // this requires that they don't vanish as soon as they are touched, but only when stood on
          position: { x: 0, y: 3, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
      },
      firstRoomDeadlyFloor: true,
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
        mockInputStateTracker.mockPressing("jump");
      },
      frameCallbacks(gameState) {
        // should not lose any lives. If this happens, was not able to jump off pickups as they are collected
        // and fell onto the deadly floor
        expect(heelsState(gameState).lives).toBeGreaterThanOrEqual(8);
      },
      until(gameState) {
        // got 4 x 2 more lives
        return heelsState(gameState).lives === 16;
      },
    });
  });
});

test("platforms that move on stand", () => {
  const gameState = basicGameState({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 3 },
        config: {
          which: "heels",
        },
      },
      // heels falls onto this, activating it:
      moving: {
        type: "movingPlatform",
        config: {
          activated: "on-stand",
          movement: "back-forth",
          startDirection: "left",
        },
        position: { x: 0, y: 0, z: 0 },
      },
      // it takes her into this, losing a life:
      deadly: {
        type: "deadlyBlock",
        position: { x: 4, y: 0, z: 1 },
        config: {
          style: "volcano",
        },
      },
    },
  });
  playGameThrough(gameState, {
    until(gameState) {
      return heelsState(gameState).lives === 7;
    },
  });
});

test("monsters don't fall out of rooms via the doorways", () => {
  const gameState = basicGameState({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      monster: {
        type: "monster",
        // line up on half square to walk through the doorway:
        position: { x: 0.5, y: 4, z: 0 },
        config: {
          which: "skiHead",
          startDirection: "towards",
          activated: "on",
          movement: "back-forth",
          style: "greenAndPink",
        },
      },
      door: {
        type: "door",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          toRoom: "secondRoom",
        },
      },
    },
  });
  playGameThrough(gameState, { until: 10_000 });

  const monsterPosition =
    gameState.characterRooms.heels?.items.monster.state.position;
  // test that the monster is still in the room:
  expect(monsterPosition?.z).toEqual(0); //didn't fall through the floor
  expect(monsterPosition?.y).toBeGreaterThan(0); //didn't leave through the door
});

describe("touching", () => {
  test("standing overlapping the edge of a block, a monster on the floor doesn't kill the player", () => {});
});

describe("reincarnation", () => {
  test("saves the game without the fish in it", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: 4, z: 2 },
          config: {
            which: "heels",
          },
        },
        fish: {
          type: "pickup",
          // line up on half square to walk through the doorway:
          position: { x: 4, y: 4, z: 0 },
          config: {
            gives: "reincarnation",
          },
        },
      },
    });
    // check there isn't already a reincarnation point before we start (the store is initialised)
    expect(store.getState().gameMenus.reincarnationPoint).toBe(undefined);

    playGameThrough(gameState, {
      until: () => store.getState().gameMenus.reincarnationPoint !== undefined,
    });

    const reincarnationPointHeelsRoomItems =
      store.getState().gameMenus.reincarnationPoint?.gameState.characterRooms
        .heels?.items;

    if (!reincarnationPointHeelsRoomItems) {
      expect.fail(
        "expected the room to exist in the reincarnation point, but it does not",
      );
    }

    expect(reincarnationPointHeelsRoomItems.fish).toBe(undefined);
    expect(reincarnationPointHeelsRoomItems.floor.state.stoodOnBy["fish"]).toBe(
      undefined,
    );
  });
});
