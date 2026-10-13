import { beforeEach, expect, test } from "vitest";

import {
  type ItemsInTestRoomJson,
  setUpBasicGame,
  type TestRoomId,
} from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { type SwitchConfig } from "../../../model/json/SwitchConfig";
import { type MirrorOrientation } from "../../../model/MirrorOrientation";

beforeEach(() => {
  resetStore();
});

/**
 * a ball falls onto the `controller` switch, toggling it
 */
const setUpBallDroppedOntoController = (
  controllerConfig: SwitchConfig<TestRoomId, string>,
  otherItems: ItemsInTestRoomJson,
) =>
  setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: { which: "heels" },
      },
      ball: {
        type: "ball",
        position: { x: 6, y: 6, z: 5 },
        config: {},
      },
      controller: {
        type: "switch",
        position: { x: 6, y: 6, z: 0 },
        config: controllerConfig,
      },
      ...otherItems,
    },
  });

test("a switch can disable another switch", () => {
  const gameState = setUpBallDroppedOntoController(
    {
      type: "in-room",
      initialSetting: "right",
      modifies: [
        { expectType: "switch", disables: true, targets: ["targetSwitch"] },
      ],
    },
    {
      targetSwitch: {
        type: "switch",
        position: { x: 2, y: 2, z: 0 },
        config: { type: "in-room", initialSetting: "left", modifies: [] },
      },
    },
  );

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"switch">(gameState, "controller").setting === "left" ||
      gameState.gameTime > 3_000,
  });

  expect(itemState<"switch">(gameState, "targetSwitch").disabled).toBe(true);
});

test("a switch can enable a switch that starts disabled", () => {
  const gameState = setUpBallDroppedOntoController(
    {
      type: "in-room",
      initialSetting: "right",
      modifies: [
        { expectType: "switch", disables: false, targets: ["targetSwitch"] },
      ],
    },
    {
      targetSwitch: {
        type: "switch",
        position: { x: 2, y: 2, z: 0 },
        config: {
          type: "in-room",
          initialSetting: "left",
          disabled: true,
          modifies: [],
        },
      },
    },
  );

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"switch">(gameState, "controller").setting === "left" ||
      gameState.gameTime > 3_000,
  });

  expect(itemState<"switch">(gameState, "targetSwitch").disabled).toBe(false);
});

test("a disabled switch can't be toggled", () => {
  const gameState = setUpBallDroppedOntoController(
    {
      type: "in-room",
      initialSetting: "right",
      disabled: true,
      modifies: [],
    },
    {},
  );

  playGameThrough(gameState, { until: 3_000 });

  expect(itemState<"switch">(gameState, "controller").setting).toBe("right");
});

test("a disabled switch isn't flipped by a ganged switch", () => {
  const gameState = setUpBallDroppedOntoController(
    {
      type: "in-room",
      initialSetting: "right",
      modifies: [{ expectType: "switch", flip: true, targets: ["ganged"] }],
    },
    {
      ganged: {
        type: "switch",
        position: { x: 2, y: 2, z: 0 },
        config: {
          type: "in-room",
          initialSetting: "right",
          disabled: true,
          modifies: [],
        },
      },
    },
  );

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"switch">(gameState, "controller").setting === "left" ||
      gameState.gameTime > 3_000,
  });

  expect(itemState<"switch">(gameState, "ganged").setting).toBe("right");
});

test("a switch can disable a button", () => {
  const gameState = setUpBallDroppedOntoController(
    {
      type: "in-room",
      initialSetting: "right",
      modifies: [
        { expectType: "button", disables: true, targets: ["targetButton"] },
      ],
    },
    {
      targetButton: {
        type: "button",
        position: { x: 2, y: 2, z: 0 },
        config: { type: "in-room", modifies: [] },
      },
    },
  );

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"switch">(gameState, "controller").setting === "left" ||
      gameState.gameTime > 3_000,
  });

  expect(itemState<"button">(gameState, "targetButton").disabled).toBe(true);
});

test("a disabled button can't be pressed", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: { which: "heels" },
      },
      ball: {
        type: "ball",
        position: { x: 6, y: 6, z: 5 },
        config: {},
      },
      button: {
        type: "button",
        position: { x: 6, y: 6, z: 0 },
        config: { type: "in-room", disabled: true, modifies: [] },
      },
    },
  });

  playGameThrough(gameState, { until: 3_000 });

  expect(itemState<"button">(gameState, "button").pressed).toBe(false);
});

test.for([
  ["clockwise", "awayLeft", "awayRight"],
  ["anticlockwise", "awayRight", "awayLeft"],
] as const)(
  "a switch rotates a mirror %s from %s to %s",
  ([rotates, startOrientation, expectedOrientation]: readonly [
    "anticlockwise" | "clockwise",
    MirrorOrientation,
    MirrorOrientation,
  ]) => {
    const gameState = setUpBallDroppedOntoController(
      {
        type: "in-room",
        initialSetting: "right",
        modifies: [{ expectType: "mirror", rotates, targets: ["mirror"] }],
      },
      {
        mirror: {
          type: "mirror",
          position: { x: 2, y: 5, z: 0 },
          config: { orientation: startOrientation },
        },
      },
    );

    playGameThrough(gameState, {
      until: (gameState) =>
        itemState<"switch">(gameState, "controller").setting === "left" ||
        gameState.gameTime > 3_000,
    });

    expect(itemState<"mirror">(gameState, "mirror")).toMatchObject({
      orientation: expectedOrientation,
      flipDirection: rotates,
    });
  },
);

test("a switch can disable itself", () => {
  const gameState = setUpBallDroppedOntoController(
    {
      type: "in-room",
      initialSetting: "right",
      modifies: [
        { expectType: "switch", disables: true, targets: ["controller"] },
      ],
    },
    {},
  );

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"switch">(gameState, "controller").setting === "left" ||
      gameState.gameTime > 3_000,
  });

  expect(itemState<"switch">(gameState, "controller").disabled).toBe(true);
});

test("a switch flipped by a ganged switch can disable the switch that flipped it", () => {
  const gameState = setUpBallDroppedOntoController(
    {
      type: "in-room",
      initialSetting: "right",
      modifies: [{ expectType: "switch", flip: true, targets: ["ganged"] }],
    },
    {
      ganged: {
        type: "switch",
        position: { x: 2, y: 2, z: 0 },
        config: {
          type: "in-room",
          initialSetting: "right",
          modifies: [
            { expectType: "switch", disables: true, targets: ["controller"] },
          ],
        },
      },
    },
  );

  playGameThrough(gameState, {
    until: (gameState) =>
      itemState<"switch">(gameState, "controller").setting === "left" ||
      gameState.gameTime > 3_000,
  });

  expect(itemState<"switch">(gameState, "controller").disabled).toBe(true);
});
