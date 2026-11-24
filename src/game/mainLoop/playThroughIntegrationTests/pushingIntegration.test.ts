import { beforeEach, describe, expect, test } from "vitest";

import {
  type BasicGameStateOptions,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { hasCollidedWithItemOfType } from "../../../_testUtils/playThroughUntilHelpers";
import { smallItemAabb } from "../../collision/boundingBoxes";
import { blockSizePx } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

const withBlockToPush: BasicGameStateOptions = {
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
};

describedForAllFrameRates((frameRate) => {
  test("player pushes a block until reaching an obstruction", () => {
    const gameState = setUpBasicGame(withBlockToPush);

    playGameThrough(gameState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      until: 2_000,
    });

    expect(itemState(gameState, "somethingToPush")?.box.y).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.x * 3 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.x - smallItemAabb.x),
    );
  });

  describe.for(["head", "heels"] as const)("%s", (playableName) => {
    // a block straight ahead is hit on whichever face is nearest square-on to the
    // travel - never more than 45° off - so is always pushed along the travel:
    test.for([
      0, 1, 2, 10, 30, 44, 44.9, 45, 45.1, 46, 48.4, 48.5, 60, 80, 89, 90,
    ])(
      "pushes a block straight ahead at %s° along their travel",
      (travelAngleDegrees) => {
        const travelAngleRadians = (travelAngleDegrees * Math.PI) / 180;
        const travel = {
          x: Math.cos(travelAngleRadians),
          y: Math.sin(travelAngleRadians),
          z: 0,
        };
        const gameState = setUpBasicGame({
          firstRoomItems: {
            [playableName]: {
              type: "player",
              position: { x: 1.5, y: 1.5, z: 0 },
              config: {
                which: playableName,
              },
            },
            somethingToPush: {
              type: "portableBlock",
              // 1.25 blocks ahead along the travel, on whole pixels so it doesn't
              // snap to the pixel grid before being pushed:
              position: {
                x:
                  Math.round((1.5 + 1.25 * travel.x) * blockSizePx.x) /
                  blockSizePx.x,
                y:
                  Math.round((1.5 + 1.25 * travel.y) * blockSizePx.y) /
                  blockSizePx.y,
                z: 0,
              },
              config: {
                style: "cube",
              },
            },
          },
        });
        const startingBox = itemState<"portableBlock">(
          gameState,
          "somethingToPush",
        ).box;

        playGameThrough(gameState, {
          frameRate,
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.directionVector = travel;
          },
          forTime: 1_500,
        });

        const { x, y } = itemState<"portableBlock">(
          gameState,
          "somethingToPush",
        ).box;
        const pushedAngleDegrees =
          (Math.atan2(y - startingBox.y, x - startingBox.x) * 180) / Math.PI;

        const errorAngleDegrees = Math.abs(
          pushedAngleDegrees - travelAngleDegrees,
        );
        const maxErrorAngleDegrees = 1;
        expect(
          errorAngleDegrees,
          `error angle of block's total movement should be < ${maxErrorAngleDegrees}°`,
        ).toBeLessThan(maxErrorAngleDegrees);
      },
    );

    // hitting a block's side face from beside it: the contact is then the travel
    // angle off square-on, so the block is pushed along the travel up to 48.45°,
    // and only away from the face beyond that, while the player slides along it
    test.for([
      { travelAngleDegrees: 0, pushedAlongTravel: true },
      { travelAngleDegrees: 1, pushedAlongTravel: true },
      { travelAngleDegrees: 30, pushedAlongTravel: true },
      { travelAngleDegrees: 44, pushedAlongTravel: true },
      { travelAngleDegrees: 45, pushedAlongTravel: true },
      { travelAngleDegrees: 46, pushedAlongTravel: true },
      { travelAngleDegrees: 48.4, pushedAlongTravel: true },
      { travelAngleDegrees: 48.5, pushedAlongTravel: false },
      { travelAngleDegrees: 60, pushedAlongTravel: false },
      { travelAngleDegrees: 80, pushedAlongTravel: false },
    ])(
      "hitting the side of a block at $travelAngleDegrees° from square-on pushes it along their travel: $pushedAlongTravel",
      ({ travelAngleDegrees, pushedAlongTravel }) => {
        const travelAngleRadians = (travelAngleDegrees * Math.PI) / 180;
        const gameState = setUpBasicGame({
          firstRoomItems: {
            [playableName]: {
              type: "player",
              // just short of the block's x-face, overlapping half of its depth in y:
              position: { x: 35 / blockSizePx.x, y: 2.625, z: 0 },
              config: {
                which: playableName,
              },
            },
            somethingToPush: {
              type: "portableBlock",
              position: { x: 3, y: 3, z: 0 },
              config: {
                style: "cube",
              },
            },
          },
        });
        const startingBox = itemState<"portableBlock">(
          gameState,
          "somethingToPush",
        ).box;

        playGameThrough(gameState, {
          frameRate,
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.directionVector = {
              x: Math.cos(travelAngleRadians),
              y: Math.sin(travelAngleRadians),
              z: 0,
            };
          },
          forTime: 600,
        });

        const { x, y } = itemState<"portableBlock">(
          gameState,
          "somethingToPush",
        ).box;
        const pushedAngleDegrees =
          (Math.atan2(y - startingBox.y, x - startingBox.x) * 180) / Math.PI;
        // along the travel, or straight out from the face that was hit (along x):
        const expectedAngleDegrees = pushedAlongTravel ? travelAngleDegrees : 0;
        expect(
          pushedAngleDegrees,
          `angle of block's total movement should be ${expectedAngleDegrees}° (${pushedAlongTravel ? "along the travel" : "out from the face"})`,
        ).toBeCloseTo(expectedAngleDegrees);
      },
    );
  });

  test("can push multiple blocks in a row", () => {
    const gameState = setUpBasicGame({
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
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      until: 2_000,
    });

    expect(itemState(gameState, "somethingToPush2")?.box.y).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.x * 3 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.x - smallItemAabb.x),
    );
  });

  test("can not push a charging cyberman", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        toaster: {
          type: "deadlyBlock",
          position: { x: 2, y: 0, z: 0 },
          config: {
            style: "toaster",
          },
        },
        cyberman: {
          type: "monster",
          position: { x: 2, y: 0, z: 0 },
          config: {
            which: "cyberman",
            activated: "off",
            movement: "towards-on-shortest-axis-xy4",
            startDirection: "right",
          },
        },
        block: {
          type: "block",
          position: { x: 0, y: 0, z: 0 },
          config: {
            style: "artificial",
            times: { x: 2 },
          },
        },
        // a shield so it can be pushed against without losing a life:
        shield: {
          type: "pickup",
          position: { x: 1, y: 0, z: 1 },
          config: {
            gives: "shield",
          },
        },
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 1 },
          config: {
            which: "heels",
          },
        },
      },
    });

    playGameThrough(gameState, {
      frameRate,
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      until: 2_000,
    });

    expect(itemState(gameState, "cyberman")?.box.x).toBe(
      // the edge of the block we are pushing into:
      blockSizePx.x * 2 +
        // a bit extra because the portable block does not fill up a full tile:
        (blockSizePx.x - smallItemAabb.x) / 2,
    );
  });
});

describedForAllFrameRates((frameRate) => {
  test("walking diagonally along a wall into a cube against it pushes the cube along the wall to the far wall", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // beside the wall the cube is against, short of the cube:
          position: { x: 7.125, y: 1.75, z: 0 },
          config: { which: "heels" },
        },
        cube: {
          type: "portableBlock",
          // 12px, so placed to sit flush against the wall:
          position: { x: 7.125, y: 3, z: 0 },
          config: { style: "cube" },
        },
      },
    });
    const { x: cubeStartX } = itemState<"portableBlock">(gameState, "cube").box;
    let previousCubeY = itemState<"portableBlock">(gameState, "cube").box.y;

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "awayLeft";
      },
      frameRate,
      until: hasCollidedWithItemOfType("cube", "wall"),
      failAfter: 10_000,
      frameCallbacks(gameState) {
        const { x, y } = itemState<"portableBlock">(gameState, "cube").box;
        // checked every frame, so a failure reports when it went wrong:
        expect({
          xAgainstWall: Math.round(x * 100) / 100,
          neverPushedBack: y >= previousCubeY,
        }).toEqual({ xAgainstWall: cubeStartX, neverPushedBack: true });
        previousCubeY = y;
      },
    });
  });
});
