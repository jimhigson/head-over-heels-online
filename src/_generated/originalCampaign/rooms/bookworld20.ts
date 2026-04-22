import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "bookworld20",
  items: {
    d: {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "bookworld34",
      },
      position: { x: 4, y: 0, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "bookworld19" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "bookworld26" },
      position: { x: 6, y: 4, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: { config: {}, position: { x: 0, y: 0, z: 0 }, type: "hushPuppy" },
    h1: { config: {}, position: { x: 1, y: 0, z: 1 }, type: "hushPuppy" },
    h2: { config: {}, position: { x: 2, y: 0, z: 2 }, type: "hushPuppy" },
    h3: {
      config: { times: { x: 3 } },
      position: { x: 3, y: 0, z: 3 },
      type: "hushPuppy",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["book", "book"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["book", "book"] },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["book", "book", "book", "book"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
