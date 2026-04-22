import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth70",
  items: {
    b: {
      config: { style: "organic", times: { x: 2, z: 2 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 0, y: 6, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth67" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth71" },
      position: { x: 0, y: 8, z: 3 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 0, y: 5, z: 4 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 1, y: 5, z: 2 },
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
      config: {
        direction: "left",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
