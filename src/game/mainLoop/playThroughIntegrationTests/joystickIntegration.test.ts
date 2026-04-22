import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";

beforeEach(() => {
  resetStore();
});

test("pushing joystick can move a charles bot", () => {
  const gameState = setUpBasicGame({
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

      joystick: {
        type: "joystick",
        config: {
          controls: ["charles"],
        },
        position: { x: 1, y: 0, z: 0 },
      },
      charles: {
        type: "charles",
        config: {},
        position: { x: 0, y: 3, z: 0 },
      },
      // a switch for charles to run into
      switch: {
        type: "switch",
        config: {
          initialSetting: "left",
          modifies: [],
          type: "in-room",
        },
        position: { x: 3, y: 3, z: 0 },
      },
    },
  });

  playGameThrough(gameState, {
    until(gameState) {
      const switchState = itemState<"switch">(gameState, "switch");
      // stop when charles has flipped the switch's setting
      return switchState.setting === "right";
    },
    setupInitialInput(mockInputStateTracker) {
      // heels runs into the joystick
      mockInputStateTracker.mockDirectionPressed = "left";
    },
  });
});

test("joystick with no controls config moves every charles in the room", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: { which: "heels" },
      },
      joystick: {
        type: "joystick",
        config: {},
        position: { x: 1, y: 0, z: 0 },
      },
      charles: {
        type: "charles",
        config: {},
        position: { x: 0, y: 3, z: 0 },
      },
      charles2: {
        type: "charles",
        config: {},
        position: { x: 0, y: 5, z: 0 },
      },
      switch: {
        type: "switch",
        config: {
          initialSetting: "left",
          modifies: [],
          type: "in-room",
        },
        position: { x: 3, y: 3, z: 0 },
      },
      switch2: {
        type: "switch",
        config: {
          initialSetting: "left",
          modifies: [],
          type: "in-room",
        },
        position: { x: 3, y: 5, z: 0 },
      },
    },
  });

  playGameThrough(gameState, {
    until(gameState) {
      return (
        itemState<"switch">(gameState, "switch").setting === "right" &&
        itemState<"switch">(gameState, "switch2").setting === "right"
      );
    },
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "left";
    },
  });
});

test("joystick with an explicit controls list only moves the listed charles", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: { which: "heels" },
      },
      joystick: {
        type: "joystick",
        config: { controls: ["charles"] },
        position: { x: 1, y: 0, z: 0 },
      },
      charles: {
        type: "charles",
        config: {},
        position: { x: 0, y: 3, z: 0 },
      },
      charles2: {
        type: "charles",
        config: {},
        position: { x: 0, y: 5, z: 0 },
      },
      switch: {
        type: "switch",
        config: {
          initialSetting: "left",
          modifies: [],
          type: "in-room",
        },
        position: { x: 3, y: 3, z: 0 },
      },
      // place switch2 right next to charles2 so even a single tick of
      // unintended movement would flip it
      switch2: {
        type: "switch",
        config: {
          initialSetting: "left",
          modifies: [],
          type: "in-room",
        },
        position: { x: 1, y: 5, z: 0 },
      },
    },
  });

  playGameThrough(gameState, {
    until(gameState) {
      return itemState<"switch">(gameState, "switch").setting === "right";
    },
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "left";
    },
  });

  // charles2 is not in the controls list, so it should never have moved —
  // its switch should still be on the initial setting
  expect(itemState<"switch">(gameState, "switch2").setting).toBe("left");
});

// not sure how to implement the condition on this one
test.todo("pushing two joysticks only moves at single speed", () => {});
