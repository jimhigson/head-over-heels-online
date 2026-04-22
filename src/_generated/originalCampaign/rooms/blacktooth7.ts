import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "blacktooth7",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth8fish" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth5" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    d2: {
      config: {
        direction: "left",
        meta: { toSubRoom: "right" },
        toRoom: "blacktooth10",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
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
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 2, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
