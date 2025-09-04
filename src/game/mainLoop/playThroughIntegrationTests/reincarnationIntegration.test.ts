import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { store } from "../../../store/store";

beforeEach(() => {
  resetStore();
});

describe("reincarnation", () => {
  test("saves the game without the fish in it", () => {
    const gameState = setUpBasicGame({
      firstRoomItems: {
        heels: {
          type: "player",
          position: { x: 4, y: 4, z: 2 },
          config: {
            which: "heels",
          },
        },
        fish: {
          type: "pickup",
          // line up on half square to walk through the doorway:
          position: { x: 4, y: 4, z: 0 },
          config: {
            gives: "reincarnation",
          },
        },
      },
    });
    // check there isn't already a reincarnation point before we start (the store is initialised)
    expect(store.getState().gameMenus.gameInPlay.reincarnationPoint).toBe(
      undefined,
    );

    playGameThrough(gameState, {
      until: () =>
        store.getState().gameMenus.gameInPlay.reincarnationPoint !== undefined,
    });

    const reincarnationPointHeelsRoomItems =
      store.getState().gameMenus.gameInPlay.reincarnationPoint?.gameState
        .characterRooms.heels?.items;

    if (!reincarnationPointHeelsRoomItems) {
      expect.fail(
        "expected the room to exist in the reincarnation point, but it does not",
      );
    }

    expect(reincarnationPointHeelsRoomItems.fish).toBe(undefined);
    expect(reincarnationPointHeelsRoomItems.floor.state.stoodOnBy["fish"]).toBe(
      undefined,
    );
  });
});
