import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";

beforeEach(() => {
  resetStore();
});

test("timer toggles a movingPlatform's activated state on its period", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 0 },
        config: { which: "heels" },
      },
      timer: {
        type: "timer",
        position: { x: 0, y: 0, z: 0 },
        config: {
          period: 500,
          initialSetting: "left",
          modifies: [
            {
              expectType: "movingPlatform",
              activates: true,
              targets: ["platform"],
            },
          ],
        },
      },
      platform: {
        type: "movingPlatform",
        position: { x: 4, y: 4, z: 0 },
        config: {
          movement: "back-forth",
          activated: "off",
          startDirection: "towards",
        },
      },
    },
  });

  expect(itemState<"movingPlatform">(gameState, "platform").activated).toBe(
    false,
  );

  // first fire at ~500ms applies "right" (activated: false) — no visible change
  // second fire at ~1000ms applies "left" (activated: true)
  playGameThrough(gameState, {
    until(gameState) {
      return gameState.gameTime > 1_100;
    },
  });

  expect(itemState<"movingPlatform">(gameState, "platform").activated).toBe(
    true,
  );

  // third fire at ~1500ms applies "right" (activated: false)
  playGameThrough(gameState, {
    until(gameState) {
      return gameState.gameTime > 1_600;
    },
  });

  expect(itemState<"movingPlatform">(gameState, "platform").activated).toBe(
    false,
  );
});

test("timer respects delay before first fire", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 0 },
        config: { which: "heels" },
      },
      timer: {
        type: "timer",
        position: { x: 0, y: 0, z: 0 },
        config: {
          period: 200,
          delay: 1_000,
          initialSetting: "left",
          modifies: [
            {
              expectType: "movingPlatform",
              activates: true,
              targets: ["platform"],
            },
          ],
        },
      },
      platform: {
        type: "movingPlatform",
        position: { x: 4, y: 4, z: 0 },
        config: {
          movement: "back-forth",
          activated: "off",
          startDirection: "towards",
        },
      },
    },
  });

  // delay=1000, period=200, lastFired=0: first fire at ~1000 applies "right" (activated: false)
  playGameThrough(gameState, {
    until(gameState) {
      return gameState.gameTime > 1_100;
    },
  });

  expect(itemState<"movingPlatform">(gameState, "platform").activated).toBe(
    false,
  );

  // second fire at ~1200 applies "left" (activated: true)
  playGameThrough(gameState, {
    until(gameState) {
      return gameState.gameTime > 1_300;
    },
  });

  expect(itemState<"movingPlatform">(gameState, "platform").activated).toBe(
    true,
  );
});

test("timer can be disabled by a switch", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 0 },
        config: { which: "heels" },
      },
      sw: {
        type: "switch",
        position: { x: 2, y: 2, z: 0 },
        config: {
          initialSetting: "left",
          type: "in-room",
          modifies: [
            {
              expectType: "timer",
              activates: true,
              targets: ["timer"],
            },
          ],
        },
      },
      timer: {
        type: "timer",
        position: { x: 0, y: 0, z: 0 },
        config: {
          period: 200,
          initialSetting: "left",
          modifies: [
            {
              expectType: "movingPlatform",
              activates: true,
              targets: ["platform"],
            },
          ],
        },
      },
      platform: {
        type: "movingPlatform",
        position: { x: 4, y: 4, z: 0 },
        config: {
          movement: "back-forth",
          activated: "off",
          startDirection: "towards",
        },
      },
    },
  });

  // period=200: first fire at ~200 applies "right" (deactivates), second at ~400 applies "left" (activates)
  playGameThrough(gameState, {
    until(gameState) {
      return gameState.gameTime > 500;
    },
  });

  expect(itemState<"timer">(gameState, "timer").activated).toBe(true);
  expect(itemState<"movingPlatform">(gameState, "platform").activated).toBe(
    true,
  );

  // walk heels into the switch to toggle it — this should deactivate the timer
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "left";
    },
    until() {
      return itemState<"timer">(gameState, "timer").activated === false;
    },
  });

  expect(itemState<"timer">(gameState, "timer").activated).toBe(false);

  const platformActivatedAfterSwitch = itemState<"movingPlatform">(
    gameState,
    "platform",
  ).activated;

  // run for another second — timer is disabled so platform state should not change
  playGameThrough(gameState, {
    until(gameState) {
      return gameState.gameTime > 3_000;
    },
  });

  expect(itemState<"movingPlatform">(gameState, "platform").activated).toBe(
    platformActivatedAfterSwitch,
  );
});
