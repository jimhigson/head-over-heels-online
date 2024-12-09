import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus1",
  items: {
    "door@8,3,0:Z1mcXXS": {
      config: { direction: "left", toRoom: "egyptus2" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "teleporter@3,3,0:Z2sJibM": {
      config: { toRoom: "moonbase24toegyptus" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0:Z2sJibM": {
      config: { toRoom: "moonbase24toegyptus" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,3,0:Z2sJibM": {
      config: { toRoom: "moonbase24toegyptus" },
      position: { x: 4, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,4,0:Z2sJibM": {
      config: { toRoom: "moonbase24toegyptus" },
      position: { x: 4, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
