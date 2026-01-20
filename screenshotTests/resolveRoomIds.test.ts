import { expect, test } from "vitest";

import type { Campaign } from "../src/model/modelTypes";

import { resolveRoomIds } from "./resolveRoomIds";

type TestRoomId =
  | "blacktooth1"
  | "blacktooth10"
  | "blacktooth2"
  | "bookworld1"
  | "moonbase1"
  | "moonbase2";

const color = { hue: "cyan", shade: "basic" } as const;

const mockRooms = {
  blacktooth1: {
    id: "blacktooth1" as const,
    planet: "blacktooth",
    color,
    items: {
      conv1: {
        type: "conveyor",
        position: { x: 0, y: 0, z: 0 },
        config: { direction: "left" },
      },
      block1: {
        type: "block",
        position: { x: 1, y: 0, z: 0 },
        config: { style: "organic" },
      },
    },
  },
  blacktooth2: {
    id: "blacktooth2" as const,
    planet: "blacktooth",
    color,
    items: {
      monster1: {
        type: "monster",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "dalek",
          movement: "patrol-randomly-diagonal",
          activated: "on",
        },
      },
    },
  },
  blacktooth10: {
    id: "blacktooth10" as const,
    planet: "blacktooth",
    color,
    items: {
      monster1: {
        type: "monster",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "skiHead",
          activated: "on",
          movement: "back-forth",
          startDirection: "towards",
          style: "greenAndPink",
        },
      },
      monster2: {
        type: "monster",
        position: { x: 1, y: 0, z: 0 },
        config: {
          which: "dalek",
          movement: "patrol-randomly-diagonal",
          activated: "on",
        },
      },
    },
  },
  moonbase1: {
    id: "moonbase1" as const,
    planet: "moonbase",
    color,
    items: {
      conv1: {
        type: "conveyor",
        position: { x: 0, y: 0, z: 0 },
        config: { direction: "right" },
      },
    },
  },
  moonbase2: {
    id: "moonbase2" as const,
    planet: "moonbase",
    color,
    items: {
      platform1: {
        type: "movingPlatform",
        position: { x: 0, y: 0, z: 0 },
        config: {
          movement: "back-forth",
          activated: "on",
          startDirection: "towards",
        },
      },
    },
  },
  bookworld1: {
    id: "bookworld1" as const,
    planet: "bookworld",
    color,
    items: {
      monster1: {
        type: "monster",
        position: { x: 0, y: 0, z: 0 },
        config: {
          which: "skiHead",
          activated: "on",
          movement: "back-forth",
          startDirection: "towards",
          style: "greenAndPink",
        },
      },
    },
  },
} as const satisfies Campaign<TestRoomId>["rooms"];

test("returns all rooms when no filters provided", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: undefined,
    }),
  ]).toEqual(Object.keys(mockRooms));
});

test("ROOMS filters by exact room name", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: "blacktooth1",
      roomsContaining: undefined,
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth1"]);
});

test("ROOMS filters by multiple exact names", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: "blacktooth1,moonbase2",
      roomsContaining: undefined,
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth1", "moonbase2"]);
});

test("ROOMS filters by wildcard pattern", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: "blacktooth*",
      roomsContaining: undefined,
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth1", "blacktooth2", "blacktooth10"]);
});

test("ROOMS filters by multiple wildcard patterns", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: "blacktooth1*,moonbase*",
      roomsContaining: undefined,
    }),
  ]).toEqual<TestRoomId[]>([
    "blacktooth1",
    "blacktooth10",
    "moonbase1",
    "moonbase2",
  ]);
});

test("ROOMS_CONTAINING filters by item type", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: "conveyor",
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth1", "moonbase1"]);
});

test("ROOMS_CONTAINING filters by item type with config property", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: "monster[which=skiHead]",
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth10", "bookworld1"]);
});

test("ROOMS_CONTAINING filters by item type with different config property", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: "conveyor[direction=left]",
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth1"]);
});

test("ROOMS_CONTAINING filters by multiple types", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: "conveyor,movingPlatform",
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth1", "moonbase1", "moonbase2"]);
});

test("ROOMS_CONTAINING filters by mixed type and type with config", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: "movingPlatform,monster[which=skiHead]",
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth10", "moonbase2", "bookworld1"]);
});

test("ROOMS_CONTAINING throws on invalid syntax", () => {
  expect(() => [
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: "monster[which",
    }),
  ]).toThrow("Invalid ROOMS_CONTAINING filter syntax: monster[which");
});

test("ROOMS_CONTAINING returns empty array when no rooms match", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: "nonexistent",
    }),
  ]).toEqual<TestRoomId[]>([]);
});

test("ROOMS_CONTAINING with config property that does not exist on item", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: undefined,
      roomsContaining: "conveyor[nonexistent=value]",
    }),
  ]).toEqual<TestRoomId[]>([]);
});

test("ROOMS and ROOMS_CONTAINING together return union of both", () => {
  expect<TestRoomId[]>([
    ...resolveRoomIds(mockRooms, {
      rooms: "moonbase1",
      roomsContaining: "monster[which=skiHead]",
    }),
  ]).toEqual<TestRoomId[]>(["blacktooth10", "moonbase1", "bookworld1"]);
});
