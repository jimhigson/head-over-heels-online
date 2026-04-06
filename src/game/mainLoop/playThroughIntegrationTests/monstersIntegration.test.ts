import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { CharacterName } from "../../../model/modelTypes";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { headState, itemState } from "../../../_testUtils/characterState";
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

test.for([1, 2] as const)(
  "monster can walk onto the player and player loses a life (walking from block height %i)",
  (walkFromHeight) => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        block: {
          type: "block",
          config: {
            style: "artificial",
            times: {
              x: 3,
            },
          },
          position: {
            x: 0,
            y: 0,
            z: walkFromHeight - 1,
          },
        },
        head: {
          type: "player",
          config: {
            which: "head",
          },
          position: {
            x: 3,
            y: 0,
            z: 0,
          },
        },
        skiHead: {
          type: "monster",
          config: {
            which: "skiHead",
            style: "greenAndPink",
            activated: "on",
            movement: "forwards",
            startDirection: "left",
          },
          position: {
            x: 0,
            y: 0,
            z: walkFromHeight,
          },
        },
        switch: {
          type: "switch",
          config: {
            initialSetting: "left",
            type: "in-room",
            modifies: [],
          },
          position: {
            x: 7,
            y: 0,
            z: 0,
          },
        },
      },
    });

    const startingLives = headState(gameState).lives as number;

    playGameThrough(gameState, {
      until(gameState) {
        return headState(gameState).lives === startingLives - 1;
      },
      frameCallbacks(gameState) {
        if (
          headState(gameState).lives === startingLives &&
          itemState<"switch">(gameState, "switch").setting === "right"
        ) {
          expect.fail(
            "monster slid right over head and hit the switch without any lives being lost",
          );
        }
      },
      frameRate: { fps: [15] },
    });
  },
);
