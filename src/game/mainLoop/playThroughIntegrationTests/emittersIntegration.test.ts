import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { FrameRateSpec } from "../../../_testUtils/testFrameRates";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { item } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { roomItemsIterable } from "../../../model/RoomState";
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
    .filter((item) => item.state.createdByEmitter === "emitter")
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
        position: { x: 0, y: 0, z: 2 },
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
        position: { x: 0, y: 0, z: 2 },
        config: {
          emits: {
            type: "portableBlock",
            config: { style: "cube" },
          },
          period: 200,
          maximum: null,
        },
      },
    },
  });

  playGameThrough(gameState, {
    until: 2_000,
    frameRate: { fps: [15] },
  });

  // with period 200 and 2 seconds, should have emitted several
  expect(countEmittedItems(gameState)).toBeGreaterThan(5);
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
        position: { x: 0, y: 0, z: 2 },
        config: {
          emits: {
            type: "portableBlock",
            config: { style: "cube" },
          },
          period: 200,
          delay: 1_000,
          maximum: null,
        },
      },
    },
  });

  // before delay, nothing emitted
  playGameThrough(gameState, {
    until: 950,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(0);

  // after delay, first emission
  playGameThrough(gameState, {
    until: 1_050,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // almost second emitting:
  playGameThrough(gameState, {
    until: 1_350,
    frameRate: fineFrameRate,
  });
  expect(countEmittedItems(gameState)).toBe(2);

  // second emission follows after one more period
  playGameThrough(gameState, {
    until: 1_400,
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
    return emitted?.state.position;
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
          position: { x: 2, y: 2, z: 2 },
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
    // emitter pixel z (2 * 12 = 24) - half portableBlock aabb z (12 / 2 = 6)
    expect(pos.z).toBeCloseTo(18);
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
          position: { x: 2, y: 2, z: 2 },
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
    // no-offset z (18) + offset z (0.5 * 12 = 6)
    expect(pos.z).toBeCloseTo(24);
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
            emits: { type: "portableBlock", config: { style: "cube" } },
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
            emits: { type: "portableBlock", config: { style: "cube" } },
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
            emits: { type: "portableBlock", config: { style: "cube" } },
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
