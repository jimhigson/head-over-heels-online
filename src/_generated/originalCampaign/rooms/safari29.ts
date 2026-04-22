import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "safari29",
  items: {
    d: {
      config: { direction: "right", toRoom: "safari28" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari30" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 2, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 7, y: 7, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
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
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["wall", "shield", "wall"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["wall", "window", "wall"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
