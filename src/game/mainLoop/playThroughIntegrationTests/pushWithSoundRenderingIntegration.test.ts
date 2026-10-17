// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { makeTestRenderState } from "../../../_testUtils/makeTestRenderState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { hasCollided } from "../../../_testUtils/playThroughUntilHelpers";
import {
  enoughTimeForSoundsToFade,
  loadSoundsForTest,
  type PlayingSound,
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
  test("bumping into a portableBlock and pushing it into a fixed block", () => {
    const gameState = setUpBasicGame({
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
    });

    const renderState = makeTestRenderState();

    const startingY = itemState<"portableBlock">(gameState, "somethingToPush")
      .box.y;

    // initially silent
    expect(soundsPlaying(renderState)).toEqual([]);

    playGameThrough(gameState, renderState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      frameRate,
      until: hasCollided("heels", "somethingToPush"),
    });

    expect(soundPlayback(renderState, "softBump")).toBe("spotEffect");

    playGameThrough(gameState, renderState, {
      frameRate,
      // the block is moving:
      until: () =>
        itemState<"portableBlock">(gameState, "somethingToPush").box.y >
        startingY,
    });

    expect(soundPlayback(renderState, "scrape")).toBe("loop");

    playGameThrough(gameState, renderState, {
      frameRate,
      until: hasCollided("somethingToPush", "soothingToPushInto"),
    });

    expect(soundPlayback(renderState, "softBump")).toBe("spotEffect");

    // keep pushing against the obstruction:
    playGameThrough(gameState, renderState, {
      frameRate,
      forTime: enoughTimeForSoundsToFade,
    });

    // heels keeps walking into the stuck block, so only footsteps remain:
    expect<Array<PlayingSound>>(soundsPlaying(renderState)).toEqual<
      Array<PlayingSound>
    >([{ soundId: "heelsWalk", playback: "loop" }]);
  });

  test("bumping into another item while already pushing one item", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0.5, y: 0, z: 0 },
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
          position: { x: 1, y: 2, z: 0 },
          config: {
            style: "organic",
          },
        },
      },
    });

    const renderState = makeTestRenderState();

    playGameThrough(gameState, renderState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      frameRate,
      until: hasCollided("heels", "somethingToPush"),
    });

    expect(soundPlayback(renderState, "softBump")).toBe("spotEffect");

    playGameThrough(gameState, renderState, {
      frameRate,
      until: hasCollided("heels", "soothingToPushInto"),
    });

    expect(soundPlayback(renderState, "softBump")).toBe("spotEffect");
  });
});
