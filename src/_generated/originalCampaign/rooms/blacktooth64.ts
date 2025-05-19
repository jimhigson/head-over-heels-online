import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth64",
  items: {
    "door@2,6,0": {
      config: { direction: "away", toRoom: "blacktooth65" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "teleporter@2,2,0": {
      config: {
        times: { x: 2, y: 2 },
        toPosition: { x: 2, y: 2, z: 0 },
        toRoom: "moonbase31",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield"],
        times: { x: 2 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: {
        direction: "away",
        tiles: ["shield", "plain"],
        times: { x: 2 },
      },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
