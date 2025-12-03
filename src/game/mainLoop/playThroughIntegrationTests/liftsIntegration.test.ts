import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { produce } from "immer";

import type {
  BasicGameStateOptions,
  TestRoomId,
} from "../../../_testUtils/basicRoom";
import type { PlayableItem } from "../../physics/itemPredicates";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { defaultRoomHeightBlocks } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

describe("lifts", () => {
  const liftTop = 3;
  const playerOnALift = {
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 1 },
        config: {
          which: "heels",
        },
      },
      lift: {
        type: "lift",
        position: { x: 0, y: 0, z: 0 },
        config: {
          bottom: 0 as number,
          top: liftTop as number,
        },
      },
    },
  } as const satisfies BasicGameStateOptions;

  // skipping because lifts have now been sped up so much that this no longer applies
  test.skip("heels stays stood on a lift", () => {
    const gameState = setUpBasicGame(playerOnALift);
    const heelsStandingOnPerFrame: Array<
      PlayableItem<"heels", TestRoomId>["state"]["standingOnItemId"]
    > = [];

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        // give a little time to fall onto the lift:
        if (gameState.gameTime > 200)
          heelsStandingOnPerFrame.push(heelsState(gameState).standingOnItemId);
      },
      until: 5_000, // run for quite a long time
    });

    expect(heelsStandingOnPerFrame).toMatchObject(
      new Array(heelsStandingOnPerFrame.length).fill("lift"),
    );
  });

  test("heels stays stood on a stationary lift", () => {
    const gameState = setUpBasicGame(
      produce(playerOnALift, (options) => {
        options.firstRoomItems.lift.config.top = 0;
        options.firstRoomItems.lift.config.bottom = 0;
      }),
    );
    const heelsZPosPerFrame: Array<
      PlayableItem<"heels", TestRoomId>["state"]["position"]["z"]
    > = [];

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        // give a little time to fall onto the lift:
        if (gameState.gameTime > 200)
          heelsZPosPerFrame.push(heelsState(gameState).position.z);
      },
      until: 5_000, // run for quite a long time
    });

    // since the lift is stationary, the z position should have held absolutely solid:
    expect(heelsZPosPerFrame).toMatchObject(
      new Array(heelsZPosPerFrame.length).fill(12),
    );
  });

  test("player on a lift reaches lift height", () => {
    const gameState = setUpBasicGame(playerOnALift);

    let maxHeight = 0;

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        maxHeight = Math.max(maxHeight, heelsState(gameState).position.z);
      },
      until: 5_000, // run for quite a long time
    });

    const expectedMaxHeight = (liftTop + 1) * blockSizePx.z;

    expect(maxHeight).toBeCloseTo(expectedMaxHeight, 0);
  });

  test("player under a lift blocks it", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 0, y: 0, z: 1 },
          config: {
            bottom: 0,
            top: liftTop,
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: 5_000, // run for quite a long time
    });

    // lift is now stuck on top of the player
    expect(itemState(gameState, "lift")?.position.z).toBe(12);
    // player hasn't moved
    expect(heelsState(gameState).position.z).toBe(0);
  });

  test("lift can take player to next room vertically", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 1 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 0 },
          config: {
            bottom: 0,
            top: defaultRoomHeightBlocks,
          },
        },
      },
      firstRoomProps: {
        roomAbove: "secondRoom",
      },
      secondRoomItems: {
        // a block to stand on when getting to the new room:
        landing: {
          type: "block",
          config: { style: "organic" },
          position: { x: 5, y: 5, z: 0 },
        },
      },
      secondRoomProps: {
        roomBelow: "firstRoom",
        // 2nd room should have no floor?
      },
    });

    playGameThrough(gameState, {
      until: 5_000, // run for quite a long time
    });

    // heels is now in the above room and standing on the landing
    expect(gameState.characterRooms.heels?.id).toEqual("secondRoom");
    expect(heelsState(gameState).standingOnItemId).toEqual("landing");
  });

  test("player partially on lift can be deposited and picked up", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4.5, y: 5, z: 8 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 5 },
          config: {
            bottom: 0,
            top: 9,
          },
        },
        landing: {
          type: "block",
          config: { style: "organic" },
          position: { x: 4, y: 5, z: 7 },
        },
      },
    });

    const heelsStandingOnPerFrame: Array<
      PlayableItem<"heels", TestRoomId>["state"]["standingOnItemId"]
    > = [];

    playGameThrough(gameState, {
      until: 5_000, // run for quite a long time
      frameCallbacks(gameState) {
        heelsStandingOnPerFrame.push(heelsState(gameState).standingOnItemId);
      },
    });

    const categories = Object.groupBy(
      heelsStandingOnPerFrame,
      (itemId) => itemId ?? "null",
    ) as {
      lift?: string[];
      landing?: string[];
      null?: string[];
    };

    const fractionOnLanding =
      (categories.landing?.length ?? 0) / heelsStandingOnPerFrame.length;
    // should have spent about half the time on the lift and half on the landing
    // although this needs some slack due to acceleration at the end of the lift's journey
    // making it take more time
    expect(fractionOnLanding).toBeLessThan(0.65);
    expect(fractionOnLanding).toBeGreaterThan(0.35);
  });

  test("player squashed between rising lift and higher block stays in place standing on lift", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4.5, y: 5, z: 1 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 0 },
          config: {
            bottom: 0,
            top: defaultRoomHeightBlocks,
          },
        },
        landing: {
          type: "block",
          config: { style: "organic" },
          position: { x: 4, y: 5, z: 3 },
        },
      },
    });

    playGameThrough(gameState, {
      until: 5_000,
    });

    expect(heelsState(gameState).position.z).toBe(blockSizePx.z * 2);
    expect(heelsState(gameState).standingOnItemId).toEqual("lift");
  });

  test("lift does not move if a heavy item is on it (blacktooth 78)", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 2 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 0 },
          config: {
            bottom: 0,
            top: 5,
          },
        },
        heavyBlock: {
          type: "pushableBlock",
          config: {},
          position: { x: 5, y: 5, z: 1 },
        },
      },
    });

    playGameThrough(gameState, {
      until: 1_000,
    });

    expect(itemState(gameState, "lift")!.position.z).toBeCloseTo(0);
    expect(heelsState(gameState).position.z).toEqual(blockSizePx.z * 2);
    expect(heelsState(gameState).standingOnItemId).toEqual("heavyBlock");
  });
});
