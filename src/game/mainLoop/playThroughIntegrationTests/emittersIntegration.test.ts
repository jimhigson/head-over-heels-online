import { beforeEach, describe, expect, test } from "vitest";

import {
  type ItemsInTestRoomJson,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import { item } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import type { FrameRateSpec } from "../../../_testUtils/testFrameRates";
import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { collision2Items } from "../../collision/aabbCollision";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

// fps that's easy to reason on since this test tests timings
const fineFrameRate: FrameRateSpec = { fps: [100] };
const coarseFrameRate: FrameRateSpec = { fps: [15] };

const countEmittedItems = (gameState: ReturnType<typeof setUpBasicGame>) => {
  const room = selectCurrentRoomState(gameState)!;
  return roomItemsIterable(room.items)
    .filter((item) => item.state.createdByEmitter !== undefined)
    .toArray().length;
};

test("emitter respects period and maximum", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        position: { x: 0, y: 0, z: 10 },
        config: {
          emits: {
            type: "portableBlock",
            config: { style: "cube" },
          },
          period: 500,
          maximum: 3,
        },
      },
    },
  });

  // no emission before first period elapses
  playGameThrough(gameState, {
    until: 400,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(0);

  // first period elapses, should emit first
  playGameThrough(gameState, {
    until: 510,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // second period elapses, should emit second
  playGameThrough(gameState, {
    until: 1_010,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(2);

  // after enough time for all three
  playGameThrough(gameState, {
    until: 2_000,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(3);

  // after more time, still at maximum (no more emitted)
  playGameThrough(gameState, {
    until: 5_000,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(3);
});

test("emitter stops emitting when emitted items stack up and block it", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        position: { x: 0, y: 0, z: 2 },
        config: {
          emits: {
            type: "portableBlock",
            config: { style: "cube" },
          },
          period: 100,
          maximum: null,
        },
      },
    },
  });

  // run long enough that blocks would stack and block the emitter
  playGameThrough(gameState, {
    until: 10_000,
    frameRate: fineFrameRate,
  });

  const emitted = countEmittedItems(gameState);

  // should have emitted some but not as many as the period would allow unblocked
  // (10_000 / 100 = 100 potential emissions, but stacking blocks the spawn point)
  expect(emitted).toBeGreaterThan(0);
  expect(emitted).toBeLessThan(20);

  // further time produces no more emissions — the emitter is fully blocked
  playGameThrough(gameState, {
    until: 15_000,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(emitted);
});

test("emitter with no maximum keeps emitting", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        position: { x: 0, y: 0, z: 10 },
        config: {
          emits: {
            type: "portableBlock",
            config: { style: "cube" },
          },
          period: 1_000,
          maximum: null,
        },
      },
    },
  });

  playGameThrough(gameState, {
    until: 6_000,
    frameRate: { fps: [15] },
  });

  // with period 1000 and 6 seconds, should have emitted several
  expect(countEmittedItems(gameState)).toBeGreaterThan(3);
});

test("emitter respects maximumAtOnce and replenishes after collection", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        position: { x: 2, y: 4, z: 2 },
        config: {
          emits: {
            type: "pickup",
            config: { gives: "extra-life" },
          },
          period: 200,
          maximum: null,
          maximumAtOnce: 1,
        },
      },
    },
  });

  // wait for first emission
  playGameThrough(gameState, {
    until: 500,
    frameRate: { fps: [15] },
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // wait more — still only one due to maximumAtOnce
  playGameThrough(gameState, {
    until: 1_500,
    frameRate: { fps: [15] },
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // walk into the pickup to collect it
  playGameThrough(gameState, {
    setupInitialInput(inputState) {
      inputState.mockDirectionPressed = "right";
    },
    until: 3_000,
    frameRate: { fps: [15] },
  });

  // pickup was collected — emitter should have replenished
  expect(countEmittedItems(gameState)).toBe(1);
});

test("emitter with delay does not emit until delay has elapsed", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        position: { x: 0, y: 0, z: 10 },
        config: {
          emits: {
            type: "portableBlock",
            config: { style: "cube" },
          },
          period: 1_000,
          delay: 2_000,
          maximum: null,
        },
      },
    },
  });

  // before delay, nothing emitted
  playGameThrough(gameState, {
    until: 1_950,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(0);

  // after delay, first emission
  playGameThrough(gameState, {
    until: 2_050,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // not yet second emitting:
  playGameThrough(gameState, {
    until: 2_900,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // second emission follows after one more period
  playGameThrough(gameState, {
    until: 3_050,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(2);
});

describe("emitted item position with offset", () => {
  const emittedItemPosition = (
    gameState: ReturnType<typeof setUpBasicGame>,
  ) => {
    const room = selectCurrentRoomState(gameState)!;
    const [emitted] = roomItemsIterable(room.items)
      .filter((item) => item.state.createdByEmitter === "emitter")
      .toArray();
    return emitted?.state.box;
  };

  test("emitted item with no offset appears centred on the emitter", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: 4, z: 0 },
          config: { which: "heels" },
        },
        emitter: {
          type: "emitter",
          position: { x: 2, y: 2, z: 10 },
          config: {
            emits: { type: "portableBlock", config: { style: "cube" } },
            period: 200,
            maximum: 1,
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: (gameState) => countEmittedItems(gameState) > 0,
      frameRate: fineFrameRate,
    });

    const pos = emittedItemPosition(gameState)!;
    expect(pos.x).toBe(34);
    expect(pos.y).toBe(34);
    // emitter pixel z (10 * 12 = 120) - half portableBlock aabb z (12 / 2 = 6)
    expect(pos.z).toBeCloseTo(114);
  });

  test("offset with only z set does not shift x or y", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: 4, z: 0 },
          config: { which: "heels" },
        },
        emitter: {
          type: "emitter",
          position: { x: 2, y: 2, z: 10 },
          config: {
            emits: { type: "portableBlock", config: { style: "cube" } },
            period: 200,
            maximum: 1,
            offset: { z: 0.5 },
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: (gameState) => countEmittedItems(gameState) > 0,
      frameRate: fineFrameRate,
    });

    const pos = emittedItemPosition(gameState)!;
    expect(pos.x).toBe(34);
    expect(pos.y).toBe(34);
    // no-offset z (114) + offset z (0.5 * 12 = 6)
    expect(pos.z).toBeCloseTo(120);
  });
});

describe("whenPlayableInside", () => {
  const heelsOverlapsEmitter = (
    gameState: ReturnType<typeof setUpBasicGame>,
  ) => {
    const emitter = item(gameState, "emitter");
    const heels = item(gameState, "heels");
    return (
      emitter !== undefined &&
      heels !== undefined &&
      collision2Items(emitter, heels)
    );
  };

  test("whenPlayerInside emitter does not emit when player is far away", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: 2, z: 0 },
          config: { which: "heels" },
        },
        emitter: {
          type: "emitter",
          position: { x: 0, y: 2, z: 0 },
          config: {
            emits: { type: "floatingText", config: { textLines: ["x"] } },
            period: 500,
            maximum: null,
            whenPlayerInside: true,
            times: { x: 1, y: 1, z: 0.1 },
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: 10_000,
    });
    expect(countEmittedItems(gameState)).toBe(0);
  });

  test("whenPlayerInside emitter starts emitting when player walks onto it", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 2, y: 2, z: 0 },
          config: { which: "heels" },
        },
        emitter: {
          type: "emitter",
          position: { x: 0, y: 2, z: 0 },
          config: {
            emits: { type: "floatingText", config: { textLines: ["x"] } },
            period: 500,
            maximum: null,
            whenPlayerInside: true,
            times: { x: 1, y: 1, z: 0.1 },
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: 10_000,
      frameRate: fineFrameRate,
    });
    expect(countEmittedItems(gameState)).toBe(0);

    // walk right (decreasing x) until player crosses into the emitter's x range
    playGameThrough(gameState, {
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = "right";
      },
      until(gameState) {
        return heelsOverlapsEmitter(gameState);
      },
      frameRate: fineFrameRate,
    });

    // stop walking and wait for the period to elapse
    gameState.inputStateTracker.mockDirectionPressed = undefined;
    playGameThrough(gameState, {
      until(gameState) {
        return countEmittedItems(gameState) > 0;
      },
      frameRate: fineFrameRate,
    });

    expect(countEmittedItems(gameState)).toBeGreaterThan(0);
  });

  test("whenPlayerInside emitter resets timing when player re-enters", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 2, y: 2, z: 0 },
          config: { which: "heels" },
        },
        emitter: {
          type: "emitter",
          position: { x: 0, y: 2, z: 0 },
          config: {
            emits: { type: "floatingText", config: { textLines: ["x"] } },
            period: 500,
            delay: 1_000,
            maximum: null,
            whenPlayerInside: true,
            times: { x: 1, y: 1, z: 0.1 },
          },
        },
      },
    });

    // walk right into the emitter
    playGameThrough(gameState, {
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = "right";
      },
      until(gameState) {
        return heelsOverlapsEmitter(gameState);
      },
      frameRate: coarseFrameRate,
    });

    // stop and wait for first emission (delay 1s + period 500ms)
    playGameThrough(gameState, {
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = undefined;
      },
      until(gameState) {
        return countEmittedItems(gameState) > 0;
      },
      frameRate: coarseFrameRate,
    });

    // walk left out of the emitter
    playGameThrough(gameState, {
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = "left";
      },
      until(gameState) {
        return !heelsOverlapsEmitter(gameState);
      },
      frameRate: coarseFrameRate,
    });

    const emittedAfterLeaving = countEmittedItems(gameState);

    // walk right back in
    playGameThrough(gameState, {
      setupInitialInput(inputState) {
        inputState.mockDirectionPressed = "right";
      },
      until(gameState) {
        return heelsOverlapsEmitter(gameState);
      },
      frameRate: coarseFrameRate,
    });

    // the delay should restart — no immediate emission
    gameState.inputStateTracker.mockDirectionPressed = undefined;
    const roomTimeAtReEntry = selectCurrentRoomState(gameState)!.roomTime;

    playGameThrough(gameState, {
      until: roomTimeAtReEntry + 500,
      frameRate: coarseFrameRate,
    });

    expect(countEmittedItems(gameState)).toBe(emittedAfterLeaving);

    // after full delay elapses, should emit again
    playGameThrough(gameState, {
      until: roomTimeAtReEntry + 2_000,
      frameRate: coarseFrameRate,
    });

    expect(countEmittedItems(gameState)).toBeGreaterThan(emittedAfterLeaving);
  });
});

const emittedBlockStyles = (gameState: ReturnType<typeof setUpBasicGame>) =>
  roomItemsIterable(selectCurrentRoomState(gameState)!.items)
    .filter((item) => item.state.createdByEmitter !== undefined)
    .filter((item) => item.type === "portableBlock")
    .map((item) => item.config.style)
    .toArray();

test("a cyclic emitter emits its recipes in order, repeating from the start", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        position: { x: 0, y: 0, z: 10 },
        config: {
          emits: {
            type: "cyclic",
            cycle: [
              { type: "portableBlock", config: { style: "cube" } },
              { type: "portableBlock", config: { style: "drum" } },
              { type: "portableBlock", config: { style: "sticks" } },
            ],
          },
          period: 500,
          maximum: 6,
        },
      },
    },
  });

  playGameThrough(gameState, {
    until: (gameState) => countEmittedItems(gameState) === 6,
    failAfter: 10_000,
    frameRate: fineFrameRate,
  });

  expect(emittedBlockStyles(gameState)).toEqual([
    "cube",
    "drum",
    "sticks",
    "cube",
    "drum",
    "sticks",
  ]);
});

test("a probabilistic emitter never chooses a recipe with weight 0", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        position: { x: 0, y: 0, z: 10 },
        config: {
          emits: {
            type: "probabilistic",
            choices: [
              {
                emits: { type: "portableBlock", config: { style: "cube" } },
                probabilityWeight: 0,
              },
              {
                emits: { type: "portableBlock", config: { style: "drum" } },
                probabilityWeight: 5,
              },
            ],
          },
          period: 500,
          maximum: 6,
        },
      },
    },
  });

  playGameThrough(gameState, {
    until: (gameState) => countEmittedItems(gameState) === 6,
    failAfter: 10_000,
    frameRate: fineFrameRate,
  });

  expect(emittedBlockStyles(gameState)).toEqual([
    "drum",
    "drum",
    "drum",
    "drum",
    "drum",
    "drum",
  ]);
});

test("a probabilistic emitter chooses all of its recipes, the same way every time the room is played", () => {
  const firstPlayGameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        // high enough that the twelve stacked emitted blocks don't block it
        position: { x: 0, y: 0, z: 15 },
        config: {
          emits: {
            type: "probabilistic",
            choices: [
              { emits: { type: "portableBlock", config: { style: "cube" } } },
              { emits: { type: "portableBlock", config: { style: "drum" } } },
            ],
          },
          period: 500,
          maximum: 12,
        },
      },
    },
  });
  playGameThrough(firstPlayGameState, {
    until: (gameState) => countEmittedItems(gameState) === 12,
    failAfter: 15_000,
    frameRate: fineFrameRate,
  });
  const firstPlayStyles = emittedBlockStyles(firstPlayGameState);

  resetStore();
  const secondPlayGameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
      emitter: {
        type: "emitter",
        position: { x: 0, y: 0, z: 15 },
        config: {
          emits: {
            type: "probabilistic",
            choices: [
              { emits: { type: "portableBlock", config: { style: "cube" } } },
              { emits: { type: "portableBlock", config: { style: "drum" } } },
            ],
          },
          period: 500,
          maximum: 12,
        },
      },
    },
  });
  playGameThrough(secondPlayGameState, {
    until: (gameState) => countEmittedItems(gameState) === 12,
    failAfter: 15_000,
    frameRate: fineFrameRate,
  });

  expect(new Set(firstPlayStyles)).toEqual(new Set(["cube", "drum"]));
  expect(emittedBlockStyles(secondPlayGameState)).toEqual(firstPlayStyles);
});

test.for([
  { cubeWeight: 1, drumWeight: 1 },
  { cubeWeight: 3, drumWeight: 1 },
  { cubeWeight: 1, drumWeight: 9 },
])(
  "emitters weighted $cubeWeight cube to $drumWeight drum emit about that share of cubes",
  ({ cubeWeight, drumWeight }) => {
    const emissionsPerEmitter = 12;
    // spread over the room, so no emitter is blocked by the blocks of another:
    const emitterCoordinates = [0, 2, 4, 6];
    const emitterItems: ItemsInTestRoomJson = Object.fromEntries(
      emitterCoordinates.flatMap((x) =>
        emitterCoordinates.map((y): [string, ItemsInTestRoomJson[string]] => [
          `emitter${x}_${y}`,
          {
            type: "emitter",
            // high enough that the stacked emitted blocks don't block it
            position: { x, y, z: 15 },
            config: {
              emits: {
                type: "probabilistic",
                choices: [
                  {
                    emits: {
                      type: "portableBlock",
                      config: { style: "cube" },
                    },
                    probabilityWeight: cubeWeight,
                  },
                  {
                    emits: {
                      type: "portableBlock",
                      config: { style: "drum" },
                    },
                    probabilityWeight: drumWeight,
                  },
                ],
              },
              period: 100,
              maximum: emissionsPerEmitter,
            },
          },
        ]),
      ),
    );
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 7, y: 7, z: 0 },
          config: { which: "heels" },
        },
        ...emitterItems,
      },
    });
    const totalEmissions = emitterCoordinates.length ** 2 * emissionsPerEmitter;

    playGameThrough(gameState, {
      until: (gameState) => countEmittedItems(gameState) === totalEmissions,
      failAfter: 10_000,
      frameRate: fineFrameRate,
    });

    const cubeChance = cubeWeight / (cubeWeight + drumWeight);
    const expectedCubes = totalEmissions * cubeChance;
    // three standard deviations of a binomial - the outcome is fixed, but this
    // keeps it from breaking if the hashing changes
    const allowedDeviation =
      3 * Math.sqrt(totalEmissions * cubeChance * (1 - cubeChance));
    expect(
      Math.abs(
        emittedBlockStyles(gameState).filter((style) => style === "cube")
          .length - expectedCubes,
      ),
    ).toBeLessThanOrEqual(allowedDeviation);
  },
);
