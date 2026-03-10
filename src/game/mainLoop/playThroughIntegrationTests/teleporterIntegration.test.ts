import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import {
  firstRoomId,
  secondRoomId,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import { headState, heelsState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";

beforeEach(() => {
  resetStore();
});

test("can teleport to the next room (with `config.toPosition`)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: secondRoomId, toPosition: { x: 4, y: 4, z: 3 } },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "teleporterLanding";
    },
  });
});

test("can teleport to the same room (with `config.toPosition`)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: firstRoomId, toPosition: { x: 4, y: 4, z: 3 } },
      },
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "teleporterLanding";
    },
  });
});

test("can teleport to the next room (with `config.toItemId`)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: secondRoomId, toItemId: "teleporterLanding" },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "teleporterLanding";
    },
  });
});

test("can teleport to the next room (with `config.toItemId`) to a taller item than the teleporter", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: secondRoomId, toItemId: "teleporterLanding" },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic", times: { z: 10 } },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "teleporterLanding";
    },
  });
});

test("can teleport to the next room (with room specified only)", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
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
      destinationTeleporter: {
        type: "teleporter",
        position: { x: 4, y: 4, z: 2 },
        config: { toRoom: "firstRoom" as const },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return (
        gameState.characterRooms.heels?.id === "secondRoom" &&
        heelsState(gameState).standingOnItemId === "destinationTeleporter"
      );
    },
  });
});

test("teleporter can be inactive based on a store value", () => {
  // set
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: {
          toRoom: secondRoomId,
          toPosition: { x: 4, y: 4, z: 2 },
          activatedOnStoreValue: "planetsLiberated.egyptus",
        },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      // give it 5 seconds to try to use the teleporter
      return gameState.gameTime > 5_000;
    },
  });

  // should not have teleported - we don't have the crown
  expect(gameState.characterRooms.heels?.id).toEqual("firstRoom");
});
test("teleporter can be activated based on a store value", () => {
  // set
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 1 },
        config: {
          which: "heels",
        },
      },
      crown: {
        type: "pickup",
        position: { x: 0, y: 2, z: 3 },
        config: {
          gives: "crown",
          planet: "egyptus",
        },
      },
      teleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: {
          toRoom: secondRoomId,
          toPosition: { x: 4, y: 4, z: 2 },
          activatedOnStoreValue: "planetsLiberated.egyptus",
        },
      },
    },
    secondRoomItems: {
      teleporterLanding: {
        type: "block",
        position: { x: 4, y: 4, z: 2 },
        config: { style: "organic" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    until(gameState) {
      if (gameState.characterRooms.heels?.items["crown"] === undefined) {
        gameState.inputStateTracker.mockPressing("jump");
      }
      return gameState.gameTime > 5_000;
    },
  });

  // should have teleported
  expect(gameState.characterRooms.heels?.id).toEqual("secondRoom");
});

test("teleporting to a portable teleporter while Heels is holding it brings Head on top of Heels", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 3 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 0, y: 2, z: 2 },
        config: {
          gives: "bag",
        },
      },
      heelsTeleporter: {
        type: "portableTeleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: firstRoomId, toItemId: "headTeleporter" },
      },

      head: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "head",
        },
      },
      headTeleporter: {
        type: "portableTeleporter",
        position: { x: 4, y: 4, z: 0 },
        config: { toRoom: firstRoomId, toItemId: "heelsTeleporter" },
      },
    },
  });

  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until(gameState) {
      const heelIsCurrent = gameState.currentCharacterName === "heels";
      if (heelIsCurrent) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("swop");
      }
      return heelIsCurrent;
    },
  });

  expect(gameState.currentCharacterName).toEqual("heels");

  // now have heels selected - pick up the portable teleporter
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until(gameState) {
      const isCarrying = heelsState(gameState).carrying !== null;
      if (isCarrying) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("carry");
      }
      return isCarrying;
    },
  });

  const { carrying } = heelsState(gameState);
  expect(carrying).toMatchObject<Partial<NonNullable<typeof carrying>>>({
    id: "heelsTeleporter",
    type: "portableTeleporter",
  });

  // switch back to Head:
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("swop");
    },
    until(gameState) {
      const headIsCurrent = gameState.currentCharacterName === "head";
      if (headIsCurrent) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("swop");
      }
      return headIsCurrent;
    },
  });

  expect(gameState.currentCharacterName).toEqual("head");

  // use the teleporter
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      const headIsTeleporting = headState(gameState).teleporting !== null;
      if (headIsTeleporting) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return headIsTeleporting;
    },
  });

  // wait until teleported on top of Heels:
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation
    until(gameState) {
      return headState(gameState).standingOnItemId === "heels";
    },
  });
});

test("Heels can carry a teleporter through a same-room teleporter", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 2, z: 3 },
        config: {
          which: "heels",
        },
      },
      bag: {
        type: "pickup",
        position: { x: 0, y: 2, z: 2 },
        config: {
          gives: "bag",
        },
      },
      portableTeleporter: {
        type: "portableTeleporter",
        position: { x: 0, y: 2, z: 1 },
        config: { toRoom: firstRoomId, toItemId: "nowhere" },
      },
      sendingTeleporter: {
        type: "teleporter",
        position: { x: 0, y: 2, z: 0 },
        config: { toRoom: firstRoomId, toItemId: "receivingTeleporter" },
      },
      receivingTeleporter: {
        type: "teleporter",
        position: { x: 4, y: 4, z: 0 },
        config: { toRoom: firstRoomId, toItemId: "sendingTeleporter" },
      },
    },
  });

  // pick up the portable teleporter
  playGameThrough(gameState, {
    frameRate: { fps: [15] }, // keep frame rate low to reduce computation

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("carry");
    },
    until(gameState) {
      const isCarrying = heelsState(gameState).carrying !== null;
      if (isCarrying) {
        // stop pressing jump/teleporter once teleporting has
        gameState.inputStateTracker.mockNotPressing("carry");
      }
      return isCarrying;
    },
  });

  // use the teleporter by pressing jump
  playGameThrough(gameState, {
    frameRate: { fps: [15] },

    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockPressing("jump");
    },
    until(gameState) {
      if (heelsState(gameState).teleporting !== null) {
        gameState.inputStateTracker.mockNotPressing("jump");
      }
      return heelsState(gameState).standingOnItemId === "receivingTeleporter";
    },
  });

  // should be on the receiving teleporter and still carrying the portable teleporter
  expect(heelsState(gameState).standingOnItemId).toEqual("receivingTeleporter");
  const { carrying } = heelsState(gameState);
  expect(carrying).toMatchObject<Partial<NonNullable<typeof carrying>>>({
    id: "portableTeleporter",
    type: "portableTeleporter",
  });
});
