import { describe, test, expect, vi, beforeEach } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { TestRoomId } from "../../../_testUtils/basicRoom";
import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import type { SwitchConfig } from "../../../model/json/SwitchConfig";
import { resetStore } from "../../../_testUtils/initStoreForTests";

beforeEach(() => {
  resetStore();
});

describe("switches", () => {
  const setupWithSwitches = (
    switch1Config: SwitchConfig<TestRoomId, string>,
    switch2Config: SwitchConfig<TestRoomId, string>,
  ) => {
    return setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // note - heels starts a little ahead of the block, to make it more likely
          // to fall off if the code is not working right
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: "heels",
          },
        },

        switch1: {
          type: "switch",
          config: switch1Config,
          position: { x: 3, y: 0, z: 0 },
        },
        switch2: {
          type: "switch",
          config: switch2Config,
          position: { x: 3, y: 3, z: 0 },
        },
        block: {
          type: "block",
          position: { x: 3, y: 3, z: 3 },
          config: {
            style: "organic",
          },
        },
      },
    });
  };

  test("two switches can be ganged", () => {
    const gameState = setupWithSwitches(
      {
        type: "in-room",
        initialSetting: "left",
        modifies: [
          {
            expectType: "switch",
            flip: true,
            targets: ["switch2"],
          },
        ],
      },
      {
        type: "in-room",
        initialSetting: "left",
        modifies: [
          {
            expectType: "switch",
            flip: true,
            targets: ["switch"],
          },
        ],
      },
    );

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        // heels runs into the joystick
        mockInputStateTracker.mockDirectionPressed = "left";

        const switch1State = itemState<"switch">(gameState, "switch1");
        const switch2State = itemState<"switch">(gameState, "switch2");
        // check initial state:
        expect(switch1State.setting).toBe("left");
        expect(switch2State.setting).toBe("left");
      },
      until(gameState) {
        const switch2State = itemState<"switch">(gameState, "switch2");

        // stop when charles has flipped the switch's setting, or we waited too long:
        return switch2State.setting === "right" || gameState.gameTime > 1_000;
      },
      frameRate: { fps: [20] },
    });

    const switch1State = itemState<"switch">(gameState, "switch1");
    const switch2State = itemState<"switch">(gameState, "switch2");
    expect(switch1State.setting).toBe("right");
    expect(switch2State.setting).toBe("right");
  });

  test("two switches can be ganged but opposite", () => {
    const gameState = setupWithSwitches(
      {
        type: "in-room",
        initialSetting: "left",
        modifies: [
          {
            expectType: "switch",
            flip: true,
            targets: ["switch2"],
          },
        ],
      },
      {
        type: "in-room",
        initialSetting: "right",
        modifies: [
          {
            expectType: "switch",
            flip: true,
            targets: ["switch"],
          },
        ],
      },
    );

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        // heels runs into the joystick
        mockInputStateTracker.mockDirectionPressed = "left";

        const switch2State = itemState<"switch">(gameState, "switch2");
        // check initial state:
        expect(switch2State.setting).toBe("right");
      },
      until(gameState) {
        const switch2State = itemState<"switch">(gameState, "switch2");
        // stop when charles has flipped the switch's setting
        return switch2State.setting === "left";
      },
    });

    const switch1State = itemState<"switch">(gameState, "switch1");
    const switch2State = itemState<"switch">(gameState, "switch2");
    expect(switch1State.setting).toBe("right");
    expect(switch2State.setting).toBe("left");
  });

  test("ganged switches fire their knock-on effects in a chain", () => {
    const gameState = setupWithSwitches(
      {
        type: "in-room",
        initialSetting: "left",
        modifies: [
          {
            expectType: "switch",
            flip: true,
            targets: ["switch2"],
          },
        ],
      },
      {
        type: "in-room",
        initialSetting: "right",
        modifies: [
          {
            expectType: "switch",
            flip: true,
            targets: ["switch"],
          },
          {
            expectType: "block",
            leftState: {
              disappearing: { on: "stand" },
            },
            rightState: {
              disappearing: null,
            },
            targets: ["block"],
          },
        ],
      },
    );

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        // heels runs into the joystick
        mockInputStateTracker.mockDirectionPressed = "left";

        const switch2State = itemState<"block">(gameState, "block");
        // stop when charles has flipped the switch's setting
        expect(switch2State.disappearing).toBe(null);
      },
      until(gameState) {
        const blockState = itemState<"block">(gameState, "block");
        // stop when charles has flipped the switch's setting
        return blockState.disappearing?.on === "stand";
      },
    });
  });
});
