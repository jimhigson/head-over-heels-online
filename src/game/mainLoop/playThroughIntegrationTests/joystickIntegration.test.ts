import { beforeEach, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { describedForAllFrameRates } from "../../../_testUtils/describedForAllFrameRates";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { makeCollisionCounter } from "../../../_testUtils/makeCollisionCounter";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import {
  allHaveHeld,
  hasCollided,
} from "../../../_testUtils/playThroughUntilHelpers";
import { unitVector, type Xyz } from "../../../utils/vectors/vectors";
import { moveSpeedPixPerMs } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

/**
 * how near a measured speed (px/ms) must be to the expected one - measuring over
 * whole frames is a little out, but this still tells single speed from double
 * or still
 */
const speedPrecisionDigits = 2;

/**
 * the direction of a movement, as a unit vector - or undefined for no movement
 */
const directionOf = (x: number, y: number): undefined | Xyz =>
  x === 0 && y === 0 ? undefined : unitVector({ x, y, z: 0 });

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

describedForAllFrameRates((frameRate) => {
  test("heels walking diagonally into two joysticks at once drives charles on an axis, the way of the first one pushed, at single speed", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // as far from each joystick, so walking diagonally hits both at once:
          position: { x: 3, y: 2.125, z: 0 },
          config: { which: "heels" },
        },
        joystick1: {
          type: "joystick",
          config: { controls: ["charles"] },
          position: { x: 2, y: 2, z: 0 },
        },
        joystick2: {
          type: "joystick",
          config: { controls: ["charles"] },
          position: { x: 3, y: 3, z: 0 },
        },
        charles: {
          type: "charles",
          config: {},
          position: { x: 6, y: 4, z: 0 },
        },
      },
    });
    const charlesStart = { ...itemState<"charles">(gameState, "charles").box };

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "awayRight";
      },
      frameRate,
      until(gameState) {
        const { x, y } = itemState<"charles">(gameState, "charles").box;
        return x !== charlesStart.x || y !== charlesStart.y;
      },
      failAfter: 3_000,
    });

    let charlesPathLength = 0;
    const measuringStart = {
      ...itemState<"charles">(gameState, "charles").box,
    };
    let previous = measuringStart;
    const measuringFrom = gameState.gameTime;
    playGameThrough(gameState, {
      frameRate,
      forTime: 500,
      frameCallbacks(gameState) {
        const { x, y } = itemState<"charles">(gameState, "charles").box;
        charlesPathLength += Math.hypot(x - previous.x, y - previous.y);
        previous = { ...previous, x, y };
      },
    });

    // the joysticks are pushed -x and +y - charles only goes in 4 directions,
    // so the first one pushed decides, at single speed, not twice it:
    const { x, y } = itemState<"charles">(gameState, "charles").box;
    expect(
      charlesPathLength / (gameState.gameTime - measuringFrom),
      "charles's speed (px/ms), with both joysticks pushed at once: single speed, not twice it",
    ).toBeCloseTo(moveSpeedPixPerMs.charles, speedPrecisionDigits);
    expect(
      [
        { x: expect.closeTo(-1, 1), y: expect.closeTo(0, 1), z: 0 },
        { x: expect.closeTo(0, 1), y: expect.closeTo(1, 1), z: 0 },
      ],
      "charles's direction, with both joysticks pushed at once (-x and +y): straight, the way of one of them, not diagonally",
    ).toContainEqual(directionOf(x - measuringStart.x, y - measuringStart.y));
  });

  test("two monsters pushing two joysticks at once in same direction move charles at his normal speed (no faster)", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // off to the side, out of the monsters' way:
          position: { x: 7, y: 0, z: 0 },
          config: { which: "heels" },
        },
        // each keeps walking into its own joystick:
        skiHead1: {
          type: "monster",
          position: { x: 1, y: 2.125, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "left",
            style: "greenAndPink",
          },
        },
        skiHead2: {
          type: "monster",
          position: { x: 1, y: 5.125, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "left",
            style: "greenAndPink",
          },
        },
        joystick1: {
          type: "joystick",
          config: { controls: ["charles"] },
          position: { x: 4, y: 2, z: 0 },
        },
        joystick2: {
          type: "joystick",
          config: { controls: ["charles"] },
          position: { x: 4, y: 5, z: 0 },
        },
        charles: {
          type: "charles",
          config: {},
          position: { x: 1, y: 7, z: 0 },
        },
      },
    });
    const charlesStart = { ...itemState<"charles">(gameState, "charles").box };

    playGameThrough(gameState, {
      frameRate,
      until(gameState) {
        const { x, y } = itemState<"charles">(gameState, "charles").box;
        return x !== charlesStart.x || y !== charlesStart.y;
      },
      failAfter: 5_000,
    });

    let charlesPathLength = 0;
    let previous = { ...itemState<"charles">(gameState, "charles").box };
    const measuringFrom = gameState.gameTime;
    playGameThrough(gameState, {
      frameRate,
      forTime: 500,
      frameCallbacks(gameState) {
        const { x, y } = itemState<"charles">(gameState, "charles").box;
        charlesPathLength += Math.hypot(x - previous.x, y - previous.y);
        previous = { ...previous, x, y };
      },
    });

    // single speed, not twice it:
    expect(
      charlesPathLength / (gameState.gameTime - measuringFrom),
    ).toBeCloseTo(moveSpeedPixPerMs.charles, 3);
  });

  test("two monsters pushing two joysticks in opposite directions at once leave charles still", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // off to the side, out of the monsters' way:
          position: { x: 7, y: 0, z: 0 },
          config: { which: "heels" },
        },
        skiHead1: {
          type: "monster",
          position: { x: 1.75, y: 2.125, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "left",
            style: "greenAndPink",
          },
        },
        skiHead2: {
          type: "monster",
          position: { x: 6.25, y: 5.125, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "right",
            style: "greenAndPink",
          },
        },
        joystick1: {
          type: "joystick",
          config: { controls: ["charles"] },
          position: { x: 4, y: 2, z: 0 },
        },
        joystick2: {
          type: "joystick",
          config: { controls: ["charles"] },
          position: { x: 4, y: 5, z: 0 },
        },
        charles: {
          type: "charles",
          config: {},
          position: { x: 1, y: 7, z: 0 },
        },
      },
    });

    // until both monsters are pushing their joysticks:
    playGameThrough(gameState, {
      frameRate,
      until: allHaveHeld(
        hasCollided("skiHead1", "joystick1"),
        hasCollided("skiHead2", "joystick2"),
      ),
      failAfter: 5_000,
    });
    const charlesStart = { ...itemState<"charles">(gameState, "charles").box };
    const measuringFrom = gameState.gameTime;
    playGameThrough(gameState, { frameRate, forTime: 500 });
    const elapsed = gameState.gameTime - measuringFrom;
    const movement = (id: string, start: { x: number; y: number }) => {
      const { x, y } = itemState<"charles">(gameState, id).box;
      return {
        speed: Math.hypot(x - start.x, y - start.y) / elapsed,
        direction: directionOf(x - start.x, y - start.y),
      };
    };

    // the joysticks vote, pushed +x and -x, so cancel out:
    expect(
      movement("charles", charlesStart),
      "charles's speed (px/ms) and direction: with both joysticks pushed at once in opposite directions (+x and -x), they should cancel out, leaving charles still",
    ).toEqual({
      speed: expect.closeTo(0, speedPrecisionDigits),
      direction: undefined,
    });
  });

  test("two joysticks, pushed at right angles, each controlling two of three charles, move the one they share the way of the first one pushed, and the others their own way, all at single speed", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // off to the side, out of the monsters' way:
          position: { x: 7, y: 0, z: 0 },
          config: { which: "heels" },
        },
        skiHead1: {
          type: "monster",
          position: { x: 1.75, y: 2.125, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "left",
            style: "greenAndPink",
          },
        },
        skiHead2: {
          type: "monster",
          position: { x: 6.125, y: 1.75, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "away",
            style: "greenAndPink",
          },
        },
        joystick1: {
          type: "joystick",
          config: { controls: ["charlesA", "charlesB"] },
          position: { x: 4, y: 2, z: 0 },
        },
        joystick2: {
          type: "joystick",
          config: { controls: ["charlesB", "charlesC"] },
          position: { x: 6, y: 3.25, z: 0 },
        },
        charlesA: {
          type: "charles",
          config: {},
          position: { x: 0.5, y: 5, z: 0 },
        },
        charlesB: {
          type: "charles",
          config: {},
          position: { x: 2, y: 6, z: 0 },
        },
        charlesC: {
          type: "charles",
          config: {},
          position: { x: 4.5, y: 4.5, z: 0 },
        },
      },
    });

    // until both monsters are pushing their joysticks:
    playGameThrough(gameState, {
      frameRate,
      until: allHaveHeld(
        hasCollided("skiHead1", "joystick1"),
        hasCollided("skiHead2", "joystick2"),
      ),
      failAfter: 5_000,
    });
    const charlesAStart = {
      ...itemState<"charles">(gameState, "charlesA").box,
    };
    const charlesBStart = {
      ...itemState<"charles">(gameState, "charlesB").box,
    };
    const charlesCStart = {
      ...itemState<"charles">(gameState, "charlesC").box,
    };
    const measuringFrom = gameState.gameTime;
    playGameThrough(gameState, { frameRate, forTime: 500 });
    const elapsed = gameState.gameTime - measuringFrom;
    const movement = (id: string, start: { x: number; y: number }) => {
      const { x, y } = itemState<"charles">(gameState, id).box;
      return {
        speed: Math.hypot(x - start.x, y - start.y) / elapsed,
        direction: directionOf(x - start.x, y - start.y),
      };
    };

    // joystick1 is pushed +x, joystick2 +y:
    const { direction: charlesBDirection, ...charlesBRest } = movement(
      "charlesB",
      charlesBStart,
    );
    expect(
      {
        charlesA: movement("charlesA", charlesAStart),
        charlesBSpeed: charlesBRest.speed,
        charlesC: movement("charlesC", charlesCStart),
      },
      "each charles's speed (px/ms) and direction, with joystick1 (A and B) pushed +x and joystick2 (B and C) pushed +y at once: A should go +x and C +y, all at single speed",
    ).toEqual({
      charlesA: {
        speed: expect.closeTo(moveSpeedPixPerMs.charles, speedPrecisionDigits),
        direction: { x: expect.closeTo(1, 1), y: expect.closeTo(0, 1), z: 0 },
      },
      charlesBSpeed: expect.closeTo(
        moveSpeedPixPerMs.charles,
        speedPrecisionDigits,
      ),
      charlesC: {
        speed: expect.closeTo(moveSpeedPixPerMs.charles, speedPrecisionDigits),
        direction: { x: expect.closeTo(0, 1), y: expect.closeTo(1, 1), z: 0 },
      },
    });
    expect(
      [
        { x: expect.closeTo(1, 1), y: expect.closeTo(0, 1), z: 0 },
        { x: expect.closeTo(0, 1), y: expect.closeTo(1, 1), z: 0 },
      ],
      "charles B's direction, controlled by both joysticks pushed at right angles: straight, the way of one of them, not diagonally",
    ).toContainEqual(charlesBDirection);
  });

  test("when the first of two joysticks pushed at right angles is let go, charles turns to the other", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // right by joystick1, so pushes it first:
          position: { x: 2, y: 2.125, z: 0 },
          config: { which: "heels" },
        },
        // further from joystick2, so pushes it after heels has pushed joystick1:
        skiHead: {
          type: "monster",
          position: { x: 6.125, y: 1.75, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "away",
            style: "greenAndPink",
          },
        },
        joystick1: {
          type: "joystick",
          config: { controls: ["charles"] },
          position: { x: 3, y: 2, z: 0 },
        },
        joystick2: {
          type: "joystick",
          config: { controls: ["charles"] },
          position: { x: 6, y: 4, z: 0 },
        },
        charles: {
          type: "charles",
          config: {},
          // room to move +x, then +y, without reaching a wall:
          position: { x: 1, y: 5, z: 0 },
        },
      },
    });

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      frameRate,
      until: allHaveHeld(
        hasCollided("heels", "joystick1"),
        hasCollided("skiHead", "joystick2"),
      ),
      failAfter: 5_000,
    });

    const bothPushingStart = {
      ...itemState<"charles">(gameState, "charles").box,
    };
    const bothPushingFrom = gameState.gameTime;
    playGameThrough(gameState, { frameRate, forTime: 500 });
    const bothPushingEnd = {
      ...itemState<"charles">(gameState, "charles").box,
    };
    const bothPushingElapsed = gameState.gameTime - bothPushingFrom;

    // heels lets go:
    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        mockInputStateTracker.mockDirectionPressed = undefined;
      },
      frameRate,
      forTime: 100,
    });
    const skiHeadOnlyStart = {
      ...itemState<"charles">(gameState, "charles").box,
    };
    const skiHeadOnlyFrom = gameState.gameTime;
    playGameThrough(gameState, { frameRate, forTime: 500 });
    const skiHeadOnlyEnd = itemState<"charles">(gameState, "charles").box;
    const skiHeadOnlyElapsed = gameState.gameTime - skiHeadOnlyFrom;

    expect(
      {
        bothPushing: {
          speed:
            Math.hypot(
              bothPushingEnd.x - bothPushingStart.x,
              bothPushingEnd.y - bothPushingStart.y,
            ) / bothPushingElapsed,
          direction: directionOf(
            bothPushingEnd.x - bothPushingStart.x,
            bothPushingEnd.y - bothPushingStart.y,
          ),
        },
        skiHeadOnly: {
          speed:
            Math.hypot(
              skiHeadOnlyEnd.x - skiHeadOnlyStart.x,
              skiHeadOnlyEnd.y - skiHeadOnlyStart.y,
            ) / skiHeadOnlyElapsed,
          direction: directionOf(
            skiHeadOnlyEnd.x - skiHeadOnlyStart.x,
            skiHeadOnlyEnd.y - skiHeadOnlyStart.y,
          ),
        },
      },
      "charles's speed (px/ms) and direction: while heels pushes joystick1 (+x, pushed first) and the ski head joystick2 (+y), charles should go +x, then turn to +y once heels lets go - at single speed throughout",
    ).toEqual({
      bothPushing: {
        speed: expect.closeTo(moveSpeedPixPerMs.charles, speedPrecisionDigits),
        direction: { x: expect.closeTo(1, 1), y: expect.closeTo(0, 1), z: 0 },
      },
      skiHeadOnly: {
        speed: expect.closeTo(moveSpeedPixPerMs.charles, speedPrecisionDigits),
        direction: { x: expect.closeTo(0, 1), y: expect.closeTo(1, 1), z: 0 },
      },
    });
  });

  test("two joysticks, pushed in opposite directions, each controlling two of three charles, leave the one they share still and move the others", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          // off to the side, out of the monsters' way:
          position: { x: 7, y: 0, z: 0 },
          config: { which: "heels" },
        },
        skiHead1: {
          type: "monster",
          position: { x: 1.75, y: 2.125, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "left",
            style: "greenAndPink",
          },
        },
        skiHead2: {
          type: "monster",
          position: { x: 6.25, y: 5.125, z: 0 },
          config: {
            which: "skiHead",
            activated: "on",
            movement: "forwards",
            startDirection: "right",
            style: "greenAndPink",
          },
        },
        joystick1: {
          type: "joystick",
          config: { controls: ["charlesA", "charlesB"] },
          position: { x: 4, y: 2, z: 0 },
        },
        joystick2: {
          type: "joystick",
          config: { controls: ["charlesB", "charlesC"] },
          position: { x: 4, y: 5, z: 0 },
        },
        charlesA: {
          type: "charles",
          config: {},
          position: { x: 0.5, y: 3.5, z: 0 },
        },
        charlesB: {
          type: "charles",
          config: {},
          position: { x: 2, y: 6.5, z: 0 },
        },
        charlesC: {
          type: "charles",
          config: {},
          position: { x: 7, y: 7, z: 0 },
        },
      },
    });

    // until both monsters are pushing their joysticks:
    playGameThrough(gameState, {
      frameRate,
      until: allHaveHeld(
        hasCollided("skiHead1", "joystick1"),
        hasCollided("skiHead2", "joystick2"),
      ),
      failAfter: 5_000,
    });
    const charlesAStart = {
      ...itemState<"charles">(gameState, "charlesA").box,
    };
    const charlesBStart = {
      ...itemState<"charles">(gameState, "charlesB").box,
    };
    const charlesCStart = {
      ...itemState<"charles">(gameState, "charlesC").box,
    };
    const measuringFrom = gameState.gameTime;
    playGameThrough(gameState, { frameRate, forTime: 500 });
    const elapsed = gameState.gameTime - measuringFrom;
    const movement = (id: string, start: { x: number; y: number }) => {
      const { x, y } = itemState<"charles">(gameState, id).box;
      return {
        speed: Math.hypot(x - start.x, y - start.y) / elapsed,
        direction: directionOf(x - start.x, y - start.y),
      };
    };

    // joystick1 is pushed +x, joystick2 -x:
    expect(
      {
        charlesA: movement("charlesA", charlesAStart),
        charlesB: movement("charlesB", charlesBStart),
        charlesC: movement("charlesC", charlesCStart),
      },
      "each charles's speed (px/ms) and direction, with joystick1 (A and B) pushed +x and joystick2 (B and C) pushed -x at once: A should go +x and C -x at single speed, and B, controlled by both, should stay still as they cancel out",
    ).toEqual({
      charlesA: {
        speed: expect.closeTo(moveSpeedPixPerMs.charles, speedPrecisionDigits),
        direction: { x: expect.closeTo(1, 1), y: expect.closeTo(0, 1), z: 0 },
      },
      charlesB: {
        speed: expect.closeTo(0, speedPrecisionDigits),
        direction: undefined,
      },
      charlesC: {
        speed: expect.closeTo(moveSpeedPixPerMs.charles, speedPrecisionDigits),
        direction: { x: expect.closeTo(-1, 1), y: expect.closeTo(0, 1), z: 0 },
      },
    });
  });

  test("the joystick drives charles into two cubes side by side, pushing both together and bumping each once", () => {
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
        // 12px items, so placed level and side by side, across charles' path:
        cube1: {
          type: "portableBlock",
          position: { x: 2, y: 2.625, z: 0 },
          config: { style: "cube" },
        },
        cube2: {
          type: "portableBlock",
          position: { x: 2, y: 3.375, z: 0 },
          config: { style: "cube" },
        },
      },
    });
    const cube1Bumps = makeCollisionCounter("charles", "cube1");
    const cube2Bumps = makeCollisionCounter("charles", "cube2");

    playGameThrough(gameState, {
      setupInitialInput(mockInputStateTracker) {
        // heels runs into the joystick, sending charles towards the cubes:
        mockInputStateTracker.mockDirectionPressed = "left";
      },
      frameRate,
      forTime: 2_000,
      frameCallbacks: [cube1Bumps.frameCallback, cube2Bumps.frameCallback],
    });

    const cube1Box = itemState<"portableBlock">(gameState, "cube1").box;
    const cube2Box = itemState<"portableBlock">(gameState, "cube2").box;
    expect({
      cube1Bumps: cube1Bumps.count,
      cube2Bumps: cube2Bumps.count,
      cubesLevel: Math.round((cube1Box.x - cube2Box.x) * 100) / 100,
      pushed: cube1Box.x > 2 * 16 + 2,
    }).toEqual({ cube1Bumps: 1, cube2Bumps: 1, cubesLevel: 0, pushed: true });
  });
});
