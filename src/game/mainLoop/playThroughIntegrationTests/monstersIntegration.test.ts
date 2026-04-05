import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { CharacterName } from "../../../model/modelTypes";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { xyzEqual } from "../../../utils/vectors/vectors";
import { selectCurrentPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";

beforeEach(() => {
  resetStore();
});

// doesn't test that it rushes towards headOverHeels - loading the campaign doesn't support
// starting in symbiosis
test.each(["head", "heels"] as const)(
  "homing bot rushes towards %s",
  (playableName: CharacterName) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        [playableName]: {
          type: "player",
          position: { x: 0, y: 0, z: 0 },
          config: {
            which: playableName,
          },
        },
        monster: {
          type: "monster",
          position: { x: 0, y: 3, z: 0 },
          config: {
            which: "homingBot",
            activated: "on",
            movement: "towards-tripped-on-axis-xy4",
          },
        },
      },
    });

    playGameThrough(gameState, {
      // this needs a long time now that the player gets invulnerability after dying for a few seconds
      until(gameState) {
        const currentPlayableItem = selectCurrentPlayableItem(gameState);
        if (currentPlayableItem!.type === "headOverHeels") {
          return currentPlayableItem?.state.head.lives === 7;
        } else {
          return currentPlayableItem?.state.lives === 7;
        }
      },
    });
  },
);

test("monsters don't fall out of rooms via the doorways", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 4, y: 4, z: 0 },
        config: {
          which: "heels",
        },
      },
      monster: {
        type: "monster",
        // line up on half square to walk through the doorway:
        position: { x: 0.5, y: 4, z: 0 },
        config: {
          which: "skiHead",
          startDirection: "towards",
          activated: "on",
          movement: "back-forth",
          style: "greenAndPink",
        },
      },
      door: {
        type: "door",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "towards",
          toRoom: "secondRoom",
        },
      },
    },
  });
  playGameThrough(gameState, { until: 10_000 });

  const monsterPosition =
    gameState.characterRooms.heels?.items.monster.state.position;
  // test that the monster is still in the room:
  expect(monsterPosition?.z).toEqual(0); //didn't fall through the floor
  expect(monsterPosition?.y).toBeGreaterThan(0); //didn't leave through the door
});

test("activated:after-player-near", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "heels",
        },
      },
      // just something realistic for the monster to stand on:
      toaster: {
        type: "deadlyBlock",
        position: { x: 4, y: 2, z: 0 },
        config: {
          style: "toaster",
        },
      },
      monster: {
        type: "monster",
        position: { x: 4, y: 2, z: 1 },
        config: {
          which: "cyberman",
          activated: "after-player-near",
          movement: "towards-on-shortest-axis-xy4",
          startDirection: "left",
        },
      },
      switch: {
        type: "switch",

        position: { x: 8, y: 0, z: 0 },
        config: {
          type: "in-room",
          initialSetting: "right",
          modifies: [{ expectType: "monster", activates: false }],
        },
      },
    },
  });

  const monsterStartPosition = itemState(gameState, "monster").position;

  // no input for a second to start:
  playGameThrough(gameState, {
    until: 1_000,
  });

  // should have stayed in the same place (player didn't go near)
  expect(itemState(gameState, "monster").position).toEqual(
    monsterStartPosition,
  );
  expect(itemState<"monster">(gameState, "monster").activated).toBe(false);

  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "left";
    },
    until(gameState) {
      const monsterStartPositionUpdated = itemState(
        gameState,
        "monster",
      ).position;

      // continue until the monster has woken up and moved because player passed near
      return !xyzEqual(monsterStartPosition, monsterStartPositionUpdated);
    },
  });

  expect(itemState<"monster">(gameState, "monster").activated).toBe(true);

  playGameThrough(gameState, {
    until(gameState) {
      // until hit the switch and monster is no longer activated:
      const updatedState = itemState<"monster">(gameState, "monster");
      return !updatedState.activated;
    },
  });

  // move back right towards the monster but shouldn't reactivate it now:
  // - the "after-player-near" is a one-time event only
  playGameThrough(gameState, {
    setupInitialInput(mockInputStateTracker) {
      mockInputStateTracker.mockDirectionPressed = "right";
    },
    until: 5_000,
  });

  expect(itemState<"monster">(gameState, "monster").activated).toBe(false);
});
