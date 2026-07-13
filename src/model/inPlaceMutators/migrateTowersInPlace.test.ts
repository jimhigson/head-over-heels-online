import { expect, test } from "vitest";

import { type AnyRoomJson } from "../RoomJson";
import { migrateTowersInPlace } from "./migrateTowersInPlace";

const roomWithItems = (items: AnyRoomJson["items"]): AnyRoomJson =>
  ({ planet: "blacktooth", items }) as unknown as AnyRoomJson;

test("splits an x/y-repeated tower into one z-only tower per cell", () => {
  const room = roomWithItems({
    t: {
      type: "block",
      position: { x: 2, y: 3, z: 0 },
      config: { style: "tower", times: { x: 2, y: 2, z: 3 } },
    },
  } as unknown as AnyRoomJson["items"]);

  migrateTowersInPlace(room);

  expect(room.items).toEqual({
    b: {
      type: "block",
      position: { x: 2, y: 3, z: 0 },
      config: { style: "tower", times: { z: 3 } },
    },
    b1: {
      type: "block",
      position: { x: 2, y: 4, z: 0 },
      config: { style: "tower", times: { z: 3 } },
    },
    b2: {
      type: "block",
      position: { x: 3, y: 3, z: 0 },
      config: { style: "tower", times: { z: 3 } },
    },
    b3: {
      type: "block",
      position: { x: 3, y: 4, z: 0 },
      config: { style: "tower", times: { z: 3 } },
    },
  });
});

test("drops redundant x/y=1 from a single-column tower's times", () => {
  const room = roomWithItems({
    t: {
      type: "block",
      position: { x: 0, y: 0, z: 0 },
      config: { style: "tower", times: { x: 1, y: 1, z: 4 } },
    },
  } as unknown as AnyRoomJson["items"]);

  migrateTowersInPlace(room);

  expect(room.items.t.config).toEqual({ style: "tower", times: { z: 4 } });
});

test("a height-1 tower keeps no times at all", () => {
  const room = roomWithItems({
    t: {
      type: "block",
      position: { x: 0, y: 0, z: 0 },
      config: { style: "tower", times: { x: 2 } },
    },
  } as unknown as AnyRoomJson["items"]);

  migrateTowersInPlace(room);

  expect(room.items).toEqual({
    b: {
      type: "block",
      position: { x: 0, y: 0, z: 0 },
      config: { style: "tower" },
    },
    b1: {
      type: "block",
      position: { x: 1, y: 0, z: 0 },
      config: { style: "tower" },
    },
  });
});

test("leaves non-tower blocks untouched", () => {
  const items = {
    b: {
      type: "block",
      position: { x: 0, y: 0, z: 0 },
      config: { style: "organic", times: { x: 2, y: 2 } },
    },
  } as unknown as AnyRoomJson["items"];
  const room = roomWithItems(items);

  migrateTowersInPlace(room);

  expect(room.items).toEqual(items);
});
