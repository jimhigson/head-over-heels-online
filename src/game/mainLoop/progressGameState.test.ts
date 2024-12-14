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
import type { PlayableItem } from "../physics/itemPredicates";
import { headState, heelsState, itemState } from "@/_testUtils/characterState";
import {
  liftBBShortening,
  roomHeightBlocks,
} from "../physics/mechanicsConstants";
import { smallItemAabb } from "../collision/boundingBoxes";
import { noInput } from "../input/InputState";

const testFrameRates = [
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
    // the pickup should have disappeared:
    expect(
      currentRoom(gameState).items["pickupTwoSquaresFromHead"],
    ).toBeUndefined();
    expect(headState(gameState).lives).toBe(10);

    // but not this one (included as a control):
    expect(
      gameState.pickupsCollected[firstRoomId][
        "pickupCharactersWillNotGetInThisTest"
      ],
    ).toBeFalsy();
    expect(
      currentRoom(gameState).items["pickupCharactersWillNotGetInThisTest"],
    ).not.toBeUndefined();
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
    expect(heelsState(gameState).lives).toBe(10);
    // the pickup should have disappeared:
    expect(currentRoom(gameState).items["pickupAboveHeels"]).toBeUndefined();
  });

  test.todo(
    "pickups do not come back after leaving room and coming back",
    () => {},
  );
  test.todo(
    "fish do not come back after leaving room and coming back",
    () => {},
  );
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
            config: { style: "organic", disappearing: false },
          },
          upperBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 2 },
            config: { style: "organic", disappearing: false },
          },
        },
        inputState: { towards: true },
      });

      playGameThrough(gameState, {
        frameRate,
        until: 1200,
        frameCallbacks: [
          function startJumpingSoonAfterTheStart(gameState) {
            const inputState = {
              ...noInput(),
              towards: true,
              jump:
                gameState.gameTime > 100 &&
                headState(gameState).position.z === 0,
            };

            // since head gets into the gap, should not go past one block of height:
            expect(headState(gameState).position.z).toBeLessThan(
              blockSizePx.h + 1,
            );

            /*            console.log(
              headState(gameState).position,
              headState(gameState).standingOn?.id ?? null,
              "inputState.jump:",
              inputState.jump,
            );*/

            // stop pressing jump after a short time
            return {
              ...gameState,
              inputState,
            };
          },
        ],
      });
      expect(headState(gameState).standingOn).toMatchObject({
        id: "lowerBlock",
      });
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
            config: { style: "organic", disappearing: false },
          },
          highBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 1 },
            config: { style: "organic", disappearing: false },
          },
        },
        inputState: { towards: true, jump: true },
      });

      playGameThrough(gameState, {
        until: 1_500,
        frameRate,
        frameCallbacks: stopJumpingAMomentAfterStartingPlay,
      });

      expect(headState(gameState).standingOn).toMatchObject({
        id: "highBlock",
      });
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
            config: { style: "organic", disappearing: false },
          },
          mediumBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 1 },
            config: { style: "organic", disappearing: false },
          },
          highBlock: {
            type: "block",
            position: { x: 0, y: 0, z: 2 },
            config: { style: "organic", disappearing: false },
          },
        },
        inputState: { towards: true },
      });

      // TODO: test that standing on is ull all the way though the fall - should never be a block

      playGameThrough(gameState, {
        // plenty of time to reach the floor:
        until: 3_000,
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
      expect(headState(gameState).standingOn).toMatchObject({ id: "floor" });
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
      until: 2_000,
    });
    expect(currentRoom(gameState).id).toBe("secondRoom");
  });
});

describe("teleporter", () => {
  test("can teleport to the next room", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 0, y: 2, z: 1 },
          config: {
            which: "heels",
          },
        },
        teleporter: {
          type: "teleporter",
          position: { x: 0, y: 2, z: 0 },
          config: { toRoom: secondRoomId },
        },
      },
      secondRoomItems: {
        teleporterLanding: {
          type: "block",
          position: { x: 0, y: 2, z: 0 },
          config: { style: "organic", disappearing: false },
        },
      },
      inputState: { jump: true },
    });

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        if (gameState.characterRooms.heels?.room.id === "secondRoom") {
          // stop jumping when gone through the teleporter
          gameState.inputState.jump = false;
        }
      },
      until(gameState) {
        return heelsState(gameState).standingOn?.id === "teleporterLanding";
      },
    });
  });
});

describe("conveyors", () => {
  test("items move on conveyors and can slide on top of other items", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
      firstRoomItems: {
        portableBlock: {
          type: "portableBlock",
          position: { x: 0, y: 0, z: 7 },
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
    } = currentRoom(gameState);
    // heels should have moved on the conveyor, fallen off, and now be on the floor next to it:
    expect(heelsState(gameState).standingOn).toMatchObject({ id: "floor" });
    expect(heelsState(gameState).position).toEqual({
      x: 2,
      y: blockSizePx.d,
      z: 0,
    });

    // the block should have also moved on the conveyor, and now be on heels:
    expect(
      (portableBlock as ItemInPlay<"portableBlock">).state.standingOn,
    ).toMatchObject({ id: "heels" });
    expect(portableBlock?.state.position).toEqual({
      x: 2,
      y: blockSizePx.d,
      z: blockSizePx.h,
    });
  });

  test("conveyors can take item around corners (see blacktooth26)", () => {
    const gameState: GameState<TestRoomId> = basicGameState({
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
          type: "deadlyBlock",
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
      until: 20_000,
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
          position: { x: Math.PI, y: Math.PI, z: 0 },
          config: {
            which: "head",
          },
        },
      },
      inputState: { away: true },
    });

    playGameThrough(gameState, {
      frameCallbacks: stopAllInputAfter(400),
      until: 500,
    });

    // this should always be an integer position since head has been stopped for more than a frame
    expect(headState(gameState).position).toMatchInlineSnapshot(`
      {
        "x": 52,
        "y": 62,
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
    // this is failing because heels hasn't had enough time to fall fast enough to match the lift's fall speed

    const gameState: GameState<TestRoomId> = basicGameState(playerOnALift);
    const heelsStandingOnPerFrame: Array<
      PlayableItem<"heels", TestRoomId>["state"]["standingOn"]
    > = [];

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        // give a little time to fall onto the lift:
        if (gameState.gameTime > 200)
          heelsStandingOnPerFrame.push(heelsState(gameState).standingOn);
      },
      until: 5_000, // run for quite a long time
    });

    expect(heelsStandingOnPerFrame).toMatchObject(
      new Array(heelsStandingOnPerFrame.length).fill({ id: "lift" }),
    );
  });

  test("player on a lift reaches lift height", () => {
    const gameState: GameState<TestRoomId> = basicGameState(playerOnALift);

    let maxHeight = 0;

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        maxHeight = Math.max(maxHeight, heelsState(gameState).position.z);
      },
      until: 5_000, // run for quite a long time
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
      until: 5_000, // run for quite a long time
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
          config: { style: "organic", disappearing: false },
          position: { x: 5, y: 5, z: 0 },
        },
      },
      secondRoomProps: {
        roomBelow: "firstRoom",
        floor: "none",
      },
    });

    playGameThrough(gameState, {
      until: 5_000, // run for quite a long time
    });

    // heels is now in the above room and standing on the landing
    expect(heelsState(gameState).standingOn).toMatchObject({ id: "landing" });
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
            top: 9,
          },
        },
        landing: {
          type: "block",
          config: { style: "organic", disappearing: false },
          position: { x: 4, y: 5, z: 5.5 },
        },
      },
    });

    const heelsStandingOnPerFrame: Array<
      PlayableItem<"heels", TestRoomId>["state"]["standingOn"]
    > = [];

    playGameThrough(gameState, {
      until: 5_000, // run for quite a long time
      frameCallbacks(gameState) {
        heelsStandingOnPerFrame.push(heelsState(gameState).standingOn);
      },
    });

    const categories = Object.groupBy(
      heelsStandingOnPerFrame,
      (item) => item?.id ?? "null",
    ) as {
      lift?: string[];
      landing?: string[];
      null?: string[];
    };

    const fractionOnLanding =
      (categories.landing?.length ?? 0) / heelsStandingOnPerFrame.length;
    // should have spent about half the time on the lift and half on the landing
    expect(fractionOnLanding).toBeLessThan(0.6);
    expect(fractionOnLanding).toBeGreaterThan(0.4);
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
          config: { style: "organic", disappearing: false },
          position: { x: 4, y: 5, z: 3 },
        },
      },
    });

    playGameThrough(gameState, {
      until: 5_000,
    });

    expect(heelsState(gameState).position.z).toBe(blockSizePx.h * 2);
    expect(heelsState(gameState).standingOn).toMatchObject({ id: "lift" });
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
          disappearing: false,
        },
      },
    },
    inputState: { away: true },
  };

  test("player pushes a block until reaching an obstruction", () => {
    const gameState: GameState<TestRoomId> = basicGameState(withBlockToPush);

    playGameThrough(gameState, {
      until: 2_000,
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
          type: "portableBlock",
          position: { x: 0, y: 2, z: 0 },
          config: {
            style: "cube",
          },
        },
      },
    });

    playGameThrough(gameState, {
      until: 2_000,
    });

    expect(itemState(gameState, "somethingToPush2").position.y).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.w * 3 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.w - smallItemAabb.x),
    );
  });
});

describe("jumping", () => {
  test.todo("heels can't jump between a two block gap", () => {
    //     (h) --> jump    can't land here
    // (block) (gap) (gap) (block)
  });
});

describe("dissapearing items", () => {
  const gameStateWithDisappearingBlocks: GameState<TestRoomId> = basicGameState(
    {
      firstRoomItems: {
        // two items that will fall (and therefore be marked dirty)
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 1 },
          config: {
            which: "heels",
          },
        },
        disappearingBlock0: {
          type: "block",
          position: { x: 0, y: 0, z: 0 },
          config: {
            style: "organic",
            disappearing: true,
          },
        },
        disappearingBlock1: {
          type: "block",
          // note elevated block tests that can get up on and jump off disappearing blocks
          // - this is needed for heels' tricky jumping rooms such as #egyptus15
          position: { x: 0, y: 1, z: 1 },
          config: {
            style: "organic",
            disappearing: true,
          },
        },
        disappearingBlock2: {
          type: "block",
          position: { x: 0, y: 2, z: 0 },
          config: {
            style: "organic",
            disappearing: true,
          },
        },
        disappearingBlock3: {
          type: "block",
          position: { x: 0, y: 3, z: 0 },
          config: {
            style: "organic",
            disappearing: true,
          },
        },
        pickup: {
          type: "pickup",
          position: { x: 0, y: 4, z: 2 },
          config: {
            gives: "extra-life",
          },
        },
      },
      firstRoomProps: {
        floor: "deadly",
      },
    },
  );

  test("can jump along a line of disappearing blocks", () => {
    playGameThrough(
      {
        ...gameStateWithDisappearingBlocks,
        inputState: { ...noInput(), jump: true, away: true },
      },
      {
        frameCallbacks(gameState) {
          // should not lose any lives
          expect(heelsState(gameState).lives).toBeGreaterThanOrEqual(8);
        },
        until(gameState) {
          // got two more lives
          return heelsState(gameState).lives === 10;
        },
      },
    );
  });
  test("can not walk along a line of disappearing blocks", () => {
    playGameThrough(
      {
        ...gameStateWithDisappearingBlocks,
        inputState: { ...noInput(), away: true /* not jumping */ },
      },
      {
        until(gameState) {
          // lost a life
          return heelsState(gameState).lives === 7;
        },
      },
    );
  });
  test("can jump along a line of pickups, collecting them", () => {
    const gameState = basicGameState({
      firstRoomItems: {
        // two items that will fall (and therefore be marked dirty)
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 2 },
          config: {
            which: "heels",
          },
        },
        disappearingpickup0: {
          type: "pickup",
          position: { x: 0, y: 0, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        disappearingpickup1: {
          type: "pickup",
          position: { x: 0, y: 1, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        disappearingpickup2: {
          type: "pickup",
          position: { x: 0, y: 2, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
        disappearingpickup3: {
          type: "pickup",
          // note the block is higher, testing that the player can climb up disappearing blocks as heels.
          // this requires that they don't vanish as soon as they are touched, but only when stood on
          position: { x: 0, y: 3, z: 0 },
          config: {
            gives: "extra-life",
          },
        },
      },
      firstRoomProps: {
        floor: "deadly",
      },
    });

    playGameThrough(
      { ...gameState, inputState: { ...noInput(), jump: true, away: true } },
      {
        frameCallbacks(gameState) {
          // should not lose any lives. If this happens, was not able to jump off pickups as they are collected
          // and fell onto the deadly floor
          expect(heelsState(gameState).lives).toBeGreaterThanOrEqual(8);
        },
        until(gameState) {
          // got 4 x 2 more lives
          return heelsState(gameState).lives === 16;
        },
      },
    );
  });
});

describe("touching", () => {
  test("standing overlapping the edge of a block, a baddie on the floor doesn't kill the player", () => {});
});
