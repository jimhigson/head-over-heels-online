import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "egyptus",
  id: "egyptus18",
  items: {
    "door@0,2,4:2rMp3D": {
      config: { direction: "right", toRoom: "egyptus17" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    "door@2,0,0:ZruOzR": {
      config: { direction: "towards", toRoom: "egyptus14" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "egyptus",
  size: { x: 6, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
