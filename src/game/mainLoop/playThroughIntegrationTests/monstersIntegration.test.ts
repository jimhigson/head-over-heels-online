import { beforeEach, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { CharacterName } from "../../../model/modelTypes";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
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
