import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth70",
  items: {
    "block@0,5,0": {
      config: { style: "organic", times: { x: 2, z: 2 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,6,1": {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 0, y: 6, z: 1 },
      type: "block",
    },
    "deadlyBlock@0,5,4": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 0, y: 5, z: 4 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,2": {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 1, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "blacktooth67" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,3": {
      config: { direction: "away", toRoom: "blacktooth71" },
      position: { x: 0, y: 8, z: 3 },
      type: "door",
    },
    "wall@0,0,0": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
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
        times: { y: 8 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 2, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
