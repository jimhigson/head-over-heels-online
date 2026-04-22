import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "bookworld6",
  items: {
    b: {
      config: { style: "book" },
      position: { x: 1, y: 1.5, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "book" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "bookworld5" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld11" },
      position: { x: 4, y: 3, z: 3 },
      type: "door",
    },
    db: {
      config: { style: "toaster" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 4, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pu: { config: {}, position: { x: 2, y: 4, z: 0 }, type: "pushableBlock" },
    pu1: { config: {}, position: { x: 2, y: 5, z: 0 }, type: "pushableBlock" },
    sb: {
      config: { style: "book" },
      position: { x: 1, y: 1.5, z: 1 },
      type: "slidingBlock",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["book"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["book"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["book", "book", "cowboy"] },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["cowboy", "book", "book"] },
      position: { x: 4, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
