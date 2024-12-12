import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth41",
  items: {
    "door@0,0,0:uMJWX": {
      config: { direction: "right", toRoom: "blacktooth39" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:ZUCFDn": {
      config: { direction: "left", toRoom: "blacktooth42" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 2 },
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
    left: ["none", "none"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
