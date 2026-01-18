import { expect, test } from "vitest";

import type { Campaign } from "../src/model/modelTypes";

import { resolveRoomIds, type RoomsMap } from "./resolveRoomIds";

type TestRoomId =
  | "blacktooth1"
  | "blacktooth10"
  | "blacktooth2"
  | "bookworld1"
  | "moonbase1"
  | "moonbase2";

const mockRooms: RoomsMap<TestRoomId> = {
  blacktooth1: {
    items: {
      conv1: { type: "conveyor", config: { direction: "left" } },
      block1: { type: "block", config: { style: "organic" } },
    },
  },
  blacktooth2: {
    items: {
      monster1: { type: "monster", config: { which: "dalek" } },
    },
  },
  blacktooth10: {
    items: {
      monster1: { type: "monster", config: { which: "skiHead" } },
      monster2: { type: "monster", config: { which: "dalek" } },
    },
  },
  moonbase1: {
    items: {
      conv1: { type: "conveyor", config: { direction: "right" } },
    },
  },
  moonbase2: {
    items: {
      platform1: { type: "movingPlatform", config: { speed: 1 } },
    },
  },
  bookworld1: {
    items: {
      monster1: { type: "monster", config: { which: "skiHead" } },
    },
  },
};

const mockCampaign = { rooms: mockRooms } as Campaign<TestRoomId>;

test("returns all rooms when no filters provided", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: undefined,
    }),
  ).toEqual(Object.keys(mockRooms));
});

test("ROOMS filters by exact room name", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: "blacktooth1",
      roomsContaining: undefined,
    }),
  ).toEqual<TestRoomId[]>(["blacktooth1"]);
});

test("ROOMS filters by multiple exact names", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: "blacktooth1,moonbase2",
      roomsContaining: undefined,
    }),
  ).toEqual<TestRoomId[]>(["blacktooth1", "moonbase2"]);
});

test("ROOMS filters by wildcard pattern", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: "blacktooth*",
      roomsContaining: undefined,
    }),
  ).toEqual<TestRoomId[]>(["blacktooth1", "blacktooth2", "blacktooth10"]);
});

test("ROOMS filters by multiple wildcard patterns", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: "blacktooth1*,moonbase*",
      roomsContaining: undefined,
    }),
  ).toEqual<TestRoomId[]>([
    "blacktooth1",
    "blacktooth10",
    "moonbase1",
    "moonbase2",
  ]);
});

test("ROOMS_CONTAINING filters by item type", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: "conveyor",
    }),
  ).toEqual<TestRoomId[]>(["blacktooth1", "moonbase1"]);
});

test("ROOMS_CONTAINING filters by item type with config property", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: "monster[which=skiHead]",
    }),
  ).toEqual<TestRoomId[]>(["blacktooth10", "bookworld1"]);
});

test("ROOMS_CONTAINING filters by item type with different config property", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: "conveyor[direction=left]",
    }),
  ).toEqual<TestRoomId[]>(["blacktooth1"]);
});

test("ROOMS_CONTAINING filters by multiple types", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: "conveyor,movingPlatform",
    }),
  ).toEqual<TestRoomId[]>(["blacktooth1", "moonbase1", "moonbase2"]);
});

test("ROOMS_CONTAINING filters by mixed type and type with config", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: "movingPlatform,monster[which=skiHead]",
    }),
  ).toEqual<TestRoomId[]>(["blacktooth10", "moonbase2", "bookworld1"]);
});

test("ROOMS_CONTAINING throws on invalid syntax", () => {
  expect(() =>
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: "monster[which",
    }),
  ).toThrow("Invalid ROOMS_CONTAINING filter syntax: monster[which");
});

test("ROOMS_CONTAINING returns empty array when no rooms match", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: "nonexistent",
    }),
  ).toEqual<TestRoomId[]>([]);
});

test("ROOMS_CONTAINING with config property that does not exist on item", () => {
  expect<TestRoomId[]>(
    resolveRoomIds(mockCampaign, {
      rooms: undefined,
      roomsContaining: "conveyor[nonexistent=value]",
    }),
  ).toEqual<TestRoomId[]>([]);
});
