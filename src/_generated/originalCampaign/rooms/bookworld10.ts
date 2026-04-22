import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "bookworld10",
  items: {
    d: {
      config: { direction: "right", toRoom: "bookworld11" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "bookworld9" },
      position: { x: 6, y: 3, z: 1 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        which: "monkey",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: ["book", "cowboy", "book", "book", "cowboy", "book"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["book", "book", "cowboy"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["cowboy", "book", "book"] },
      position: { x: 6, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
