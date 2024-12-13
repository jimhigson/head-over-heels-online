import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth29",
  items: {
    "baddie@0,6,0:zoxNb": {
      config: { activated: true, startDirection: "towards", which: "cyberman" },
      position: { x: 0, y: 6, z: 0 },
      type: "baddie",
    },
    "door@2,0,0:ZpVTnF": {
      config: { direction: "towards", toRoom: "blacktooth27fish" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "lift@0,7,7:ZTwqnv": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 7, z: 7 },
      type: "lift",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth30",
  size: { x: 6, y: 8 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
