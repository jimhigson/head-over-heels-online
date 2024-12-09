import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth69",
  items: {
    "door@6,2,0:ZUCokQ": {
      config: { direction: "left", toRoom: "blacktooth67" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
    "teleporter@2,2,0:Z1R6jSa": {
      config: { toRoom: "moonbase36" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,3,0:Z1R6jSa": {
      config: { toRoom: "moonbase36" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,2,0:Z1R6jSa": {
      config: { toRoom: "moonbase36" },
      position: { x: 3, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0:Z1R6jSa": {
      config: { toRoom: "moonbase36" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 6 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
    left: ["plain", "shield", "none", "none", "shield", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
