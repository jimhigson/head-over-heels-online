import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth5",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth4" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "blacktooth6" },
      position: { x: 2, y: 3, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { x: 2 } },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
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
