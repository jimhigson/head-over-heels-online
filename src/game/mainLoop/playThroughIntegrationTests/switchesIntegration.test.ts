import { beforeEach, describe, expect, test } from "vitest";

import type { TestRoomId } from "../../../_testUtils/basicRoom";
import type { SwitchConfig } from "../../../model/json/SwitchConfig";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { heelsState, itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { oppositeDirection, tangentAxis } from "../../../utils/vectors/vectors";

beforeEach(() => {
  resetStore();
});

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

describe("switching conveyors", () => {
  test.for([
    ["left", true],
    ["left", false],
    ["right", true],
    ["right", false],
    ["towards", true],
    ["towards", false],
    ["away", true],
    ["away", false],
  ] as const)(
    "switch reverses a conveyor (direction: %s, reverses: %s)",
    ([direction, reverses]) => {
      const axis = tangentAxis(direction);
      const positiveMovement = unitVectors[direction][axis] > 0;

      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 3, y: 3, z: 1 },
            config: {
              which: "heels",
            },
          },
          conveyor: {
            type: "conveyor",
            position: { x: 2, y: 2, z: 0 },
            config: { direction, times: { x: 4, y: 4 } },
          },
          ball: {
            type: "ball",
            position: { x: 6, y: 6, z: 5 },
            config: {},
          },
          switch: {
            type: "switch",
            position: { x: 6, y: 6, z: 0 },
            config: {
              type: "in-room",
              initialSetting: "right",
              modifies: [{ expectType: "conveyor", reverses }],
            },
          },
        },
      });

      const startPos = heelsState(gameState).position[axis];

      playGameThrough(gameState, {
        until: 500,
      });

      const movedPositive = heelsState(gameState).position[axis] > startPos;
      expect(movedPositive).toBe(positiveMovement);

      playGameThrough(gameState, {
        until: 3_000,
      });

      const reversedDirection = oppositeDirection(direction);
      const expectedPositive =
        reverses ?
          unitVectors[reversedDirection][axis] > 0
        : unitVectors[direction][axis] > 0;
      const finalMovedPositive =
        heelsState(gameState).position[axis] > startPos;
      expect(finalMovedPositive).toBe(expectedPositive);
    },
  );

  test.for([
    { startsDisabled: false, activates: false, expectedDisabledAfter: true },
    { startsDisabled: false, activates: true, expectedDisabledAfter: false },
    { startsDisabled: true, activates: false, expectedDisabledAfter: true },
    { startsDisabled: true, activates: true, expectedDisabledAfter: false },
  ])(
    "switch activates a conveyor (startsDisabled: $startsDisabled, activates: $activates, expectedDisabledAfter: $expectedDisabledAfter)",
    ({ startsDisabled, activates, expectedDisabledAfter }) => {
      const gameState = setUpBasicGame({
        firstRoomItems: {
          heels: {
            type: "player",
            position: { x: 3, y: 3, z: 1 },
            config: {
              which: "heels",
            },
          },
          conveyor: {
            type: "conveyor",
            position: { x: 2, y: 2, z: 0 },
            config: {
              direction: "left",
              times: { x: 4, y: 4 },
              disabled: startsDisabled,
            },
          },
          ball: {
            type: "ball",
            position: { x: 6, y: 6, z: 5 },
            config: {},
          },
          switch: {
            type: "switch",
            position: { x: 6, y: 6, z: 0 },
            config: {
              type: "in-room",
              initialSetting: "right",
              modifies: [{ expectType: "conveyor", activates }],
            },
          },
        },
      });

      const conveyorState = () => itemState<"conveyor">(gameState, "conveyor");
      const switchState = () => itemState<"switch">(gameState, "switch");

      expect(conveyorState().disabled).toBe(startsDisabled);

      playGameThrough(gameState, {
        until(gameState) {
          return switchState().setting === "left" || gameState.gameTime > 3_000;
        },
      });

      expect(switchState().setting).toBe("left");
      expect(conveyorState().disabled).toBe(expectedDisabledAfter);
    },
  );
});
