import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { FrameRateSpec } from "../../../_testUtils/testFrameRates";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { roomItemsIterable } from "../../../model/RoomState";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

const frameRate: FrameRateSpec = { fps: [100] };

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

  // emits immediately on first tick (lastEmittedAtRoomTime starts at neverTime, a large negative sentinel for JSON-serialisability)
  playGameThrough(gameState, {
    until: 10,
    frameRate,
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // before second period elapses, still only one
  playGameThrough(gameState, {
    until: 499,
    frameRate,
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // second period elapses, should emit second
  playGameThrough(gameState, {
    until: 501,
    frameRate,
  });
  expect(countEmittedItems(gameState)).toBe(2);

  // after enough time for all three
  playGameThrough(gameState, {
    until: 2_000,
    frameRate,
  });
  expect(countEmittedItems(gameState)).toBe(3);

  // after more time, still at maximum (no more emitted)
  playGameThrough(gameState, {
    until: 5_000,
    frameRate,
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
    frameRate,
  });
  expect(countEmittedItems(gameState)).toBe(0);

  // after delay, first emission
  playGameThrough(gameState, {
    until: 1_050,
    frameRate,
  });
  expect(countEmittedItems(gameState)).toBe(1);

  // almost second emitting:
  playGameThrough(gameState, {
    until: 1_350,
    frameRate,
  });
  expect(countEmittedItems(gameState)).toBe(2);

  // second emission follows after one more period
  playGameThrough(gameState, {
    until: 1_400,
    frameRate,
  });
  expect(countEmittedItems(gameState)).toBe(2);
});
