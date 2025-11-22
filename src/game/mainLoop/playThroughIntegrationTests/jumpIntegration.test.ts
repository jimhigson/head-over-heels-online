import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import {
  currentPlayableState,
  headState,
  heelsState,
  itemState,
} from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import {
  playGameThrough,
  stopJumpingAMomentAfterStartingPlay,
} from "../../../_testUtils/playGameThrough";
import { testFrameRates } from "../../../_testUtils/testFrameRates";
import { individualCharacterNames } from "../../../model/modelTypes";
import { blockSizePx } from "../../../sprites/spritePivots";
import { smallItemAabb } from "../../collision/boundingBoxes";
import { playerJumpHeightPx } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

describe("jumping", () => {
  test.each(testFrameRates)(
    "head can jump between two blocks forming a ladder (%j)",
    (frameRate) => {
      const gameState = setUpBasicGame({
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
    "doesn't snag on the boundary between bounding boxes on the way up a jump (%j)",
    (frameRate) => {
      const gameState = setUpBasicGame({
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
    "doesn't snag on the boundary between bounding boxes while falling (%j)",
    (frameRate) => {
      const gameState = setUpBasicGame({
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

  describe.each(testFrameRates)("max jump heights (%j)", (frameRate) => {
    describe.each(individualCharacterNames)(
      `%s (without a spring) jump height`,
      (name) => {
        const expectedJumpHeight = playerJumpHeightPx[name];
        test(`expect a height of ${expectedJumpHeight}px`, () => {
          const gameState = setUpBasicGame({
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
            Not so much allowable error, as FOUND error!

            Variable tick step simulations aren't that accurate :-/
            to get better than this, we'd need to account for deceleration
            that happens between the velocity being reduced once per frame,
            or have a lower maximum tick delta ms

            ~2px between lowest and highest jump height isn't that fair
            to players on different spec hardware!
           */
          const allowableError = [-0.66, 1];

          expect(maxFoundHeight).toBeGreaterThan(
            expectedJumpHeight + allowableError[0],
          );
          expect(maxFoundHeight).toBeLessThan(
            expectedJumpHeight + allowableError[1],
          );
        });
      },
    );
  });

  describe.each(testFrameRates)("distance %j", (frameRate) => {
    const expectedJumpDistances = {
      head: blockSizePx.w * 3 - 1.5,
      // expect heels to be able to (only just) bridge a 2-block gap:
      heels: blockSizePx.w * 2 - smallItemAabb.x + 0.75,
    };

    describe.each(individualCharacterNames)(`%s`, (name) => {
      const expectedJumpDistance = expectedJumpDistances[name];

      test(`expect a distance of ~${expectedJumpDistance}px`, () => {
        const gameState = setUpBasicGame({
          firstRoomItems: {
            [name]: {
              type: "player",
              position: { x: 1, y: 0, z: 0 },
              config: {
                which: name,
              },
            },
          },
        });

        expect(currentPlayableState(gameState).standingOnItemId).toEqual(
          "floor",
        );

        const startX = currentPlayableState(gameState).position.x;

        playGameThrough(gameState, {
          frameRate,

          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockDirectionPressed = "left";
            mockInputStateTracker.mockPressing("jump");
          },
          until() {
            return (
              // until the jump starts:
              currentPlayableState(gameState).standingOnItemId === null
            );
          },
        });

        playGameThrough(gameState, {
          frameRate,
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockDirectionPressed = "left";
            mockInputStateTracker.mockNotPressing("jump");
          },

          until() {
            return (
              // until lands again
              currentPlayableState(gameState).standingOnItemId === "floor"
            );
          },
        });

        const jumpDistance =
          currentPlayableState(gameState).position.x - startX;

        /* 
            Not so much allowable error, as FOUND error!

            Variable tick step simulations aren't that accurate :-/
            to get better than this, we'd need to account for deceleration
            that happens between the velocity being reduced once per frame,
            or have a lower maximum tick delta ms

            ~2px between lowest and highest jump height isn't that fair
            to players on different spec hardware!
           */
        const allowableError = [0, 2.3];

        expect(jumpDistance).toBeGreaterThan(
          expectedJumpDistance + allowableError[0],
        );
        expect(jumpDistance).toBeLessThan(
          expectedJumpDistance + allowableError[1],
        );
      });
    });
  });

  describe("springs", () => {
    test.each(testFrameRates)(
      "head can get onto a 4-high tower by jumping from a spring (%j)",
      (frameRate) => {
        // similar to safari9triple (except that needs more blocks under the spring)
        const gameState = setUpBasicGame({
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
      "head can't get onto a 5-high tower by jumping from a spring (%j)",
      (frameRate) => {
        // similar to safari9triple (except that needs more blocks under the spring)
        const gameState = setUpBasicGame({
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

    test("heels jump-putting-down a spring", () => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 0, y: 0, z: 2 },
            config: {
              which: "heels",
            },
          },
          bag: {
            type: "pickup",
            position: { x: 0, y: 0, z: 1 },
            config: {
              gives: "bag",
            },
          },
          spring: {
            type: "spring",
            position: { x: 0, y: 0, z: 0 },
            config: {},
          },
          books: {
            type: "block",
            position: { x: 1, y: 0, z: 0 },
            // 3 blocks high is higher than heels could normally reach jumping off an
            // item (needs the extra jump from the spring)
            config: { style: "book", times: { x: 3, z: 3 } },
          },
        },
      });

      // press carry until heels is carrying the spring
      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockPressing("carry");
        },
        until() {
          return heelsState(gameState).carrying?.type === "spring";
        },
      });

      // wait until heels is on the floor again:
      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockNotPressing("carry");
        },
        until() {
          return heelsState(gameState).standingOnItemId === "floor";
        },
      });

      // drop-jump the spring:
      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
          mockInputStateTracker.mockPressing("carry");
          mockInputStateTracker.mockPressing("jump");
        },
        until() {
          return heelsState(gameState).standingOnItemId === "books";
        },
      });
    });
  });

  test.each(testFrameRates)(
    "head can lift a block on top of him about 1 block higher by jumping while under it (%j)",
    (frameRate) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 0, z: 0 },
            config: {
              which: "head",
            },
          },
          spring: {
            type: "portableBlock",
            position: { x: 0, y: 0, z: 1 },
            config: {
              style: "drum",
            },
          },
        },
      });

      let highestItemZ = Number.NEGATIVE_INFINITY;

      playGameThrough(gameState, {
        until: 3_000,
        frameRate,
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockPressing("jump");
        },
        frameCallbacks(gameState) {
          const newZ = itemState(gameState, "spring").position.z;
          highestItemZ = Math.max(highestItemZ, newZ);
        },
      });

      // needs to be comfortably enough to get on top of another block, but not excessively so:
      expect(highestItemZ).toBeGreaterThan(2 * blockSizePx.h + 1);
      expect(highestItemZ).toBeLessThan(2.25 * blockSizePx.h);
    },
  );
});
