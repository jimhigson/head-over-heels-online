import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { ItemInPlay } from "../../../model/ItemInPlay";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
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
    expect(heelsState(gameState).position).toEqual({
      x: 1,
      y: blockSizePx.y,
      z: 0,
    });

    // the block should have also moved on the conveyor, and now be on heels:
    expect(
      (portableBlock as ItemInPlay<"portableBlock">).state.standingOnItemId,
    ).toEqual("heels");
    expect(portableBlock?.state.position).toEqual({
      x: 2,
      y: blockSizePx.y,
      z: blockSizePx.z,
    });
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

    expect(heelsState(gameState).position).toMatchInlineSnapshot(`
      {
        "x": 16,
        "y": 32,
        "z": 0,
      }
    `);
  });
});
