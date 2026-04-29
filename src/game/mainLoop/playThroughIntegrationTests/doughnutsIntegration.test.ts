import { beforeEach, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { headState, itemState } from "../../../_testUtils/characterState";
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

  playGameThrough(gameState, {
    setupInitialInput(inputState) {
      inputState.mockNotPressing("fire");
    },
    until(gs) {
      return itemState<"slidingDeadly">(gs, "spikyBall").position.y === 0;
    },
  });
});
