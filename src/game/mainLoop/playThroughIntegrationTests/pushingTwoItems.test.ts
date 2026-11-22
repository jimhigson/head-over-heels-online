// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  type ItemsInTestRoomJson,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { makeCollisionCounter } from "../../../_testUtils/makeCollisionCounter";
import { makeTestRenderState } from "../../../_testUtils/makeTestRenderState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import {
  allHaveHeld,
  hasCollided,
  hasCollidedWithItemOfType,
  isStandingOn,
} from "../../../_testUtils/playThroughUntilHelpers";
import {
  enoughTimeForSoundsToFade,
  loadSoundsForTest,
  type PlayingSound,
  resetSoundsForTest,
  soundPlayback,
  soundsPlaying,
} from "../../../_testUtils/sounds/soundTestUtils";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { blockSizePx } from "../../physics/mechanicsConstants";

beforeEach(async () => {
  resetStore();
  await loadSoundsForTest();
});

afterEach(() => {
  resetSoundsForTest();
});

type PlayingSounds = Array<PlayingSound>;

describedForAllFrameRates((frameRate) => {
  test.for([
    { withCube: true, withSecondCube: false, withHeelsOnLift: true },
    { withCube: false, withSecondCube: false, withHeelsOnLift: true },
    { withCube: true, withSecondCube: false, withHeelsOnLift: false },
    { withCube: true, withSecondCube: true, withHeelsOnLift: false },
  ])(
    "a lift carries its riders up with them staying stood on it, so only the lift is heard, withCube: $withCube, withSecondCube: $withSecondCube, withHeelsOnLift: $withHeelsOnLift",
    ({ withCube, withSecondCube, withHeelsOnLift }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position:
              withHeelsOnLift ? { x: 4.5, y: 2, z: 1 } : { x: 0, y: 0, z: 0 },
            config: {
              which: "heels",
            },
          },
          l: {
            type: "lift",
            position: { x: 4, y: 2, z: 0 },
            config: {
              top: 11,
              bottom: 0,
            },
          },
          ...(withCube ?
            {
              pr: {
                type: "portableBlock",
                position: { x: 3.5, y: 2, z: 1 },
                config: {
                  style: "cube",
                },
              },
            }
          : {}),
          ...(withSecondCube ?
            {
              pr2: {
                type: "portableBlock",
                position: { x: 4.5, y: 2, z: 1 },
                config: {
                  style: "cube",
                },
              },
            }
          : {}),
        },
      });

      const renderState = makeTestRenderState();

      playGameThrough(gameState, renderState, {
        frameRate,
        forTime: 10_000,
        frameCallbacks() {
          // checked every frame, so a failure reports when it was first heard:
          expect<PlayingSounds>(
            soundsPlaying(renderState),
          ).toEqual<PlayingSounds>([
            { soundId: "helicopter", playback: "loop" },
          ]);
        },
      });
    },
  );

  describe("pushing two cubes", () => {
    describe("on-axis", () => {
      test("heels pushes two cubes at once while staying against both, so bumps only on first touching them", () => {
        const gameState = setUpBasicGame({
          firstRoomItems: {
            heels: {
              type: "player",
              position: { x: 1.5, y: 3.5, z: 0 },
              config: {
                which: "heels",
              },
            },
            pr: {
              type: "portableBlock",
              position: { x: 2.5, y: 3, z: 0 },
              config: {
                style: "cube",
              },
            },
            pr1: {
              type: "portableBlock",
              position: { x: 2.5, y: 4, z: 0 },
              config: {
                style: "cube",
              },
            },
          },
        });

        const renderState = makeTestRenderState();

        playGameThrough(gameState, renderState, {
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockDirectionPressed = "left";
          },
          frameRate,
          // which cube heels touches first depends on the frame rate:
          until: (gameState) =>
            hasCollided("heels", "pr")(gameState) ||
            hasCollided("heels", "pr1")(gameState),
          failAfter: 1_000,
        });

        expect(soundPlayback(renderState, "softBump")).toBe("spotEffect");

        // let the bump of first touching the cubes finish:
        playGameThrough(gameState, renderState, {
          frameRate,
          forTime: enoughTimeForSoundsToFade,
        });

        playGameThrough(gameState, renderState, {
          frameRate,
          // still pushing, short of the cubes reaching the wall:
          forTime: 2_000,
          frameCallbacks() {
            // checked every frame, so a failure reports when it was first heard:
            expect<PlayingSounds>(
              soundsPlaying(renderState),
            ).toEqual<PlayingSounds>([
              { soundId: "heelsWalk", playback: "loop" },
              { soundId: "scrape", playback: "loop" },
            ]);
          },
        });
      });
    });

    describe("diagonally", () => {
      test.for([
        { firstCube: true, secondCube: true },
        { firstCube: true, secondCube: false },
        { firstCube: false, secondCube: true },
      ])(
        "heels pushes cubes diagonally together, scraping all the way to the far walls, firstCube: $firstCube, secondCube: $secondCube",
        ({ firstCube, secondCube }) => {
          const gameState = setUpBasicGame({
            firstRoomItems: {
              heels: {
                type: "player",
                position: { x: 1.5, y: 1.375, z: 0 },
                config: {
                  which: "heels",
                },
              },
              ...(firstCube ?
                {
                  pr: {
                    type: "portableBlock",
                    position: { x: 4, y: 3, z: 0 },
                    config: {
                      style: "cube",
                    },
                  },
                }
              : {}),
              ...(secondCube ?
                {
                  pr1: {
                    type: "portableBlock",
                    position: { x: 3, y: 4, z: 0 },
                    config: {
                      style: "cube",
                    },
                  },
                }
              : {}),
            },
          });
          const cubeIds = [
            ...(firstCube ? ["pr"] : []),
            ...(secondCube ? ["pr1"] : []),
          ];

          const renderState = makeTestRenderState();

          playGameThrough(gameState, renderState, {
            setupInitialInput(mockInputStateTracker) {
              mockInputStateTracker.mockDirectionPressed = "awayLeft";
            },
            frameRate,
            until: (gameState) =>
              cubeIds.some((cubeId) => hasCollided("heels", cubeId)(gameState)),
            failAfter: 3_000,
          });

          playGameThrough(gameState, renderState, {
            frameRate,
            until: allHaveHeld(
              ...cubeIds.map((cubeId) =>
                hasCollidedWithItemOfType(cubeId, "wall"),
              ),
            ),
            failAfter: 10_000,
            frameCallbacks() {
              // checked every frame, so a failure reports when the scraping stopped:
              expect(soundPlayback(renderState, "scrape")).toBe("loop");
            },
          });
        },
      );

      // heels only touches the first cube - the second is pushed by the first, in a chain:
      test("heels pushes a cube diagonally into a second cube, pushing both until the second hits a wall", () => {
        const gameState = setUpBasicGame({
          firstRoomItems: {
            heels: {
              type: "player",
              position: { x: 1.875, y: 0.5, z: 0 },
              config: {
                which: "heels",
              },
            },
            pr: {
              type: "portableBlock",
              position: { x: 3, y: 2.5, z: 0 },
              config: {
                style: "cube",
              },
            },
            pr1: {
              type: "portableBlock",
              position: { x: 3, y: 3.375, z: 0 },
              config: {
                style: "cube",
              },
            },
          },
        });

        playGameThrough(gameState, {
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockDirectionPressed = "awayLeft";
          },
          frameRate,
          until: hasCollidedWithItemOfType("pr1", "wall"),
          failAfter: 10_000,
        });
      });
    });
  });

  test("heels stopped by a fixed block doesn't push the cube beside it any further, and only walks against them", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 1.5, y: 3.375, z: 0 },
          config: {
            which: "heels",
          },
        },
        pr1: {
          type: "portableBlock",
          position: { x: 3.5, y: 4, z: 0 },
          config: {
            style: "cube",
          },
        },
        b: {
          type: "block",
          position: { x: 4, y: 3, z: 0 },
          config: {
            style: "organic",
          },
        },
      },
    });

    const renderState = makeTestRenderState();

    playGameThrough(gameState, renderState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      frameRate,
      until: hasCollided("heels", "b"),
      failAfter: 3_000,
    });

    expect(soundPlayback(renderState, "softBump")).toBe("spotEffect");

    // let the bump of hitting the block finish:
    playGameThrough(gameState, renderState, {
      frameRate,
      forTime: enoughTimeForSoundsToFade,
    });

    const cubeXAfterHeelsStopped = itemState<"portableBlock">(gameState, "pr1")
      .box.x;

    playGameThrough(gameState, renderState, {
      frameRate,
      forTime: 2_000,
      frameCallbacks() {
        // heels keeps walking into the block, so only footsteps remain:
        expect<PlayingSounds>(
          soundsPlaying(renderState),
        ).toEqual<PlayingSounds>([{ soundId: "heelsWalk", playback: "loop" }]);
      },
    });

    // heels can't move, so neither can the cube it pushes:
    expect(itemState<"portableBlock">(gameState, "pr1").box.x).toBe(
      cubeXAfterHeelsStopped,
    );
  });

  test.for<{ deadlyItem: ItemsInTestRoomJson[string] }>([
    {
      deadlyItem: {
        type: "deadlyBlock",
        position: { x: 4, y: 4, z: 0 },
        config: { style: "volcano" },
      },
    },
    {
      // stands still, only turning to face heels:
      deadlyItem: {
        type: "monster",
        // 12px, so placed to sit flush against the safe item, as a full block would:
        position: { x: 3.875, y: 3.875, z: 0 },
        config: {
          which: "elephantHead",
          activated: "on",
          movement: "turn-to-player",
          startDirection: "towards",
        },
      },
    },
    {
      deadlyItem: {
        type: "slidingDeadly",
        // 12px, so placed to sit flush against the safe item, as a full block would:
        position: { x: 3.875, y: 3.875, z: 0 },
        config: { style: "spikyBall", startingPhase: 1 },
      },
    },
  ])(
    "walking into a block and a $deadlyItem.type side by side, the block protects heels",
    ({ deadlyItem }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            // mostly across the safe item, so heels isn't helped around its corner,
            // but still overlapping the deadly item:
            position: { x: 1.5, y: 3.375, z: 0 },
            config: {
              which: "heels",
            },
          },
          block: {
            type: "block",
            position: { x: 4, y: 3, z: 0 },
            config: {
              style: "organic",
            },
          },
          deadly: deadlyItem,
        },
      });
      const startingLives = heelsState(gameState).lives;

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        frameRate,
        until: hasCollided("heels", "block"),
        failAfter: 3_000,
      });

      // keep walking into both:
      playGameThrough(gameState, {
        frameRate,
        forTime: 1_000,
      });

      expect(heelsState(gameState).lives).toBe(startingLives);
    },
  );

  test.for<{ deadlyItem: ItemsInTestRoomJson[string] }>([
    {
      deadlyItem: {
        type: "deadlyBlock",
        position: { x: 4, y: 4, z: 0 },
        config: { style: "volcano" },
      },
    },
    {
      // stands still, only turning to face heels:
      deadlyItem: {
        type: "monster",
        // 12px, so placed to sit flush against the safe item, as a full block would:
        position: { x: 3.875, y: 3.875, z: 0 },
        config: {
          which: "elephantHead",
          activated: "on",
          movement: "turn-to-player",
          startDirection: "towards",
        },
      },
    },
    {
      deadlyItem: {
        type: "slidingDeadly",
        // 12px, so placed to sit flush against the safe item, as a full block would:
        position: { x: 3.875, y: 3.875, z: 0 },
        config: { style: "spikyBall", startingPhase: 1 },
      },
    },
  ])(
    "walking into a portable block and a $deadlyItem.type side by side, the portable block doesn't protect heels",
    ({ deadlyItem }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            // mostly across the safe item, so heels isn't helped around its corner,
            // but still overlapping the deadly item:
            position: { x: 1.5, y: 3.375, z: 0 },
            config: {
              which: "heels",
            },
          },
          pr: {
            type: "portableBlock",
            // 12px, so placed with its front face level with the deadly item's:
            position: { x: 3.875, y: 3.125, z: 0 },
            config: {
              style: "cube",
            },
          },
          deadly: deadlyItem,
        },
      });
      const startingLives = heelsState(gameState).lives;

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        frameRate,
        until: (gameState) => heelsState(gameState).lives < startingLives,
        failAfter: 5_000,
      });
    },
  );

  // the safe item is pushable but already against the wall, so can't move - it
  // protects heels as an immovable block would. Front faces are level, so both
  // are hit at once:
  test.for<{
    safeItem: ItemsInTestRoomJson[string];
    deadlyItem: ItemsInTestRoomJson[string];
  }>([
    {
      safeItem: {
        type: "pushableBlock",
        position: { x: 7, y: 3, z: 0 },
        config: {},
      },
      deadlyItem: {
        type: "deadlyBlock",
        position: { x: 7, y: 4, z: 0 },
        config: { style: "volcano" },
      },
    },
    {
      // 12px items, so placed to sit flush against the wall and each other:
      safeItem: {
        type: "portableBlock",
        position: { x: 7.125, y: 3.125, z: 0 },
        config: { style: "cube" },
      },
      // stands still, only turning to face heels:
      deadlyItem: {
        type: "monster",
        position: { x: 7.125, y: 3.875, z: 0 },
        config: {
          which: "elephantHead",
          activated: "on",
          movement: "turn-to-player",
          startDirection: "towards",
        },
      },
    },
    {
      // 12px items, so placed to sit flush against the wall and each other:
      safeItem: {
        type: "portableBlock",
        position: { x: 7.125, y: 3.125, z: 0 },
        config: { style: "cube" },
      },
      deadlyItem: {
        type: "slidingDeadly",
        position: { x: 7.125, y: 3.875, z: 0 },
        config: { style: "spikyBall", startingPhase: 1 },
      },
    },
  ])(
    "walking into a $safeItem.type stuck against a wall and a $deadlyItem.type beside it, the $safeItem.type protects heels",
    ({ safeItem, deadlyItem }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            // mostly across the safe item, so heels isn't helped around its corner,
            // but still overlapping the deadly item:
            position: { x: 5.5, y: 3.375, z: 0 },
            config: {
              which: "heels",
            },
          },
          safe: safeItem,
          deadly: deadlyItem,
        },
      });
      const startingLives = heelsState(gameState).lives;

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        frameRate,
        until: hasCollided("heels", "safe"),
        failAfter: 3_000,
      });

      // keep walking into both:
      playGameThrough(gameState, {
        frameRate,
        forTime: 1_000,
      });

      expect(heelsState(gameState).lives).toBe(startingLives);
    },
  );

  describe.for<{ safeItem: ItemsInTestRoomJson[string] }>([
    {
      safeItem: {
        type: "block",
        position: { x: 4, y: 3, z: 0 },
        config: { style: "organic" },
      },
    },
    {
      safeItem: {
        type: "pushableBlock",
        position: { x: 4, y: 3, z: 0 },
        config: {},
      },
    },
  ])(
    "landing on a $safeItem.type and a deadly item side by side, the $safeItem.type protects heels",
    ({ safeItem }) => {
      describe.for<{ deadlyItem: ItemsInTestRoomJson[string] }>([
        {
          deadlyItem: {
            type: "deadlyBlock",
            position: { x: 4, y: 4, z: 0 },
            config: { style: "volcano" },
          },
        },
        {
          // deadly from above, which is where heels lands from:
          deadlyItem: {
            type: "spikes",
            position: { x: 4, y: 4, z: 0 },
            config: {},
          },
        },
        {
          // stands still, only turning to face heels:
          deadlyItem: {
            type: "monster",
            // 12px, so placed to sit flush against the safe item, as a full block would:
            position: { x: 3.875, y: 3.875, z: 0 },
            config: {
              which: "elephantHead",
              activated: "on",
              movement: "turn-to-player",
              startDirection: "towards",
            },
          },
        },
        {
          deadlyItem: {
            type: "slidingDeadly",
            // 12px, so placed to sit flush against the safe item, as a full block would:
            position: { x: 3.875, y: 3.875, z: 0 },
            config: { style: "spikyBall", startingPhase: 1 },
          },
        },
      ])("the deadly item is a $deadlyItem.type", ({ deadlyItem }) => {
        test.for([
          // heels is 0.75 blocks deep, across the boundary at y=4:
          { overlap: "1/8 block on the safe item", heelsY: 3.875 },
          { overlap: "half on each", heelsY: 3.625 },
          { overlap: "1/8 block on the deadly item", heelsY: 3.375 },
        ])("overlapping $overlap", ({ heelsY }) => {
          const gameState = setUpBasicGame({
            firstRoomItems: {
              heels: {
                type: "player",
                position: { x: 4.125, y: heelsY, z: 2 },
                config: {
                  which: "heels",
                },
              },
              safe: safeItem,
              deadly: deadlyItem,
            },
          });
          const startingLives = heelsState(gameState).lives;

          playGameThrough(gameState, {
            frameRate,
            until: isStandingOn("heels", "safe"),
            failAfter: 3_000,
          });

          // stay stood on both:
          playGameThrough(gameState, {
            frameRate,
            forTime: 1_000,
          });

          expect(heelsState(gameState).lives).toBe(startingLives);
        });
      });
    },
  );

  describe("pushing items of different weights", () => {
    test("heels pushes a heavy stool and a cube side by side together, at the stool's pace, bumping each once", () => {
      // the stool pushed alone, to find its pace:
      const stoolAloneGameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 1.5, y: 3.375, z: 0 },
            config: { which: "heels" },
          },
          stool: {
            type: "pushableBlock",
            position: { x: 2.5, y: 2.75, z: 0 },
            config: {},
          },
        },
      });
      playGameThrough(stoolAloneGameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        frameRate,
        forTime: 2_000,
      });
      const stoolAloneDistance =
        itemState<"pushableBlock">(stoolAloneGameState, "stool").box.x -
        2.5 * blockSizePx.x;

      resetStore();
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            // across both the stool and the cube:
            position: { x: 1.5, y: 3.375, z: 0 },
            config: { which: "heels" },
          },
          stool: {
            type: "pushableBlock",
            position: { x: 2.5, y: 2.75, z: 0 },
            config: {},
          },
          // 12px, so placed with its back level with the stool's:
          cube: {
            type: "portableBlock",
            position: { x: 2.375, y: 3.625, z: 0 },
            config: { style: "cube" },
          },
        },
      });
      const stoolBumps = makeCollisionCounter("heels", "stool");
      const cubeBumps = makeCollisionCounter("heels", "cube");

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        frameRate,
        forTime: 2_000,
        frameCallbacks: [stoolBumps.frameCallback, cubeBumps.frameCallback],
      });

      const stoolBox = itemState<"pushableBlock">(gameState, "stool").box;
      const cubeBox = itemState<"portableBlock">(gameState, "cube").box;
      expect({
        stoolBumps: stoolBumps.count,
        cubeBumps: cubeBumps.count,
        stoolDistance: Math.round(stoolBox.x - 2.5 * blockSizePx.x),
        cubeBehindStoolBy: Math.round((stoolBox.x - cubeBox.x) * 100) / 100,
      }).toEqual({
        stoolBumps: 1,
        cubeBumps: 1,
        stoolDistance: Math.round(stoolAloneDistance),
        cubeBehindStoolBy: 0,
      });
    });
  });

  describe("lifts carrying riders of different weights", () => {
    test("a lift carries charles and heels up with them staying stood on it, so only the lift is heard", () => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 4.5, y: 2, z: 1 },
            config: { which: "heels" },
          },
          charles: {
            type: "charles",
            position: { x: 3.5, y: 2, z: 1 },
            config: {},
          },
          l: {
            type: "lift",
            position: { x: 4, y: 2, z: 0 },
            config: { top: 6, bottom: 0 },
          },
        },
      });

      const renderState = makeTestRenderState();

      playGameThrough(gameState, renderState, {
        frameRate,
        forTime: 10_000,
        frameCallbacks(gameState) {
          // checked every frame, so a failure reports when it first went wrong:
          expect({
            heelsOn: heelsState(gameState).standingOnItemId,
            charlesOn: itemState<"charles">(gameState, "charles")
              .standingOnItemId,
            sounds: soundsPlaying(renderState),
          }).toEqual({
            heelsOn: "l",
            charlesOn: "l",
            sounds: [{ soundId: "helicopter", playback: "loop" }],
          });
        },
      });
    });
  });

  describe("pushing a sliding item beside another item", () => {
    test("heels pushes a ball and a cube side by side: the ball slides off ahead, the cube moves with heels, bumping each once", () => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            // across both the ball and the cube:
            position: { x: 1.5, y: 3.375, z: 0 },
            config: { which: "heels" },
          },
          // 12px items, so placed to sit level and side by side:
          ball: {
            type: "ball",
            position: { x: 2.375, y: 3.125, z: 0 },
            config: {},
          },
          cube: {
            type: "portableBlock",
            position: { x: 2.375, y: 3.875, z: 0 },
            config: { style: "cube" },
          },
        },
      });
      const ballBumps = makeCollisionCounter("heels", "ball");
      const cubeBumps = makeCollisionCounter("heels", "cube");

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        frameRate,
        forTime: 1_500,
        frameCallbacks: [ballBumps.frameCallback, cubeBumps.frameCallback],
      });

      const heelsBox = heelsState(gameState).box;
      const ballBox = itemState<"ball">(gameState, "ball").box;
      const cubeBox = itemState<"portableBlock">(gameState, "cube").box;
      expect({
        ballBumps: ballBumps.count,
        cubeBumps: cubeBumps.count,
        ballAheadOfCube: ballBox.x - cubeBox.x > blockSizePx.x,
        heelsGapToCube:
          Math.round((cubeBox.x - (heelsBox.x + heelsBox.xd)) * 100) / 100,
      }).toEqual({
        ballBumps: 1,
        cubeBumps: 1,
        ballAheadOfCube: true,
        heelsGapToCube: 0,
      });
    });
  });

  describe("head and heels joined (2 blocks high)", () => {
    test.for([
      {
        direction: "left",
        stack: false,
        // heels at the head-and-heels position, items as in the heels-only tests:
        heelsPosition: { x: 1.5, y: 3.5, z: 0 },
        bottomPosition: { x: 2.5, y: 3, z: 0 },
        otherPosition: { x: 2.5, y: 4, z: 0 },
      },
      {
        direction: "left",
        stack: true,
        heelsPosition: { x: 1.5, y: 3.5, z: 0 },
        bottomPosition: { x: 2.5, y: 3.5, z: 0 },
        otherPosition: { x: 2.5, y: 3.5, z: 1 },
      },
      {
        direction: "awayLeft",
        stack: false,
        heelsPosition: { x: 1.5, y: 1.375, z: 0 },
        bottomPosition: { x: 4, y: 3, z: 0 },
        otherPosition: { x: 3, y: 4, z: 0 },
      },
      {
        direction: "awayLeft",
        stack: true,
        heelsPosition: { x: 1.5, y: 1.5, z: 0 },
        bottomPosition: { x: 2.375, y: 2.375, z: 0 },
        otherPosition: { x: 2.375, y: 2.375, z: 1 },
      },
    ] as const)(
      "pushes two cubes $direction, stacked: $stack, together until one hits a wall, bumping each once",
      ({ direction, stack, heelsPosition, bottomPosition, otherPosition }) => {
        const gameState = setUpBasicGame({
          firstRoomItems: {
            heels: {
              type: "player",
              position: heelsPosition,
              config: { which: "heels" },
            },
            // on heels, ready to join them:
            head: {
              type: "player",
              position: { ...heelsPosition, z: 1 },
              config: { which: "head" },
            },
            bottom: {
              type: "portableBlock",
              position: bottomPosition,
              config: { style: "cube" },
            },
            other: {
              type: "portableBlock",
              position: otherPosition,
              config: { style: "cube" },
            },
          },
        });

        playGameThrough(gameState, {
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockPressing("swop");
          },
          frameRate,
          until: (gameState) =>
            gameState.currentCharacterName === "headOverHeels",
          failAfter: 1_000,
        });
        gameState.inputStateTracker.mockNotPressing("swop");

        const bottomBumps = makeCollisionCounter("headOverHeels", "bottom");
        const otherBumps = makeCollisionCounter("headOverHeels", "other");

        playGameThrough(gameState, {
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockDirectionPressed = direction;
          },
          frameRate,
          until: (gameState) =>
            hasCollidedWithItemOfType("bottom", "wall")(gameState) ||
            hasCollidedWithItemOfType("other", "wall")(gameState),
          failAfter: 10_000,
          frameCallbacks: [
            bottomBumps.frameCallback,
            otherBumps.frameCallback,
            (gameState) => {
              if (stack) {
                // checked every frame, so a failure reports when it fell off:
                expect(
                  itemState<"portableBlock">(gameState, "other")
                    .standingOnItemId,
                ).toBe("bottom");
              }
            },
          ],
        });

        expect({
          bottomBumps: bottomBumps.count,
          otherBumps: otherBumps.count,
        }).toEqual({ bottomBumps: 1, otherBumps: 1 });
      },
    );
  });

  describe("pushing three cubes in a chain", () => {
    test.for([
      {
        direction: "left",
        heelsPosition: { x: 1.5, y: 3.5, z: 0 },
        // heels only touches the first - each pushes the next:
        cubePositions: [
          { x: 2.5, y: 3.5, z: 0 },
          { x: 3.5, y: 3.5, z: 0 },
          { x: 4.5, y: 3.5, z: 0 },
        ],
      },
      {
        direction: "awayLeft",
        heelsPosition: { x: 1.875, y: 0.5, z: 0 },
        cubePositions: [
          { x: 3, y: 2.5, z: 0 },
          { x: 3, y: 3.375, z: 0 },
          { x: 3, y: 4.25, z: 0 },
        ],
      },
    ] as const)(
      "heels pushes three cubes $direction in a chain until the last hits a wall, staying against the first",
      ({ direction, heelsPosition, cubePositions: [first, second, third] }) => {
        const gameState = setUpBasicGame({
          firstRoomItems: {
            heels: {
              type: "player",
              position: heelsPosition,
              config: { which: "heels" },
            },
            first: {
              type: "portableBlock",
              position: first,
              config: { style: "cube" },
            },
            second: {
              type: "portableBlock",
              position: second,
              config: { style: "cube" },
            },
            third: {
              type: "portableBlock",
              position: third,
              config: { style: "cube" },
            },
          },
        });
        const firstBumps = makeCollisionCounter("heels", "first");

        playGameThrough(gameState, {
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockDirectionPressed = direction;
          },
          frameRate,
          until: hasCollidedWithItemOfType("third", "wall"),
          failAfter: 10_000,
          frameCallbacks: firstBumps.frameCallback,
        });

        expect(firstBumps.count).toBe(1);
      },
    );
  });

  describe("pushing an item with a rider", () => {
    test("heels pushes a cube with another cube stood on it, which rides along without falling off or bumping", () => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 1.5, y: 3.5, z: 0 },
            config: { which: "heels" },
          },
          bottom: {
            type: "portableBlock",
            position: { x: 2.5, y: 3.5, z: 0 },
            config: { style: "cube" },
          },
          top: {
            type: "portableBlock",
            position: { x: 2.5, y: 3.5, z: 1 },
            config: { style: "cube" },
          },
        },
      });
      const topBumps = makeCollisionCounter("top", "bottom");

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        frameRate,
        until: hasCollidedWithItemOfType("bottom", "wall"),
        failAfter: 10_000,
        frameCallbacks: [
          topBumps.frameCallback,
          (gameState) => {
            // checked every frame, so a failure reports when it fell off:
            expect(
              itemState<"portableBlock">(gameState, "top").standingOnItemId,
            ).toBe("bottom");
          },
        ],
      });

      expect(topBumps.count).toBe(0);
    });
  });

  describe("pushing a pickup beside another item", () => {
    test("heels walks into a pickup and a cube side by side: the pickup is collected and the cube pushed, bumping it once", () => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            // across both the pickup and the cube:
            position: { x: 1.5, y: 3.375, z: 0 },
            config: { which: "heels" },
          },
          // 12px items, so placed to sit level and side by side:
          shield: {
            type: "pickup",
            position: { x: 2.375, y: 3.125, z: 0 },
            config: { gives: "shield" },
          },
          cube: {
            type: "portableBlock",
            position: { x: 2.375, y: 3.875, z: 0 },
            config: { style: "cube" },
          },
        },
      });
      const cubeStartX = itemState<"portableBlock">(gameState, "cube").box.x;
      const cubeBumps = makeCollisionCounter("heels", "cube");

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        frameRate,
        forTime: 1_500,
        frameCallbacks: cubeBumps.frameCallback,
      });

      expect({
        shieldInRoom:
          selectCurrentRoomState(gameState)?.items.shield !== undefined,
        cubePushed:
          itemState<"portableBlock">(gameState, "cube").box.x > cubeStartX,
        cubeBumps: cubeBumps.count,
      }).toEqual({ shieldInRoom: false, cubePushed: true, cubeBumps: 1 });
    });
  });
});
