import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import {
  firstRoomId,
  secondRoomId,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import {
  headState,
  heelsState,
  itemState,
} from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

test("player slides at a normal to the input direction when partially overlapping the block they are working into", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      soothingToRunInto: {
        type: "block",
        position: { x: 2, y: 3.5, z: 0 },
        config: {
          style: "organic",
        },
      },
    },
  });

  const startY = heelsState(gameState).position.y;

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until() {
      // reached the right wall, even though there was a block in the way:
      return heelsState(gameState).position.x === 0;
    },
  });

  // slid on that block to change the y (at a normal to the direction of travel)
  expect(heelsState(gameState).position.y).toBeGreaterThan(startY);
});

test.for([
  {
    label: "joystick",
    item: {
      type: "joystick" as const,
      position: { x: 2, y: 3.5, z: 0 },
      config: { controls: [] },
    },
  },
  {
    label: "switch",
    item: {
      type: "switch" as const,
      position: { x: 2, y: 3.5, z: 0 },
      config: {
        initialSetting: "left" as const,
        type: "in-room" as const,
        modifies: [],
      },
    },
  },
])(
  "player doesn't slide on $label since we want to keep pushing these",
  ({ item }) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: 4, z: 0 },
          config: {
            which: "heels",
          },
        },
        soothingToRunInto: item,
      },
    });

    const startY = heelsState(gameState).position.y;

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      until: 5_000,
    });

    // did not slide in y - still at same ordinal:
    expect(heelsState(gameState).position.y).toEqual(startY);
  },
);

test("player slides at a normal to the input direction after initially pushing a portable block without sliding", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      soothingToPush: {
        type: "portableBlock",
        position: { x: 2, y: 3.5, z: 0 },
        config: {
          style: "drum",
        },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until() {
      // both heels and the thing they pushed made it to the wall:
      return (
        heelsState(gameState).position.x === 0 &&
        itemState(gameState, "soothingToPush").position.x === 0
      );
    },
  });
});

test("block pushed by player gets a helpful vector around an obstruction", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      soothingToPushInto: {
        type: "portableBlock",
        position: { x: 3, y: 3.5, z: 0 },
        config: {
          style: "drum",
        },
      },
      soothingToRunInto: {
        type: "block",
        position: { x: 2, y: 3, z: 0 },
        config: {
          style: "organic",
        },
      },
    },
  });

  const startY = itemState(gameState, "soothingToPushInto").position.y;

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until() {
      // pushed item reached the right wall, even though there was a block in the way:
      return itemState(gameState, "soothingToPushInto").position.x === 0;
    },
  });

  // slid on that block to change the y (at a normal to the direction of travel)
  expect(itemState(gameState, "soothingToPushInto").position.y).toBeGreaterThan(
    startY,
  );
});

test("player can move around a fixed block, into a pushable one", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 6, y: 4.5, z: 0 },
        config: {
          which: "heels",
        },
      },
      // heels will eventually collide with the block and portable block
      // simultaneously, and should slide towards the portable block
      portableBlock: {
        type: "portableBlock",
        position: { x: 5, y: 4.5, z: 0 },
        config: {
          style: "drum",
        },
      },
      block: {
        type: "block",
        position: { x: 4, y: 4, z: 0 },
        config: {
          style: "organic",
        },
      },
    },
  });

  const initialHeelsY = heelsState(gameState).position.y;

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    frameCallbacks() {
      // heels should not slide in -y direction while pushing the portableBlock
      // - this proves that hmvs are applied at the deepest point they are found
      // in the tree of recursive calls to moveItem
      expect(heelsState(gameState).position.y).toBeGreaterThanOrEqual(
        initialHeelsY,
      );
    },
    until() {
      // pushed item reached the right wall, even though there was a block in the way:
      return itemState(gameState, "portableBlock").position.x === 0;
    },
  });
});

test.each([3.5, 3, 2.5])(
  "head can drift through a small gap in a barrier he is only half aligned with (head starting at %f)",
  (headY) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        head: {
          type: "player",
          position: { x: 3, y: headY, z: 6 },
          config: {
            which: "head",
          },
        },

        lowerBarrier: {
          type: "barrier",
          position: { x: 2, y: 0, z: 0 },
          config: {
            axis: "y",
            times: {
              y: 8,
              z: 2,
            },
          },
        },
        towardsWallBarrier: {
          type: "barrier",
          position: { x: 2, y: 0, z: 2 },
          config: {
            axis: "y",
            times: {
              y: 3,
              z: 1,
            },
          },
        },
        awayWallBarrier: {
          type: "barrier",
          position: { x: 2, y: 4, z: 2 },
          config: {
            axis: "y",
            times: {
              y: 2,
              z: 1,
            },
          },
        },
        topBarrier: {
          type: "barrier",
          position: { x: 2, y: 0, z: 3 },
          config: {
            axis: "y",
            times: {
              y: 8,
              z: 4,
            },
          },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      until() {
        // pushed item reached the right wall, even though there was a block in the way:
        return headState(gameState).position.x === 0;
      },
    });
  },
);

describe("hmv blocked by falling or deadly", () => {
  test.each(
    // test for head overhanging the lower stair in both direcitons
    [
      { headY: 2.75, directionPressed: "left" as const },
      { headY: 1.25, directionPressed: "left" as const },
      { headY: 2.75, directionPressed: "right" as const },
      { headY: 1.25, directionPressed: "right" as const },
    ],
  )(
    "player does not slide around an item if sliding would make them fall (eg, stairs) walking in x",
    ({ headY, directionPressed }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 2, y: headY, z: 1 },
            config: {
              which: "head",
            },
          },

          lowerStair: {
            type: "block",
            position: { x: 2, y: 2, z: 0 },
            config: {
              style: "organic",
            },
          },
          upperStairLeft: {
            type: "block",
            position: { x: 3, y: 2, z: 1 },
            config: {
              style: "organic",
            },
          },
          upperStairRight: {
            type: "block",
            position: { x: 1, y: 2, z: 1 },
            config: {
              style: "organic",
            },
          },
        },
      });

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = directionPressed;
        },
        until: 3_000,
      });

      expect(headState(gameState).standingOnItemId).toEqual("lowerStair");
    },
  );
  test.each(
    // test for head overhanging the lower stair in both direcitons
    [
      { headX: 2.75, directionPressed: "away" as const },
      { headX: 1.25, directionPressed: "away" as const },
      { headX: 2.75, directionPressed: "towards" as const },
      { headX: 1.25, directionPressed: "towards" as const },
    ],
  )(
    "player does not slide around an item if sliding would make them fall (eg, stairs) walking in x",
    ({ headX, directionPressed }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: headX, y: 2, z: 1 },
            config: {
              which: "head",
            },
          },

          lowerStair: {
            type: "block",
            position: { x: 2, y: 2, z: 0 },
            config: {
              style: "organic",
            },
          },
          upperStairAway: {
            type: "block",
            position: { x: 2, y: 3, z: 1 },
            config: {
              style: "organic",
            },
          },
          upperStairTowards: {
            type: "block",
            position: { x: 2, y: 1, z: 1 },
            config: {
              style: "organic",
            },
          },
        },
      });

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = directionPressed;
        },
        until: 3_000,
      });

      expect(headState(gameState).standingOnItemId).toEqual("lowerStair");
    },
  );

  test.each([
    { wouldWalkOnto: "deadly" as const },
    { wouldWalkOnto: "safe" as const },
  ])(
    "player does not slide around an item if would slide to stand on a deadly item",
    ({ wouldWalkOnto }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 2, y: 2.75, z: 1 },
            config: {
              which: "head",
            },
          },

          lowerStair: {
            type: "block",
            position: { x: 2, y: 2, z: 0 },
            config: {
              style: "organic",
            },
          },
          upperStairLeft: {
            type: "block",
            position: { x: 3, y: 2, z: 1 },
            config: {
              style: "organic",
            },
          },
          upperStairRight: {
            type: "block",
            position: { x: 1, y: 2, z: 1 },
            config: {
              style: "organic",
            },
          },
          deadlyOrNormal:
            wouldWalkOnto === "deadly" ?
              {
                type: "deadlyBlock",
                position: { x: 3, y: 3, z: 0 },
                config: {
                  style: "volcano",
                },
              }
            : {
                type: "block",
                position: { x: 3, y: 3, z: 0 },
                config: {
                  style: "organic",
                },
              },
        },
      });

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "left";
        },
        until: 1_000,
      });

      expect(headState(gameState).standingOnItemId).toEqual(
        wouldWalkOnto === "deadly" ?
          // blocked from sliding onto a deadly item - stayed on the lower stair
          "lowerStair"
          // not blocked from sliding onto a normal item - moved onto it
        : "deadlyOrNormal",
      );
    },
  );
});

test.for(["right", "left"] as const)(
  "slides to come out of a doorway, even if nowhere to land %j",
  (walkDirection) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        head: {
          type: "player",
          position: {
            x: 1,
            // at this y head is perfectly aligned to get through the door without colliding with the doorframe
            y: 2.5,
            z: 0,
          },
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
          position: {
            x: 8,
            y: 2,
            // door is high - so there is no floor to slide onto:
            z: 4,
          },
          config: { direction: "left", toRoom: firstRoomId },
        },
      },
    });

    // walk until reaching second room:
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "right";
      },
      until(gameState) {
        return selectCurrentRoomState(gameState)?.id === secondRoomId;
      },
    });

    // walk perpendicular to the doorway to slide on the doorframe:
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = walkDirection;
      },
      until(gameState) {
        return headState(gameState).standingOnItemId === "floor";
      },
    });
  },
);
