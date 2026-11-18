import { expect, test } from "vitest";

import { savedGamesMigrations } from "./savedGamesMigrations";

test("v28 migrates every save in a reincarnation chain, its pickups and its rooms", async () => {
  // a v27 save, with one reincarnation point - each holds its pickups in its
  // gameState and a room predating progression counts:
  const v27State = {
    _persist: { version: 27, rehydrated: false },
    saves: {
      original: {
        gameState: {
          pickupsCollected: { room1: { bag: true, fish: true } },
          characterRooms: {
            head: { id: "room2", roomJson: { items: {} }, items: {} },
          },
        },
        gameInPlay: {
          reincarnationPoint: {
            gameState: {
              pickupsCollected: { room1: { fish: true } },
              characterRooms: {
                head: { id: "room1", roomJson: { items: {} }, items: {} },
              },
            },
            gameInPlay: {},
          },
        },
      },
    },
  };

  expect(await savedGamesMigrations(v27State, 28)).toEqual({
    _persist: { version: 27, rehydrated: false },
    saves: {
      original: {
        gameState: {
          characterRooms: {
            head: {
              id: "room2",
              roomJson: { items: {} },
              items: {},
              progression: 0,
            },
          },
        },
        gameInPlay: {
          pickupsCollected: { room1: { bag: true, fish: true } },
          reincarnationPoint: {
            gameState: {
              characterRooms: {
                head: {
                  id: "room1",
                  roomJson: { items: {} },
                  items: {},
                  progression: 0,
                },
              },
            },
            gameInPlay: { pickupsCollected: { room1: { fish: true } } },
          },
        },
      },
    },
  });
});
