import { beforeEach, expect, test } from "vitest";

import type { TestRoomId } from "../../../_testUtils/basicRoom";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import {
  headOverHeelsState,
  headState,
  heelsState,
  itemState,
} from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { addXyz, roundXyz, scaleXyz } from "../../../utils/vectors/vectors";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";

beforeEach(() => {
  resetStore();
});

type TestItemIds =
  | "block_2"
  | "block"
  | "head"
  | "headOverHeels"
  | "heels"
  | "portableBlock_2"
  | "portableBlock";

test.for([
  { expectSymbio: true, blockOffset: 0 },
  { expectSymbio: true, blockOffset: 0.5 },
  { expectSymbio: true, blockOffset: 0.7 },
  // not actually on top:
  { expectSymbio: false, blockOffset: 1 },
])(
  "going into symbiosis when directly on top blockOffset= $blockOffset",
  ({ expectSymbio, blockOffset }) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 5, y: 5, z: 0 },
          config: {
            which: "heels",
          },
        },
        head: {
          type: "player",
          position: { x: 5 + blockOffset, y: 5, z: 1 },
          config: {
            which: "head",
          },
        },
      },
    });

    const heelsStartPosition = { ...heelsState(gameState).position };
    const headStartPosition = { ...headState(gameState).position };

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("swop");
      },
      until(gameState) {
        return (
          gameState.currentCharacterName === "headOverHeels" ||
          gameState.gameTime > 1_000
        );
      },
    });

    const room = selectCurrentRoomState<TestRoomId, TestItemIds>(gameState);
    if (expectSymbio) {
      // should be at their midpoint:
      const midpointXyPosition = {
        ...roundXyz(
          scaleXyz(addXyz(heelsStartPosition, headStartPosition), 0.5),
        ),
        z: 0,
      };

      expect(headOverHeelsState(gameState).position).toEqual(
        midpointXyPosition,
      );

      expect(room!.items.head).toBeUndefined();
      expect(room!.items.heels).toBeUndefined();
    } else {
      expect(room!.items.head).toBeDefined();
      expect(room!.items.heels).toBeDefined();
      expect(room!.items.headOverHeels).toBeUndefined();
    }
  },
);

test("going into symbiosis with a block also on top of heels", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 5, y: 5, z: 0 },
        config: {
          which: "heels",
        },
      },
      head: {
        type: "player",
        position: { x: 5.5, y: 5, z: 1 },
        config: {
          which: "head",
        },
      },
      portable: {
        type: "portableBlock",
        config: { style: "cube" },
        position: { x: 4.5, y: 5, z: 1 },
      },
    },
  });

  // portable block starts on heels:
  expect(
    itemState<"portableBlock">(gameState, "portable").standingOnItemId,
  ).toEqual("heels");

  const heelsStartPosition = { ...heelsState(gameState).position };
  const headStartPosition = { ...headState(gameState).position };

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until(gameState) {
      return gameState.currentCharacterName === "headOverHeels";
    },
  });

  // give the block a little time to fall down:
  playGameThrough(gameState, {
    until: 2_000,
  });

  // block got pushed off heels and is now on the floor:
  expect(
    itemState<"portableBlock">(gameState, "portable").standingOnItemId,
  ).toEqual("floor");

  const midpointXyPosition = {
    ...roundXyz(scaleXyz(addXyz(heelsStartPosition, headStartPosition), 0.5)),
    z: 0,
  };

  expect(headOverHeelsState(gameState).position).toEqual(midpointXyPosition);
});
test("going into symbiosis with a block on top of heels and requiring movement from Heel's initial position", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      block_2: {
        type: "block",
        config: {
          style: "organic",
        },
        position: {
          x: 3.875,
          y: 7,
          z: 0,
        },
      },
      heels: {
        type: "player",
        config: {
          which: "heels",
        },
        position: {
          x: 3,
          y: 6.625,
          z: 0,
        },
      },
      portableBlock: {
        type: "portableBlock",
        config: {
          style: "cube",
        },
        position: {
          x: 3.125,
          y: 6.75,
          z: 1,
        },
      },
      head: {
        type: "player",
        config: {
          which: "head",
        },
        position: {
          x: 3.5,
          y: 6,
          z: 1,
        },
      },
      portableBlock_2: {
        type: "portableBlock",
        config: {
          style: "drum",
        },
        position: {
          x: 3.125,
          y: 6.75,
          z: 2,
        },
      },
    },
  });

  const heelsStartPosition = { ...heelsState(gameState).position };

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until(gameState) {
      return gameState.currentCharacterName === "headOverHeels";
    },
  });

  // heels had to move too to get under Head this time:
  expect(headOverHeelsState(gameState).position).not.toEqual(
    heelsStartPosition,
  );
});

test("fails to go into symbiosis for an impossible case", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      block: {
        type: "block",
        config: {
          style: "organic",
        },
        position: {
          x: 2.375,
          y: 5.625,
          z: 0,
        },
      },
      block_2: {
        type: "block",
        config: {
          style: "organic",
        },
        position: {
          x: 3.875,
          y: 7,
          z: 0,
        },
      },
      heels: {
        type: "player",
        config: {
          which: "heels",
        },
        position: {
          x: 3,
          y: 6.625,
          z: 0,
        },
      },
      portableBlock: {
        type: "portableBlock",
        config: {
          style: "cube",
        },
        position: {
          x: 3.125,
          y: 6.75,
          z: 1,
        },
      },
      head: {
        type: "player",
        config: {
          which: "head",
        },
        position: {
          x: 3.5,
          y: 6,
          z: 1,
        },
      },
      portableBlock_2: {
        type: "portableBlock",
        config: {
          style: "drum",
        },
        position: {
          x: 3.125,
          y: 6.75,
          z: 2,
        },
      },
    },
  });

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until(gameState) {
      return (
        gameState.currentCharacterName === "headOverHeels" ||
        gameState.gameTime > 1_000
      );
    },
  });

  // impossible scenario - could not go into symbiosis
  const room = selectCurrentRoomState<TestRoomId, TestItemIds>(gameState);
  expect(room!.items.headOverHeels).toBeUndefined();
  expect(room!.items.head).toBeDefined();
  expect(room!.items.heels).toBeDefined();
});
