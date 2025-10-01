import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { size } from "iter-tools-es";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState, item } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { iterateRoomItems } from "../../../model/RoomState";

beforeEach(() => {
  resetStore();
});

describe("dissapearing items", () => {
  const gameStateWithDisappearingBlocks = () =>
    setUpBasicGame({
      firstRoomItems: {
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
            disappearing: { on: "stand" },
          },
        },
        disappearingBlock1: {
          type: "block",
          // note elevated block tests that can get up on and jump off disappearing blocks
          // - this is needed for heels' tricky jumping rooms such as #egyptus15
          position: { x: 0, y: 1, z: 1 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
          },
        },
        disappearingBlock2: {
          type: "block",
          position: { x: 0, y: 2, z: 0 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
          },
        },
        disappearingBlock3: {
          type: "block",
          position: { x: 0, y: 3, z: 0 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
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
      firstRoomDeadlyFloor: true,
    });

  test("can jump along a line of disappearing blocks", () => {
    playGameThrough(gameStateWithDisappearingBlocks(), {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
        mockInputStateTracker.mockPressing("jump");
      },
      frameCallbacks(gameState) {
        // should not lose any lives
        expect(heelsState(gameState).lives).toBeGreaterThanOrEqual(8);
      },
      until(gameState) {
        // got two more lives
        return heelsState(gameState).lives === 10;
      },
    });
  });
  test("can partially destroy a multiplied dissapearing blocks in the json", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 3, y: 0, z: 3 },
          config: {
            which: "heels",
          },
        },
        // 3- long block, but should only land on the middle one:
        disappearingBlock0: {
          type: "block",
          position: { x: 2, y: 0, z: 0 },
          config: {
            style: "organic",
            times: { x: 3 },
            disappearing: { on: "stand" },
          },
        },
      },
      firstRoomDeadlyFloor: true,
    });

    playGameThrough(gameState, {
      until: 2_000,
    });

    const blocksInRoomCount = size(
      iterateRoomItems(gameState.characterRooms.heels!.items).filter(
        (item) => item.type === "block",
      ),
    );

    expect(blocksInRoomCount).toBe(2);
  });
  test("can not walk along a line of disappearing blocks", () => {
    playGameThrough(gameStateWithDisappearingBlocks(), {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
        // not jumping
      },
      until(gameState) {
        // lost a life
        return heelsState(gameState).lives === 7;
      },
    });
  });
  test("can jump along a line of pickups, collecting them", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
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
      firstRoomDeadlyFloor: true,
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
        mockInputStateTracker.mockPressing("jump");
      },
      frameCallbacks(gameState) {
        // should not lose any lives. If this happens, was not able to jump off pickups as they are collected
        // and fell onto the deadly floor
        expect(heelsState(gameState).lives).toBeGreaterThanOrEqual(8);
      },
      until(gameState) {
        // got 4 x 2 more lives
        return heelsState(gameState).lives === 16;
      },
    });
  });

  describe("detecting on=stand - tricky cases", () => {
    test("jumping against a single dissapearing blocks", () => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 0, y: 0, z: 0 },
            config: {
              which: "heels",
            },
          },
          block0: {
            type: "block",
            position: { x: 0, y: 1, z: 0 },
            config: {
              style: "organic",
              disappearing: { on: "stand" },
            },
          },
        },
      });

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "away";
          mockInputStateTracker.mockPressing("jump");
        },
        until: 5_000,
      });

      // didn't remove either of these items - heels can jump against them
      // but never get on top of either:
      expect(item(gameState, "block0")).not.toBeDefined();
    });
    test.each([
      { block0Dissapearing: false, block1Dissapearing: true },
      { block0Dissapearing: true, block1Dissapearing: false },
      { block0Dissapearing: true, block1Dissapearing: true },
    ])(
      "jumping against a stack of 2 blocks %o",
      ({ block0Dissapearing, block1Dissapearing }) => {
        const gameState = setUpBasicGame({
          firstRoomItems: {
            heels: {
              type: "player",
              position: { x: 0, y: 0, z: 0 },
              config: {
                which: "heels",
              },
            },
            block0: {
              type: "block",
              position: { x: 0, y: 1, z: 0 },
              config: {
                style: "organic",
                disappearing: block0Dissapearing ? { on: "stand" } : undefined,
              },
            },
            block1: {
              type: "block",
              position: { x: 0, y: 1, z: 1 },
              config: {
                style: "organic",
                disappearing: block1Dissapearing ? { on: "stand" } : undefined,
              },
            },
          },
        });

        playGameThrough(gameState, {
          setupInitialInput(mockInputStateTracker) {
            mockInputStateTracker.mockDirectionPressed = "away";
            mockInputStateTracker.mockPressing("jump");
          },
          until: 5_000,
        });

        // didn't remove either of these items - heels can jump against them
        // but never get on top of either:
        expect(item(gameState, "block0")).toBeDefined();
        expect(item(gameState, "block1")).toBeDefined();
      },
    );

    test("head jumping against a stack of 4 vanishing blocks doesn't make any disappear", () => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          head: {
            type: "player",
            position: { x: 0, y: 0, z: 0 },
            config: {
              which: "head",
            },
          },
          block0: {
            type: "block",
            position: { x: 0, y: 1, z: 0 },
            config: {
              style: "organic",
              disappearing: { on: "stand" },
            },
          },
          block1: {
            type: "block",
            position: { x: 0, y: 1, z: 1 },
            config: {
              style: "organic",
              disappearing: { on: "stand" },
            },
          },
          block2: {
            type: "block",
            position: { x: 0, y: 1, z: 2 },
            config: {
              style: "organic",
              disappearing: { on: "stand" },
            },
          },
          block3: {
            type: "block",
            position: { x: 0, y: 1, z: 3 },
            config: {
              style: "organic",
              disappearing: { on: "stand" },
            },
          },
        },
      });

      playGameThrough(gameState, {
        setupInitialInput(mockInputStateTracker) {
          mockInputStateTracker.mockDirectionPressed = "away";
          mockInputStateTracker.mockPressing("jump");
        },
        until: 10_000,
      });

      // didn't remove either of these items - heels can jump against them
      // but never get on top of either:
      expect(item(gameState, "block0")).toBeDefined();
      expect(item(gameState, "block1")).toBeDefined();
      expect(item(gameState, "block2")).toBeDefined();
      expect(item(gameState, "block3")).toBeDefined();
    });
  });

  test("hoh (in symbiosis) walking into a stack of 2 vanishing blocks doesn't make any disappear", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "heels",
          },
        },
        head: {
          type: "player",
          position: { x: 0, y: 0, z: 1 },
          config: {
            which: "head",
          },
        },
        block0: {
          type: "block",
          position: { x: 0, y: 1, z: 0 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
          },
        },
        block1: {
          type: "block",
          position: { x: 0, y: 1, z: 1 },
          config: {
            style: "organic",
            disappearing: { on: "stand" },
          },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockPressing("swop");
      },
      until() {
        return gameState.currentCharacterName === "headOverHeels";
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "away";
      },
      until: 10_000,
    });

    // didn't remove either of these items - heels can jump against them
    // but never get on top of either:
    expect(item(gameState, "block0")).toBeDefined();
    expect(item(gameState, "block1")).toBeDefined();
  });
});
