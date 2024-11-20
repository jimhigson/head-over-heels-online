import { describe, test, expect, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { GameState } from "../gameState/GameState";
import { currentRoom } from "../gameState/GameState";
import type { BasicGameStateOptions, TestRoomId } from "@/_testUtils/basicRoom";
import {
  basicGameState,
  firstRoomId,
  secondRoomId,
} from "@/_testUtils/basicRoom";
import {
  playGameThrough,
  stopAllInputAfter,
  stopJumpingAMomentAfterStartingPlay,
} from "@/_testUtils/playGameThrough";
import { blockSizePx } from "@/sprites/spritePivots";
import type { ItemInPlay } from "@/model/ItemInPlay";
import { headState, heelsState, itemState } from "@/_testUtils/characterState";
import {
  liftBBShortening,
  roomHeightBlocks,
} from "../physics/mechanicsConstants";
import { smallItemAabb } from "../collision/boundingBoxes";

const testFrameRates = [
  15, // crazy slow - slower than original
  25, // original game, PAL
  29.97, // NTSC real
  30, // NTSC almost
  50, // double original (interlaced)
  50.04, // double original (interlaced, measured)
  60, // typical default
  75, // typical/high
  144, // high update rate
  500, // highest available currently (2024) and maybe a bit silly!
];

describe("pickups", () => {
  test("character walks into pickup", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "head",
          },
        },
        pickupTwoSquaresFromHead: {
          type: "pickup",
          position: { x: 2, y: 0, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        pickupCharactersWillNotGetInThisTest: {
          type: "pickup",
          position: { x: 4, y: 4, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
      },
      inputState: { left: true },
    });

    expect(headState(gameState).lives).toBe(8);

    // walk left for one second at 60fps:
    playGameThrough(gameState);

    // should have recorded collecting the pickup:
    expect(
      gameState.pickupsCollected[firstRoomId]["pickupTwoSquaresFromHead"],
    ).toBe(true);
    expect(headState(gameState).lives).toBe(10);

    // but not this one (included as a control):
    expect(
      gameState.pickupsCollected[firstRoomId][
        "pickupCharactersWillNotGetInThisTest"
      ],
    ).toBeFalsy();
  });

  test("pickup can land on character", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 4, z: 0 },
          config: {
            which: "heels",
          },
        },
        pickupAboveHeels: {
          type: "pickup",
          position: { x: 0, y: 4, z: 2 },
          config: {
            gives: "extra-life",
          },
        },
      },
    });

    // walk left for one second at 60fps:
    playGameThrough(gameState);

    // should have collected the pickup:
    expect(gameState.pickupsCollected[firstRoomId]["pickupAboveHeels"]).toBe(
      true,
    );
    expect(currentRoom(gameState).items.heels?.state.lives).toBe(10);
  });
});

describe("jumping", () => {
  test.each(testFrameRates)(
    "head can jump between two blocks forming a ladder (%iHz)",
    (frameRate) => {
      const gameState: GameState<TestRoomId> = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 1, z: 0 },
            config: {
              which: "head",
            },
          },
          lowerBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "organic" },
          },
          upperBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 2 },
            config: { style: "organic" },
          },
        },
        inputState: { towards: true, jump: true },
      });

      playGameThrough(gameState, {
        frameRate,
        // in 800ms, head only has time to get into the gap on the way up - it won't
        // pass if he needs to get in while travelling more slowly on the way down
        // - at lower frame rates, this tests that the multiple physics frame
        // per graphics frame is working correctly
        forTime: 800,
        frameCallbacks: stopJumpingAMomentAfterStartingPlay,
      });
      expect(headState(gameState).standingOn?.id).toBe("lowerBlock");
    },
  );

  test.each(testFrameRates)(
    "doesn't snag on the boundary between bounding boxes on the way up a jump (%iHz)",
    (frameRate) => {
      const gameState: GameState<TestRoomId> = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 1, z: 0 },
            config: {
              which: "head",
            },
          },
          // player will need to slide past the boundary between these two blocks via sliding collision
          lowBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "organic" },
          },
          highBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 1 },
            config: { style: "organic" },
          },
        },
        inputState: { towards: true, jump: true },
      });

      playGameThrough(gameState, {
        forTime: 1_000,
        frameRate,
        frameCallbacks: stopJumpingAMomentAfterStartingPlay,
      });

      expect(headState(gameState).standingOn?.id).toBe("highBlock");
    },
  );

  test.each(testFrameRates)(
    "doesn't snag on the boundary between bounding boxes while falling (%iHz)",
    (frameRate) => {
      const gameState: GameState<TestRoomId> = basicGameState({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 1, z: 2 },
            config: {
              which: "head",
            },
          },
          // player will need to slide past the boundary between these two blocks via sliding collision
          lowBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 0 },
            config: { style: "organic" },
          },
          mediumBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 1 },
            config: { style: "organic" },
          },
          highBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 2 },
            config: { style: "organic" },
          },
        },
        inputState: { towards: true },
      });

      // TODO: test that standing on is ull all the way though the fall - should never be a block

      playGameThrough(gameState, {
        // plenty of time to reach the floor:
        forTime: 3_000,
        frameRate,
        frameCallbacks: [
          stopJumpingAMomentAfterStartingPlay,
          (gameState) => {
            expect(headState(gameState).standingOn?.type).not.toBe("block");
            return gameState;
          },
        ],
      });
      expect(headState(gameState).position.z).toBe(0);
      expect(headState(gameState).standingOn?.id).toBe("floor");
    },
  );
});

describe("doors", () => {
  test.each([
    {
      x: 1,
      // at this y heels is pefectly aligned to get through the door without colliding with the doorframe
      y: 2.5,
      z: 0,
    },
    {
      x: 1,
      // at this y, heels is not perfectly aligned with the door - needs sliding to get through
      y: 2,
      z: 0,
    },
  ])("moving from first room to second through door", (startPosition) => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: startPosition,
          config: {
            which: "head",
          },
        },
        doorToSecondRoom: {
          type: "door",
          position: { x: 0, y: 2, z: 0 },
          config: { direction: "right", toRoom: secondRoomId },
        },
      },
      secondRoomItems: {
        doorToFirstRoom: {
          type: "door",
          position: { x: 8, y: 2, z: 0 },
          config: { direction: "left", toRoom: firstRoomId },
        },
      },
      inputState: { right: true },
    });

    playGameThrough(gameState, {
      forTime: 2_000,
    });
    expect(currentRoom(gameState).id).toBe("secondRoom");
  });
});

describe("conveyors", () => {
  test("items move on conveyors and can slide on top of other items", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        portableBlock: {
          type: "portable-block",
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
        conveyor: {
          type: "conveyor",
          position: { x: 0, y: 0, z: 0 },
          config: { direction: "away" },
        },
      },
    });

    playGameThrough(gameState, {
      forTime: 3_000,
    });
    const {
      items: { portableBlock },
    } = currentRoom(gameState);
    // heels should have moved on the conveyor, fallen off, and now be on the floor next to it:
    expect(heelsState(gameState).standingOn?.id).toBe(`floor`);
    expect(heelsState(gameState).position).toEqual({
      x: 2,
      y: blockSizePx.d,
      z: 0,
    });

    // the block should have also moved on the conveyor, and now be on heels:
    expect(
      (portableBlock as ItemInPlay<"portable-block">).state.standingOn?.id,
    ).toBe(`heels`);
    expect(portableBlock?.state.position).toEqual({
      x: 2,
      y: blockSizePx.d,
      z: blockSizePx.h,
    });
  });
});

describe("deadly blocks", () => {
  test("player loses life on touching volcano", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 2 },
          config: {
            which: "head",
          },
        },
        conveyor: {
          type: "deadly-block",
          position: { x: 0, y: 0, z: 0 },
          config: { style: "volcano" },
        },
      },
      secondRoomItems: {
        heels: {
          type: "player",
          position: { x: 2, y: 2, z: 0 },
          config: {
            which: "heels",
          },
        },
      },
    });

    playGameThrough(gameState, {
      forTime: 20_000,
    });

    // heels fell on to the volcano and lost a life repeatedly until none left and switched to heels
    expect(gameState.characterRooms.head).toBe(undefined);
    expect(gameState.currentCharacterName).toBe("heels");
    expect(currentRoom(gameState).id).toBe("secondRoom");
  });
});

describe("snapping stationary items to pixel grid", () => {
  test("snaps to grid after moving and stopping", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        // two items that will fall (and therefore be marked dirty)
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "head",
          },
        },
      },
      inputState: { away: true },
    });

    playGameThrough(gameState, {
      frameCallbacks: stopAllInputAfter(400),
      forTime: 450,
    });

    // this should always be an integer position since head has been stopped for more than a frame
    expect(headState(gameState).position).toMatchInlineSnapshot(`
      {
        "x": 2,
        "y": 12,
        "z": 0,
      }
    `);
  });
});

describe("lifts", () => {
  const liftTop = 3;
  const playerOnALift: BasicGameStateOptions = {
    firstRoomItems: {
      // two items that will fall (and therefore be marked dirty)
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
          bottom: 0,
          top: liftTop,
        },
      },
    },
  };

  test("heels stays stood on a lift", () => {
    const gameState: GameState<TestRoomId> = basicGameState(playerOnALift);

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        // give a little time to fall onto the lift:
        if (gameState.gameTime > 100)
          expect(heelsState(gameState).standingOn?.id).toBe("lift");
      },
      forTime: 5_000, // run for quite a long time
    });
  });

  test("player on a lift reaches lift height", () => {
    const gameState: GameState<TestRoomId> = basicGameState(playerOnALift);

    let maxHeight = 0;

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        maxHeight = Math.max(maxHeight, heelsState(gameState).position.z);
      },
      forTime: 5_000, // run for quite a long time
    });

    const expectedMaxHeight = (liftTop + 1) * blockSizePx.h - liftBBShortening;

    expect(maxHeight).toBeCloseTo(expectedMaxHeight, 0);
  });

  test("player under a lift blocks it", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        // two items that will fall (and therefore be marked dirty)
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
      forTime: 5_000, // run for quite a long time
    });

    // lift is now stuck on top of the player
    expect(itemState(gameState, "lift").position.z).toBe(12);
    // player hasn't moved
    expect(heelsState(gameState).position.z).toBe(0);
  });

  test("lift can take player to next room vertically", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        // two items that will fall (and therefore be marked dirty)
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
            top: roomHeightBlocks,
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
    });

    playGameThrough(gameState, {
      forTime: 5_000, // run for quite a long time
    });

    // heels is now in the above room and standing on the landing
    expect(heelsState(gameState).standingOn?.id).toBe("landing");
  });

  test("player partially on lift can be deposited and picked up", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        // two items that will fall (and therefore be marked dirty)
        heels: {
          type: "player",
          position: { x: 4.5, y: 5, z: 7 },
          config: {
            which: "heels",
          },
        },
        lift: {
          type: "lift",
          position: { x: 5, y: 5, z: 5 },
          config: {
            bottom: 0,
            top: roomHeightBlocks,
          },
        },
        landing: {
          type: "block",
          config: { style: "organic" },
          position: { x: 4, y: 5, z: 5.5 },
        },
      },
    });

    const heelsStandingOnIds: (string | null)[] = [];

    playGameThrough(gameState, {
      forTime: 5_000, // run for quite a long time
      frameCallbacks(gameState) {
        heelsStandingOnIds.push(heelsState(gameState).standingOn?.id || null);
      },
    });

    const categories = Object.groupBy(
      heelsStandingOnIds,
      (id) => id || "null",
    ) as {
      lift: string[];
      landing: string[];
    };

    // should have spent about half the time on the lift and half on the landing
    expect(
      categories.landing.length /
        (categories.landing.length + categories.lift.length),
    ).toBeCloseTo(0.5, 1);
  });

  test("player squashed between rising lift and higher block stays in place standing on lift", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        // two items that will fall (and therefore be marked dirty)
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
            top: roomHeightBlocks,
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
      forTime: 5_000,
    });

    expect(heelsState(gameState).position.z).toBe(blockSizePx.h * 2);
    expect(heelsState(gameState).standingOn?.id ?? null).toBe("lift");
  });
});

describe("pushing", () => {
  const withBlockToPush: BasicGameStateOptions = {
    firstRoomItems: {
      // two items that will fall (and therefore be marked dirty)
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "heels",
        },
      },
      somethingToPush: {
        type: "portable-block",
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
    inputState: { away: true },
  };

  test("player pushes a block until reaching an obstruction", () => {
    const gameState: GameState<TestRoomId> = basicGameState(withBlockToPush);

    playGameThrough(gameState, {
      forTime: 2_000,
    });

    expect(itemState(gameState, "somethingToPush").position.y).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.w * 3 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.w - smallItemAabb.x),
    );
  });

  test("can push multiple blocks in a row", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      ...withBlockToPush,
      firstRoomItems: {
        ...withBlockToPush.firstRoomItems,
        somethingToPush2: {
          type: "portable-block",
          position: { x: 0, y: 2, z: 0 },
          config: {
            style: "cube",
          },
        },
      },
    });

    playGameThrough(gameState, {
      forTime: 2_000,
    });

    expect(itemState(gameState, "somethingToPush2").position.y).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.w * 3 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.w - smallItemAabb.x),
    );
  });
});
