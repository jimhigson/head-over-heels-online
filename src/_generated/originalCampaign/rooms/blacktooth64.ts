import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

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
      config: { toRoom: "moonbase31" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,3,0": {
      config: { toRoom: "moonbase31" },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,2,0": {
      config: { toRoom: "moonbase31" },
      position: { x: 3, y: 2, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0": {
      config: { toRoom: "moonbase31" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 6 },
  walls: {
    away: ["plain", "shield", "none", "none", "shield", "plain"],
    left: ["plain", "armour", "shield", "shield", "armour", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
