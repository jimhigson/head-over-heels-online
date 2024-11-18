import { describe, test, expect, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { GameState } from "../gameState/GameState";
import { currentRoom, pickupCollected } from "../gameState/GameState";
import type { TestRoomId } from "@/_testUtils/basicRoom";
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
import { headState, heelsState } from "@/_testUtils/characterState";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";

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
      pickupCollected(gameState, firstRoomId, "pickupTwoSquaresFromHead"),
    ).toBe(true);
    expect(headState(gameState).lives).toBe(10);

    // but not this one (included as a control):
    expect(
      pickupCollected(
        gameState,
        firstRoomId,
        "pickupCharactersWillNotGetInThisTest",
      ),
    ).toBe(false);
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
    expect(pickupCollected(gameState, firstRoomId, "pickupAboveHeels")).toBe(
      true,
    );
    expect(currentRoom(gameState).items.heels?.state.lives).toBe(10);
  });
});

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
        frameCallback: stopJumpingAMomentAfterStartingPlay,
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
        frameCallback: stopJumpingAMomentAfterStartingPlay,
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

      playGameThrough(gameState, {
        // plenty of time to reach the floor:
        forTime: 3_000,
        frameRate,
        frameCallback: stopJumpingAMomentAfterStartingPlay,
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
  test("items move on conveyors", () => {
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

describe("renderPositionDirty", () => {
  test("marks only moved items as dirty", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        // two items that will fall (and therefore be marked dirty)
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 2 },
          config: {
            which: "head",
          },
        },
        fallingPickup: {
          type: "pickup",
          position: { x: 0, y: 0, z: 2 },
          config: { gives: "extra-life" },
        },
        sittingPickup: {
          type: "pickup",
          position: { x: 0, y: 0, z: 0 },
          config: { gives: "extra-life" },
        },
        block: {
          type: "block",
          position: { x: 0, y: 0, z: 0 },
          config: { style: "organic" },
        },
      },
    });

    playGameThrough(gameState, {
      forTime: 10, // 10ms - just run for a short time
    });

    const positionDirtyItems = [
      ...iterate(objectValues(currentRoom(gameState).items))
        .filter((i) => i.renderPositionDirty)
        .map((i) => i.id),
    ];

    // falling items marked as dirty:
    expect(positionDirtyItems.includes("head")).toBeTruthy();
    expect(positionDirtyItems.includes("fallingPickup")).toBeTruthy();
    // nothing else is marked as dirty:
    expect(positionDirtyItems.length).toBe(2);
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
      frameCallback: stopAllInputAfter(400),
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
