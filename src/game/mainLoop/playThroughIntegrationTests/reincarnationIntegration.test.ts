import { beforeEach, describe, expect, test, vi } from "vitest";
vi.mock("../../sprites/samplePalette", () => ({
  spritesheetPalette: vi.fn().mockReturnValue({}),
}));

import type { ItemInPlay } from "../../../model/ItemInPlay";

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

    const restoredTextInSave = reincarnationPointHeelsRoomItems[
      "floatingText-fish"
    ] as ItemInPlay<"floatingText">;
    expect(restoredTextInSave.config.textLines).toMatchInlineSnapshot(`
      [
        "reincarnation",
        "point",
        "restored",
      ]
    `);
  });

  test("saves the game without the fish in it if both players are in the same room, in both saved versions of the room", () => {
    /**
     * because json can't de-deupe if the same object appears in multiple places in the serialised
     * object, there will be two copies of a room if both characters are in the same room.
     * In this case, both should have had the fish removed
     */

    const gameState = setUpBasicGame({
      firstRoomItems: {
        // heels will get the fish
        heels: {
          type: "player",
          position: { x: 4, y: 4, z: 2 },
          config: {
            which: "heels",
          },
        },
        // head is just there doing nothing:
        head: {
          type: "player",
          position: { x: 6, y: 6, z: 0 },
          config: {
            which: "head",
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
    // both characters were loaded into the same room (referentially same object)
    expect(gameState.characterRooms.head).toBe(gameState.characterRooms.heels);

    playGameThrough(gameState, {
      until: () =>
        // play until the reincarnation point has been saved:
        store.getState().gameMenus.gameInPlay.reincarnationPoint !== undefined,
    });

    const headRoomItemsInReincarnationPoint =
      store.getState().gameMenus.gameInPlay.reincarnationPoint?.gameState
        .characterRooms.head?.items;
    const heelsRoomItemsInReincarnationPoint =
      store.getState().gameMenus.gameInPlay.reincarnationPoint?.gameState
        .characterRooms.heels?.items;

    if (!headRoomItemsInReincarnationPoint) {
      expect.fail(
        "expected the head to have a room in the reincarnation point, but they do not",
      );
    }
    if (!heelsRoomItemsInReincarnationPoint) {
      expect.fail(
        "expected the heels to have a room in the reincarnation point, but they do not",
      );
    }

    expect.soft(headRoomItemsInReincarnationPoint.fish).toBe(undefined);
    expect(heelsRoomItemsInReincarnationPoint.fish).toBe(undefined);

    expect(
      headRoomItemsInReincarnationPoint.floor.state.stoodOnBy["fish"],
    ).toBe(undefined);
    expect(
      heelsRoomItemsInReincarnationPoint.floor.state.stoodOnBy["fish"],
    ).toBe(undefined);

    const restoredTextInHeadsRoomSave = headRoomItemsInReincarnationPoint[
      "floatingText-fish"
    ] as ItemInPlay<"floatingText">;
    expect(restoredTextInHeadsRoomSave.config.textLines).toMatchInlineSnapshot(`
      [
        "reincarnation",
        "point",
        "restored",
      ]
    `);
    const restoredTextInHeelsRoomSave = heelsRoomItemsInReincarnationPoint[
      "floatingText-fish"
    ] as ItemInPlay<"floatingText">;
    expect(restoredTextInHeelsRoomSave.config.textLines).toMatchInlineSnapshot(`
      [
        "reincarnation",
        "point",
        "restored",
      ]
    `);
  });
});
