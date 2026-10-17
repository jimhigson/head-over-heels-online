// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { makeTestRenderState } from "../../../_testUtils/makeTestRenderState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import {
  hasCollided,
  isActedOnBy,
  not,
} from "../../../_testUtils/playThroughUntilHelpers";
import {
  enoughTimeForSoundsToFade,
  loadSoundsForTest,
  resetSoundsForTest,
  soundPlayback,
  soundsPlaying,
} from "../../../_testUtils/sounds/soundTestUtils";
import { testFrameRates } from "../../../_testUtils/testFrameRates";

beforeEach(async () => {
  resetStore();
  await loadSoundsForTest();
});

afterEach(() => {
  resetSoundsForTest();
});

describe.for(testFrameRates)("at $fps fps", (frameRate) => {
  test("a joystick-controlled charles servos off a block and into a wall, clanging each time", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "heels",
          },
        },
        joystick: {
          type: "joystick",
          config: {},
          position: { x: 1, y: 0, z: 0 },
        },
        blockUnderCharles: {
          type: "block",
          config: {
            style: "organic",
          },
          position: { x: 0, y: 3, z: 0 },
        },
        charles: {
          type: "charles",
          config: {},
          position: { x: 0, y: 3, z: 1 },
        },
        wallForCharles: {
          type: "block",
          config: {
            style: "organic",
          },
          position: { x: 3, y: 3, z: 0 },
        },
      },
    });

    const renderState = makeTestRenderState();

    expect(soundsPlaying(renderState)).toEqual([]);

    playGameThrough(gameState, renderState, {
      setupInitialInput(mockInputStateTracker) {
        // heels runs into the joystick
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      frameRate,
      until: isActedOnBy("charles", "joystick"),
    });

    expect(soundPlayback(renderState, "servoStart")).toBe("spotEffect");

    playGameThrough(gameState, renderState, {
      frameRate,
      // charles walks off the block and lands on the floor:
      until: hasCollided("charles", "floor"),
    });

    expect(soundPlayback(renderState, "metalClang")).toBe("spotEffect");
    expect(soundPlayback(renderState, "servoLoop")).toBe("loop");

    playGameThrough(gameState, renderState, {
      frameRate,
      until: hasCollided("charles", "wallForCharles"),
    });

    expect(soundPlayback(renderState, "metalClang")).toBe("spotEffect");
    expect(soundPlayback(renderState, "servoLoop")).toBe("loop");

    playGameThrough(gameState, renderState, {
      setupInitialInput(mockInputStateTracker) {
        // heels stops pushing the joystick
        mockInputStateTracker.mockDirectionPressed = undefined;
      },
      frameRate,
      until: not(isActedOnBy("charles", "joystick")),
    });

    expect(soundPlayback(renderState, "servoStop")).toBe("spotEffect");

    playGameThrough(gameState, renderState, {
      frameRate,
      forTime: enoughTimeForSoundsToFade,
    });

    expect(soundsPlaying(renderState)).toEqual([]);
  });
});
