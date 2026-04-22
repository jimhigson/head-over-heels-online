import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "moonbase11",
  items: {
    d: {
      config: { direction: "towards", toRoom: "moonbase10" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "moonbase12" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "moonbase19" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "left", tiles: ["window3", "coil", "window2"] },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "left", tiles: ["window3", "coil", "window1"] },
      position: { x: 2, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
