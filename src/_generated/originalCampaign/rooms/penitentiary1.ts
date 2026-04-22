import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "penitentiary1",
  items: {
    d: {
      config: { direction: "away", toRoom: "penitentiary2" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    t: {
      config: { times: { x: 2, y: 2 }, toRoom: "moonbase22topenitentiary" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["loop", "loop"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["loop", "loop"] },
      position: { x: 4, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
