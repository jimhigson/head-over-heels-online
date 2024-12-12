import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "blacktooth57",
  items: {
    "door@3,8,0:2fuP5S": {
      config: { direction: "away", toRoom: "blacktooth58triple" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0:ZUCwAY": {
      config: { direction: "left", toRoom: "blacktooth56" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "teleporter@3,3,0:Z1GJpGg": {
      config: { toRoom: "moonbase9" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:Z1GJpGg": {
      config: { toRoom: "moonbase9" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,3,0:Z1GJpGg": {
      config: { toRoom: "moonbase9" },
      position: { x: 4, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,4,0:Z1GJpGg": {
      config: { toRoom: "moonbase9" },
      position: { x: 4, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
    left: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
