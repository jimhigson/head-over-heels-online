import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth24",
  items: {
    "door@8,3,3:ZUCURR": {
      config: { direction: "left", toRoom: "blacktooth25" },
      position: { x: 8, y: 3, z: 3 },
      type: "door",
    },
    "spring@4,4,0:13y": {
      config: {},
      position: { x: 4, y: 4, z: 0 },
      type: "spring",
    },
    "teleporter@0,0,0:Z1xY0rQ": {
      config: { toRoom: "blacktooth23heels" },
      position: { x: 0, y: 0, z: 0 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
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
