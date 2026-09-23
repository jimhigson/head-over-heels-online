import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import {
  headState,
  heelsState,
  itemState,
} from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { pokeableToNumber } from "../../../model/ItemStateMap";

beforeEach(() => {
  resetStore();
});

test.for([
  { spikyBallY: 2, label: "from a distance" },
  { spikyBallY: 3, label: "from very close" },
])("fired doughnut can roll a spiky ball $label", ({ spikyBallY }) => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "head" },
      },
      hooter: {
        type: "pickup",
        position: { x: 4, y: 4, z: 1 },
        config: { gives: "hooter" },
      },
      doughnuts: {
        type: "pickup",
        position: { x: 4, y: 4, z: 2 },
        config: { gives: "doughnuts" },
      },
      spikyBall: {
        type: "slidingDeadly",
        position: { x: 4, y: spikyBallY, z: 0 },
        config: { style: "spikyBall", startingPhase: 1 },
      },
    },
  });

  playGameThrough(gameState, {
    until(gs) {
      const head = headState(gs);
      return head.hasHooter && pokeableToNumber(head.doughnuts) > 0;
    },
  });

  const doughnutsBeforeFiring = pokeableToNumber(
    headState(gameState).doughnuts,
  );

  playGameThrough(gameState, {
    setupInitialInput(inputState) {
      inputState.mockPressing("fire");
    },

    until(gs) {
      return (
        pokeableToNumber(headState(gs).doughnuts) === doughnutsBeforeFiring - 1
      );
    },
  });

  // the doughnut was fired, so nothing failed to be used:
  expect(headState(gameState).abilityFailedToUseAtGameTime).toBeUndefined();

  playGameThrough(gameState, {
    setupInitialInput(inputState) {
      inputState.mockNotPressing("fire");
    },
    until(gs) {
      return itemState<"slidingDeadly">(gs, "spikyBall").box.y === 0;
    },
  });
});

test("head taps fire with no hooter and no doughnuts and fails to use the ability", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "head" },
      },
    },
  });

  gameState.inputStateTracker.mockPressing("fire");
  playGameThrough(gameState);

  expect(headState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    1_000 / 60,
  );
});

test("head taps fire with a hooter but no doughnuts and fails to use the ability", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "head" },
      },
      hooter: {
        type: "pickup",
        position: { x: 4, y: 4, z: 1 },
        config: { gives: "hooter" },
      },
    },
  });

  playGameThrough(gameState, {
    until: (gameState) => headState(gameState).hasHooter,
  });

  const fireStartTime = gameState.gameTime;
  gameState.inputStateTracker.mockPressing("fire");
  playGameThrough(gameState);

  expect(headState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    fireStartTime + 1_000 / 60,
  );
});

test("head taps fire with doughnuts but no hooter and fails to use the ability", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      head: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "head" },
      },
      doughnuts: {
        type: "pickup",
        position: { x: 4, y: 4, z: 1 },
        config: { gives: "doughnuts" },
      },
    },
  });

  playGameThrough(gameState, {
    until: (gameState) => pokeableToNumber(headState(gameState).doughnuts) > 0,
  });

  const fireStartTime = gameState.gameTime;
  gameState.inputStateTracker.mockPressing("fire");
  playGameThrough(gameState);

  expect(headState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    fireStartTime + 1_000 / 60,
  );
});

test("heels taps fire and fails to use the ability", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: { which: "heels" },
      },
    },
  });

  gameState.inputStateTracker.mockPressing("fire");
  playGameThrough(gameState);

  expect(heelsState(gameState).abilityFailedToUseAtGameTime).toBeCloseTo(
    // one frame in at 60fps default rate:
    1_000 / 60,
  );
});
