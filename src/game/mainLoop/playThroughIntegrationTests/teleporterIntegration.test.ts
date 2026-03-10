import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import {
  firstRoomId,
  secondRoomId,
  setUpBasicGame,
} from "../../../_testUtils/basicRoom";
import { heelsState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";

beforeEach(() => {
  resetStore();
});

describe("teleporter", () => {
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
      frameCallbacks(gameState) {
        if (heelsState(gameState).teleporting !== null) {
          // stop pressing jump/teleporter once teleporting has started
          gameState.inputStateTracker.mockNotPressing("jump");
        }
      },
      until(gameState) {
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
      frameCallbacks(gameState) {
        if (heelsState(gameState).teleporting !== null) {
          // stop pressing jump/teleporter once teleporting has started
          gameState.inputStateTracker.mockNotPressing("jump");
        }
      },
      until(gameState) {
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
      frameCallbacks(gameState) {
        if (heelsState(gameState).teleporting !== null) {
          // stop pressing jump/teleporter once teleporting has started
          gameState.inputStateTracker.mockNotPressing("jump");
        }
      },
      until(gameState) {
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
      frameCallbacks(gameState) {
        if (heelsState(gameState).teleporting !== null) {
          // stop pressing jump/teleporter once teleporting has started
          gameState.inputStateTracker.mockNotPressing("jump");
        }
      },
      until(gameState) {
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
      frameCallbacks(gameState) {
        if (heelsState(gameState).teleporting !== null) {
          // stop pressing jump/teleporter once teleporting has started
          gameState.inputStateTracker.mockNotPressing("jump");
        }
      },
      until(gameState) {
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

      frameCallbacks(gameState) {
        if (gameState.characterRooms.heels?.items["crown"] === undefined) {
          // start hitting jump once we have the crown
          gameState.inputStateTracker.mockPressing("jump");
        }
      },
      until(gameState) {
        // give it 5 seconds to try to use the teleporter
        return gameState.gameTime > 5_000;
      },
    });

    // should have teleported
    expect(gameState.characterRooms.heels?.id).toEqual("secondRoom");
  });
});
