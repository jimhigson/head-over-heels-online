import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth64",
  items: {
    d: {
      config: { direction: "away", toRoom: "blacktooth65" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    t: {
      config: { times: { x: 2, y: 2 }, toRoom: "moonbase31" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["plain", "shield"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["shield", "plain"] },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
