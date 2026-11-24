import { beforeEach, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { epsilon } from "../../../utils/epsilon";
import { standingOnLatencyMs } from "../../gameState/mutators/assignLatentMovement";
import {
  blockSizePx,
  moveSpeedPixPerMs,
} from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

describedForAllFrameRates((frameRate) => {
  test("a block on heels' head trails slightly behind while walking, without falling off", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // note - heels starts a little ahead of the block, to make it more likely
          // to fall off if the code is not working right
          position: { x: 0, y: 0.6, z: 0 },
          config: {
            which: "heels",
          },
        },
        // heels has a block on their head:
        pushableBlock: {
          type: "pushableBlock",
          config: {},
          position: { x: 0, y: 0, z: 1 },
        },
      },
    });

    const yDeltaNow = () => {
      const heelsNewPosition = heelsState(gameState).box;
      const pushableBlockPosition = itemState(gameState, "pushableBlock")!.box;

      // the block should be slightly behind heels:
      return heelsNewPosition.y - pushableBlockPosition.y;
    };
    const pushableBlockZ = () => {
      const pushableBlockPosition = itemState(gameState, "pushableBlock")!.box;

      // the block should be slightly behind heels:
      return pushableBlockPosition.z;
    };

    let initialPositionDelta: number | undefined = undefined;

    playGameThrough(gameState, {
      frameRate,
      until: 2_000,
      setupInitialInput(mockInputStateTracker) {
        initialPositionDelta = yDeltaNow();
        mockInputStateTracker.mockDirectionPressed = "away";
      },
    });

    if (initialPositionDelta === undefined) {
      throw new Error("behindByOnFirstFrame was not set");
    }

    const behindByWhileWalking = yDeltaNow() - initialPositionDelta;

    // should still be on heels (not fallen on the floor - if zero, it has slipped off!):
    expect(pushableBlockZ()).toBe(blockSizePx.z);
    // carried a latency after heels moved, so behind by how far heels walks in that time:
    expect(behindByWhileWalking).toBeCloseTo(
      moveSpeedPixPerMs.heels * standingOnLatencyMs,
    );

    playGameThrough(gameState, {
      frameRate,
      until: 2_500, // another half-second to stop
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = undefined;
      },
    });

    const behindByAfterStopping = yDeltaNow() - initialPositionDelta;

    // should still be on heels (not fallen on the floor):
    expect(pushableBlockZ()).toBe(blockSizePx.z);

    // the block should no longer be behind
    expect(behindByAfterStopping).toBeGreaterThanOrEqual(-1);
    expect(behindByAfterStopping).toBeLessThanOrEqual(1);
  });

  test("a cube pushed with a cube on it, then stopped, carries the top cube exactly as far as the bottom one went", () => {
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
    const bottomStart = {
      ...itemState<"portableBlock">(gameState, "bottom").box,
    };
    const topStart = { ...itemState<"portableBlock">(gameState, "top").box };

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      frameRate,
      forTime: 1_000,
    });
    // stop, and let the top cube's carried movement finish:
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = undefined;
      },
      frameRate,
      forTime: 500,
    });

    const bottomBox = itemState<"portableBlock">(gameState, "bottom").box;
    const topBox = itemState<"portableBlock">(gameState, "top").box;
    expect({
      topOn: itemState<"portableBlock">(gameState, "top").standingOnItemId,
      topMoved: Math.round((topBox.x - topStart.x) * 100) / 100,
    }).toEqual({
      topOn: "bottom",
      topMoved: Math.round((bottomBox.x - bottomStart.x) * 100) / 100,
    });
  });

  test("a cube pushed diagonally with a cube on it, then stopped, carries the top cube exactly the same vector as the bottom one", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 1.5, y: 1.5, z: 0 },
          config: { which: "heels" },
        },
        // straight ahead of heels, along the diagonal:
        bottom: {
          type: "portableBlock",
          position: { x: 2.375, y: 2.375, z: 0 },
          config: { style: "cube" },
        },
        top: {
          type: "portableBlock",
          position: { x: 2.375, y: 2.375, z: 1 },
          config: { style: "cube" },
        },
      },
    });
    const bottomStart = {
      ...itemState<"portableBlock">(gameState, "bottom").box,
    };
    const topStart = { ...itemState<"portableBlock">(gameState, "top").box };

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "awayLeft";
      },
      frameRate,
      forTime: 1_000,
    });
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = undefined;
      },
      frameRate,
      forTime: 500,
    });

    const bottomBox = itemState<"portableBlock">(gameState, "bottom").box;
    const topBox = itemState<"portableBlock">(gameState, "top").box;
    expect({
      topOn: itemState<"portableBlock">(gameState, "top").standingOnItemId,
      topMovedX: Math.round((topBox.x - topStart.x) * 100) / 100,
      topMovedY: Math.round((topBox.y - topStart.y) * 100) / 100,
    }).toEqual({
      topOn: "bottom",
      topMovedX: Math.round((bottomBox.x - bottomStart.x) * 100) / 100,
      topMovedY: Math.round((bottomBox.y - bottomStart.y) * 100) / 100,
    });
  });

  test("head and heels joined pushing a 2-high stack of cubes, then stopping, move both cubes the same distance", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 1.5, y: 3.5, z: 0 },
          config: { which: "heels" },
        },
        // on heels, ready to join them:
        head: {
          type: "player",
          position: { x: 1.5, y: 3.5, z: 1 },
          config: { which: "head" },
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

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("swop");
      },
      frameRate,
      until: (gameState) => gameState.currentCharacterName === "headOverHeels",
      failAfter: 1_000,
    });
    gameState.inputStateTracker.mockNotPressing("swop");
    const bottomStart = {
      ...itemState<"portableBlock">(gameState, "bottom").box,
    };
    const topStart = { ...itemState<"portableBlock">(gameState, "top").box };

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      frameRate,
      forTime: 1_000,
    });
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = undefined;
      },
      frameRate,
      forTime: 500,
    });

    const bottomBox = itemState<"portableBlock">(gameState, "bottom").box;
    const topBox = itemState<"portableBlock">(gameState, "top").box;
    expect({
      topOn: itemState<"portableBlock">(gameState, "top").standingOnItemId,
      topMoved: Math.round((topBox.x - topStart.x) * 100) / 100,
    }).toEqual({
      topOn: "bottom",
      topMoved: Math.round((bottomBox.x - bottomStart.x) * 100) / 100,
    });
  });

  test("a monster pushing the top cube of a stack while another pushes the bottom one moves the top cube further", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // well out of the monsters' way:
          position: { x: 0, y: 7, z: 0 },
          config: { which: "heels" },
        },
        // pushes the bottom cube:
        lowerMonster: {
          type: "monster",
          position: { x: 1.5, y: 3.5, z: 0 },
          config: {
            which: "turtle",
            activated: "on",
            movement: "forwards",
            startDirection: "left",
          },
        },
        // rides on the lower monster, pushing the top cube:
        upperMonster: {
          type: "monster",
          position: { x: 1.5, y: 3.5, z: 1 },
          config: {
            which: "turtle",
            activated: "on",
            movement: "forwards",
            startDirection: "left",
          },
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

    playGameThrough(gameState, {
      frameRate,
      forTime: 1_500,
    });

    const bottomBox = itemState<"portableBlock">(gameState, "bottom").box;
    const topBox = itemState<"portableBlock">(gameState, "top").box;
    expect(topBox.x - bottomBox.x).toBeGreaterThan(1);
  });

  test("a stack of three cubes pushed at the bottom steps back by one carrying latency's movement per layer, and lines up again once stopped", () => {
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
        middle: {
          type: "portableBlock",
          position: { x: 2.5, y: 3.5, z: 1 },
          config: { style: "cube" },
        },
        top: {
          type: "portableBlock",
          position: { x: 2.5, y: 3.5, z: 2 },
          config: { style: "cube" },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      frameRate,
      forTime: 1_000,
    });
    // keep pushing, recording where each layer was, every frame:
    const x = (id: string) => itemState<"portableBlock">(gameState, id).box.x;
    const history: Array<{
      gameTime: number;
      bottomX: number;
      middleX: number;
    }> = [];
    playGameThrough(gameState, {
      frameRate,
      forTime: 400,
      frameCallbacks(gameState) {
        history.push({
          gameTime: gameState.gameTime,
          bottomX: x("bottom"),
          middleX: x("middle"),
        });
      },
    });
    // where a layer was at a given time, between the frames recorded either side:
    const xAtTime = (layer: "bottomX" | "middleX", gameTime: number) => {
      const laterIndex = history.findIndex(
        (record) => record.gameTime >= gameTime,
      );
      const later = history[laterIndex];
      const earlier = history[laterIndex - 1];
      return (
        earlier[layer] +
        ((later[layer] - earlier[layer]) * (gameTime - earlier.gameTime)) /
          (later.gameTime - earlier.gameTime)
      );
    };

    // each layer is carried by the one below a carrying latency later, so is
    // where the one below was that long ago - a step back per layer:
    const latencyAgo = gameState.gameTime - standingOnLatencyMs;
    const round = (px: number) => Math.round(px * 100) / 100;
    expect({
      middleX: round(x("middle")),
      topX: round(x("top")),
    }).toEqual({
      middleX: round(xAtTime("bottomX", latencyAgo)),
      topX: round(xAtTime("middleX", latencyAgo)),
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = undefined;
      },
      frameRate,
      forTime: 500,
    });
    expect({
      middleBehindBottom: Math.round((x("bottom") - x("middle")) * 100) / 100,
      topBehindMiddle: Math.round((x("middle") - x("top")) * 100) / 100,
    }).toEqual({ middleBehindBottom: 0, topBehindMiddle: 0 });
  });

  test("heels walking off a moving platform stops moving with it", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        platform: {
          type: "movingPlatform",
          position: { x: 2, y: 3, z: 0 },
          config: {
            activated: "on",
            movement: "back-forth",
            startDirection: "left",
          },
        },
        heels: {
          type: "player",
          position: { x: 2.125, y: 3.125, z: 1 },
          config: { which: "heels" },
        },
      },
    });

    // ride a while, then walk off the platform's side:
    playGameThrough(gameState, { frameRate, forTime: 500 });
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      frameRate,
      until: (gameState) => heelsState(gameState).standingOnItemId === "floor",
      failAfter: 3_000,
    });

    const heelsXOffPlatform = heelsState(gameState).box.x;
    playGameThrough(gameState, {
      frameRate,
      forTime: 300,
      frameCallbacks(gameState) {
        // checked every frame, so a failure reports when it moved:
        expect(Math.round(heelsState(gameState).box.x * 100) / 100).toBe(
          Math.round(heelsXOffPlatform * 100) / 100,
        );
      },
    });
  });

  test("a top cube carried on a lower pushed cube under a low block is stopped by a static block and left behind, sliding off the lower cube", () => {
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
        // at the top cube's height, so the bottom cube and heels pass under it:
        lowBlock: {
          type: "block",
          position: { x: 5, y: 3, z: 1 },
          config: { style: "organic" },
        },
      },
    });
    const lowBlockBox = { ...itemState<"block">(gameState, "lowBlock").box };

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      frameRate,
      until: (gameState) =>
        itemState<"portableBlock">(gameState, "top").standingOnItemId !==
        "bottom",
      failAfter: 5_000,
      frameCallbacks(gameState) {
        const topBox = itemState<"portableBlock">(gameState, "top").box;
        // checked every frame, so a failure reports when it went into the block:
        expect(topBox.x + topBox.xd).toBeLessThanOrEqual(
          lowBlockBox.x + epsilon,
        );
      },
    });
  });
});
