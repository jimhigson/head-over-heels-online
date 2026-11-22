import { beforeEach, describe, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { hasCollided } from "../../../_testUtils/playThroughUntilHelpers";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { blockSizePx } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

describe("conveyors", () => {
  test("items move on conveyors and can slide on top of other items", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        portableBlock: {
          type: "portableBlock",
          position: { x: 0, y: 0, z: 8 },
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
    expect(heelsState(gameState).box).toMatchObject({
      x: 1,
      y: blockSizePx.y,
      z: 0,
    });

    // the block should have also moved on the conveyor, and now be on heels:
    expect(
      (portableBlock as ItemInPlay<"portableBlock">).state.standingOnItemId,
    ).toEqual("heels");
    expect(portableBlock?.state.box).toMatchObject({
      x: 2,
      y: blockSizePx.y,
      z: blockSizePx.z,
    });
  });

  test("speed=2 conveyor moves a block further than a standard conveyor in the same time", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: 4, z: 0 },
          config: { which: "heels" },
        },
        // standard speed conveyor at x=0, 4 blocks long
        standardConveyor: {
          type: "conveyor",
          position: { x: 0, y: 0, z: 0 },
          config: { direction: "away", times: { y: 4 } },
        },
        // fast conveyor at x=2, 4 blocks long
        fastConveyor: {
          type: "conveyor",
          position: { x: 2, y: 0, z: 0 },
          config: { direction: "away", speed: 2, times: { y: 4 } },
        },
        standardBlock: {
          type: "portableBlock",
          position: { x: 0, y: 0, z: 1 },
          config: { style: "cube" },
        },
        fastBlock: {
          type: "portableBlock",
          position: { x: 2, y: 0, z: 1 },
          config: { style: "cube" },
        },
      },
    });

    playGameThrough(gameState, { until: 500 });

    const standardBlockY = itemState(gameState, "standardBlock").box.y;
    const fastBlockY = itemState(gameState, "fastBlock").box.y;

    // the fast block should have moved further in +y than the standard one
    expect(fastBlockY).toBeGreaterThan(standardBlockY);
  });

  test("conveyors can take item around corners (see blacktooth26)", () => {
    const gameState = setUpBasicGame({
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

    expect(heelsState(gameState).box).toMatchInlineSnapshot(`
      {
        "x": 16,
        "xd": 12,
        "y": 32,
        "yd": 12,
        "z": 0,
        "zd": 12,
      }
    `);
  });
});

describedForAllFrameRates((frameRate) => {
  test("a conveyor carries two cubes into a wall, where both stop, the second against the first, without jittering", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // well out of the conveyor's way:
          position: { x: 0, y: 7, z: 0 },
          config: { which: "heels" },
        },
        conveyor: {
          type: "conveyor",
          position: { x: 1, y: 3, z: 0 },
          config: { direction: "left", times: { x: 7 } },
        },
        ahead: {
          type: "portableBlock",
          position: { x: 6, y: 3, z: 1 },
          config: { style: "cube" },
        },
        behind: {
          type: "portableBlock",
          position: { x: 3, y: 3, z: 1 },
          config: { style: "cube" },
        },
      },
    });

    playGameThrough(gameState, {
      frameRate,
      until: hasCollided("behind", "ahead"),
      failAfter: 10_000,
    });
    // let them settle against the wall and each other:
    playGameThrough(gameState, { frameRate, forTime: 200 });

    const aheadBox = { ...itemState<"portableBlock">(gameState, "ahead").box };
    const behindBox = {
      ...itemState<"portableBlock">(gameState, "behind").box,
    };

    expect(
      Math.round((aheadBox.x - (behindBox.x + behindBox.xd)) * 100) / 100,
      "gap between the cube behind and the one ahead, once settled",
    ).toBe(0);

    playGameThrough(gameState, {
      frameRate,
      forTime: 1_000,
      frameCallbacks(gameState) {
        // checked every frame, so a failure reports when either moved:
        expect(
          {
            ahead: itemState<"portableBlock">(gameState, "ahead").box,
            behind: itemState<"portableBlock">(gameState, "behind").box,
          },
          "both cubes, settled against the wall and each other, should stay still",
        ).toEqual({ ahead: aheadBox, behind: behindBox });
      },
    });
  });
});
