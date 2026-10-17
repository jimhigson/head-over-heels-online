import { produce } from "immer";
import { beforeEach, describe, expect, test } from "vitest";

import {
  type BasicGameStateOptions,
  type ItemsInTestRoomJson,
  setUpBasicGame,
  type TestRoomId,
} from "../../../_testUtils/basicRoom";
import {
  headState,
  heelsState,
  itemState,
} from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { itemBehaviourKey } from "../../../model/ItemInPlay";
import {
  isFreeItem,
  type PlayableItem,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type LiftState } from "../../../model/ItemStateMap";
import {
  iterateRoomItemEntries,
  roomItemsIterable,
} from "../../../model/roomItemsInPlayIterators";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import {
  blockSizePx,
  defaultRoomHeightBlocks,
  maxLiftSpeed,
  playerJumpHeightPx,
  terminalVelocityPixPerMs,
} from "../../physics/mechanicsConstants";

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

  test("heels stays stood on a stationary lift", () => {
    const gameState = setUpBasicGame(
      produce(playerOnALift, (options) => {
        options.firstRoomItems.lift.config.top = 0;
        options.firstRoomItems.lift.config.bottom = 0;
      }),
    );
    const heelsZPosPerFrame: Array<
      PlayableItem<"heels", TestRoomId>["state"]["box"]["z"]
    > = [];

    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        // give a little time to fall onto the lift:
        if (gameState.gameTime > 200) {
          heelsZPosPerFrame.push(heelsState(gameState).box.z);
        }
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
        maxHeight = Math.max(maxHeight, heelsState(gameState).box.z);
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
    expect(itemState(gameState, "lift")?.box.z).toBe(12);
    // player hasn't moved
    expect(heelsState(gameState).box.z).toBe(0);
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
        meta: { subRooms: { "*": { above: { room: "secondRoom" } } } },
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
        meta: { subRooms: { "*": { below: { room: "firstRoom" } } } },
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
    expect(fractionOnLanding).toBeGreaterThan(0.3);
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

    expect(heelsState(gameState).box.z).toBe(blockSizePx.z * 2);
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

    expect(itemState(gameState, "lift")!.box.z).toBeCloseTo(0);
    expect(heelsState(gameState).box.z).toEqual(blockSizePx.z * 2);
    expect(heelsState(gameState).standingOnItemId).toEqual("heavyBlock");
  });
});

describe("stacks of items on lifts", () => {
  test.for<{ name: string; items: ItemsInTestRoomJson }>([
    {
      name: "lift carrying a scenery headOverHeels",
      items: {
        // load needs a playable somewhere; kept well away from the lift
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 7, y: 7, z: 0 },
        },
        sp0: {
          type: "sceneryPlayer",
          config: {
            which: "headOverHeels",
            startDirection: "towards",
          },
          position: {
            x: 0,
            y: 0,
            z: 11,
          },
        },
      },
    },
    {
      name: "lift carrying the playable heels",
      items: {
        heels: {
          type: "player",
          config: {
            which: "heels",
          },
          position: {
            x: 0,
            y: 0,
            z: 11,
          },
        },
      },
    },
    {
      name: "lift carrying the playable head",
      items: {
        head: {
          type: "player",
          config: {
            which: "head",
          },
          position: {
            x: 0,
            y: 0,
            z: 11,
          },
        },
      },
    },
    {
      name: "lift carrying a stack of three portable blocks",
      items: {
        // load needs a playable somewhere; kept well away from the lift
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 7, y: 7, z: 0 },
        },
        pb_0_of_2: {
          config: {
            style: "cube",
          },
          position: {
            x: 0,
            y: 0,
            z: 11,
          },
          type: "portableBlock",
        },
        pb_1_of_2: {
          config: {
            style: "cube",
          },
          position: {
            x: 0,
            y: 0,
            z: 12,
          },
          type: "portableBlock",
        },
        pb_2_of_2: {
          config: {
            style: "cube",
          },
          position: {
            x: 0,
            y: 0,
            z: 13,
          },
          type: "portableBlock",
        },
      },
    },
    {
      name: "lift carrying two stacked blocks topped by scenery head",
      items: {
        // load needs a playable somewhere; kept well away from the lift
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 7, y: 7, z: 0 },
        },
        pb_0_of_2: {
          config: {
            style: "cube",
          },
          position: {
            x: 0,
            y: 0,
            z: 11,
          },
          type: "portableBlock",
        },
        pb_1_of_2: {
          config: {
            style: "cube",
          },
          position: {
            x: 0,
            y: 0,
            z: 12,
          },
          type: "portableBlock",
        },
        sp_2_of_2: {
          config: {
            startDirection: "towards",
            which: "head",
          },
          position: {
            x: 0,
            y: 0,
            z: 13,
          },
          type: "sceneryPlayer",
        },
      },
    },
    {
      name: "lift carrying a block with scenery heels on it",
      items: {
        // load needs a playable somewhere; kept well away from the lift
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 7, y: 7, z: 0 },
        },
        pb_0_of_1: {
          config: {
            style: "cube",
          },
          position: {
            x: 0,
            y: 0,
            z: 11,
          },
          type: "portableBlock",
        },
        sp_1_of_1: {
          config: {
            startDirection: "towards",
            which: "heels",
          },
          position: {
            x: 0,
            y: 0,
            z: 12,
          },
          type: "sceneryPlayer",
        },
      },
    },
    {
      name: "lift carrying a scenery heels",
      items: {
        // load needs a playable somewhere; kept well away from the lift
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 7, y: 7, z: 0 },
        },
        sp0: {
          config: {
            startDirection: "towards",
            which: "heels",
          },
          position: {
            x: 0,
            y: 0,
            z: 11,
          },
          type: "sceneryPlayer",
        },
      },
    },
    {
      name: "lift carrying a scenery head",
      items: {
        // load needs a playable somewhere; kept well away from the lift
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 7, y: 7, z: 0 },
        },
        sp0: {
          config: {
            startDirection: "towards",
            which: "head",
          },
          position: {
            x: 0,
            y: 0,
            z: 11,
          },
          type: "sceneryPlayer",
        },
      },
    },
  ])("falling on lifts: $name", ({ items }) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        ...items,
        lift: {
          type: "lift",
          config: {
            bottom: 0,
            top: 11,
          },
          position: {
            x: 0,
            y: 0,
            z: 10,
          },
        },
      },
    });

    // just enough time for the standing on to settle (this isn't what's being tested)
    // while lifts are initially moving upwards for one block:
    playGameThrough(gameState, {
      forTime: 20,
    });

    // capture what all free items are standing on:
    const expectedStandingOns: Record<string, null | string> =
      Object.fromEntries(
        roomItemsIterable(selectCurrentRoomState(gameState)!.items)
          .filter(isFreeItem)
          .map((roomItem) => [roomItem.id, roomItem.state.standingOnItemId]),
      );

    // wait until the lift is descending:
    playGameThrough(gameState, {
      until(gameState) {
        const liftState = itemState(gameState, "lift") as LiftState<
          string,
          string
        >;
        return liftState.direction === "down";
      },
    });

    // everything that was on a lift to be standing on something initially:
    for (const roomItem of roomItemsIterable(
      selectCurrentRoomState(gameState)!.items,
    )) {
      if (!isFreeItem(roomItem)) {
        continue;
      }
      expect(
        roomItem.state.standingOnItemId,
        `${roomItem.id} standing on`,
      ).not.toBeNull();
    }

    const stepTotalTime = 2_000;
    const stepTime = 50;

    while (gameState.gameTime < stepTotalTime) {
      playGameThrough(gameState, { forTime: stepTime });

      const roomItems = selectCurrentRoomState(gameState)!.items;

      for (const [itemId, roomItem] of iterateRoomItemEntries(roomItems)) {
        if (!isFreeItem(roomItem)) {
          continue;
        }

        // falls slower than a lift can descend, so can be left behind by it:
        const isGlidingItem =
          roomItem[itemBehaviourKey].terminalFallVelocity(roomItem) <
          maxLiftSpeed;

        const expectedStandingOnItemId = expectedStandingOns[itemId];
        const expectedStandingOnItem =
          expectedStandingOnItemId === null ? undefined : (
            roomItems[expectedStandingOnItemId]
          );
        const actualStandingOnItemId = roomItem.state.standingOnItemId;

        if (isGlidingItem && actualStandingOnItemId === null) {
          // once we are gliding, expect to never be standing on anything again for the remainder of this test:
          expectedStandingOns[itemId] = null;
          continue;
        }

        expect(
          actualStandingOnItemId,
          `at time ${gameState.gameTime}ms, ${roomItem.type} id="${itemId}" expected to still be standing on ${expectedStandingOnItem?.type} id=${expectedStandingOnItemId}; actual is ${actualStandingOnItemId}`,
        ).toBe(expectedStandingOnItemId);
      }
    }
  });
});

describe("riding lifts", () => {
  test("landing on a descending lift after a jump gives back control", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 0, y: 0, z: 7 },
        },
        lift: {
          type: "lift",
          config: { bottom: 0, top: 6 },
          position: { x: 0, y: 0, z: 6 },
        },
      },
    });

    // jump as the lift starts to descend, and land on it again on the way down:
    playGameThrough(gameState, {
      frameCallbacks(gameState, mockInputStateTracker) {
        if (gameState.gameTime > 30 && gameState.gameTime < 100) {
          mockInputStateTracker.mockPressing("jump");
        } else {
          mockInputStateTracker.mockNotPressing("jump");
        }
      },
      until: 500,
    });
    playGameThrough(gameState, {
      until: (gameState) => heelsState(gameState).standingOnItemId === "lift",
    });
    playGameThrough(gameState, { forTime: 100 });

    expect(heelsState(gameState).action).toBe("idle");
  });

  test("riders of a lift blocked from descending do not build up falling speed", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        // blocks the lift from descending:
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 0, y: 0, z: 0 },
        },
        lift: {
          type: "lift",
          config: { bottom: 0, top: 3 },
          position: { x: 0, y: 0, z: 1 },
        },
        rider: {
          type: "portableBlock",
          config: { style: "cube" },
          position: { x: 0, y: 0, z: 2 },
        },
      },
    });

    playGameThrough(gameState, { until: 3_000 });

    expect(itemState<"portableBlock">(gameState, "rider").vels.gravity.z).toBe(
      0,
    );
  });

  test("head gliding off a descending lift falls at terminal velocity from the start", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        head: {
          type: "player",
          config: { which: "head" },
          position: { x: 0, y: 0, z: 7 },
        },
        lift: {
          type: "lift",
          config: { bottom: 0, top: 6 },
          position: { x: 0, y: 0, z: 6 },
        },
      },
    });

    const headFallingSpeeds: number[] = [];
    let hasLeftLift = false;
    playGameThrough(gameState, {
      frameCallbacks(gameState) {
        if (
          itemState<"lift">(gameState, "lift").vels.lift.z < 0 &&
          headState(gameState).standingOnItemId === null
        ) {
          // falling speed is set from the tick after leaving:
          if (hasLeftLift) {
            headFallingSpeeds.push(headState(gameState).vels.gravity.z);
          }
          hasLeftLift = true;
        }
      },
      until: 2_000,
    });

    expect(headFallingSpeeds).not.toHaveLength(0);
    expect(headFallingSpeeds.map((speed) => speed.toFixed(4))).toEqual(
      new Array(headFallingSpeeds.length).fill(
        (-terminalVelocityPixPerMs.glide).toFixed(4),
      ),
    );
  });

  test("walking off a descending lift keeps the lift's falling speed", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 4, y: 4, z: 7 },
        },
        lift: {
          type: "lift",
          config: { bottom: 0, top: 6 },
          position: { x: 4, y: 4, z: 6 },
        },
      },
    });

    let speedsWhenWalkedOff: { heels: number; lift: number } | undefined;
    let liftVelZWhenLeft: number | undefined;
    playGameThrough(gameState, {
      frameCallbacks(gameState, mockInputStateTracker) {
        const liftVelZ = itemState<"lift">(gameState, "lift").vels.lift.z;
        if (liftVelZ >= 0) {
          return;
        }
        mockInputStateTracker.mockDirectionPressed = "right";
        if (heelsState(gameState).standingOnItemId !== null) {
          return;
        }
        // falling speed is set from the tick after leaving:
        if (liftVelZWhenLeft === undefined) {
          liftVelZWhenLeft = liftVelZ;
        } else {
          speedsWhenWalkedOff ??= {
            heels: heelsState(gameState).vels.gravity.z,
            lift: liftVelZWhenLeft,
          };
        }
      },
      until: () => speedsWhenWalkedOff !== undefined,
    });

    expect(speedsWhenWalkedOff!.heels).toBeCloseTo(
      speedsWhenWalkedOff!.lift,
      2,
    );
  });

  test("jumping off a rising lift goes no higher than a normal jump", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 0, y: 0, z: 1 },
        },
        lift: {
          type: "lift",
          config: { bottom: 0, top: 10 },
          position: { x: 0, y: 0, z: 0 },
        },
      },
    });

    let maxZWhileJumping = 0;
    playGameThrough(gameState, {
      frameCallbacks(gameState, mockInputStateTracker) {
        if (gameState.gameTime > 1_000 && gameState.gameTime < 1_050) {
          mockInputStateTracker.mockPressing("jump");
        } else {
          mockInputStateTracker.mockNotPressing("jump");
        }
        const heels = heelsState(gameState);
        if (heels.jumped && heels.standingOnItemId === null) {
          maxZWhileJumping = Math.max(maxZWhileJumping, heels.box.z);
        }
      },
      until: 2_000,
    });

    expect(maxZWhileJumping - heelsState(gameState).jumpStartZ).toBeLessThan(
      // allowing the same error as jumps off stationary items:
      playerJumpHeightPx.heels + 1,
    );
  });

  test("jumping off a descending lift is not weakened", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          config: { which: "heels" },
          position: { x: 0, y: 0, z: 11 },
        },
        lift: {
          type: "lift",
          config: { bottom: 0, top: 10 },
          position: { x: 0, y: 0, z: 10 },
        },
      },
    });

    let maxZWhileJumping = 0;
    playGameThrough(gameState, {
      frameCallbacks(gameState, mockInputStateTracker) {
        if (gameState.gameTime > 1_000 && gameState.gameTime < 1_050) {
          mockInputStateTracker.mockPressing("jump");
        } else {
          mockInputStateTracker.mockNotPressing("jump");
        }
        const heels = heelsState(gameState);
        if (heels.jumped && heels.standingOnItemId === null) {
          maxZWhileJumping = Math.max(maxZWhileJumping, heels.box.z);
        }
      },
      until: 2_000,
    });

    expect(maxZWhileJumping - heelsState(gameState).jumpStartZ).toBeGreaterThan(
      playerJumpHeightPx.heels - 1,
    );
  });
});
