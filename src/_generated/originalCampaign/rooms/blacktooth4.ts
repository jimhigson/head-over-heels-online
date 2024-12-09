import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth4",
  items: {
    "door@3,0,0:Z1cQbhi": {
      config: { direction: "towards", toRoom: "blacktooth5" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "lift@3,5,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 3, y: 5, z: 0 },
      type: "lift",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth3",
  size: { x: 8, y: 6 },
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
    left: ["plain", "armour", "shield", "shield", "armour", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
