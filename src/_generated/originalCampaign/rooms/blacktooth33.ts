import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth33",
  items: {
    "baddie@0,3,0:zoxNb": {
      config: { activated: true, startDirection: "towards", which: "cyberman" },
      position: { x: 0, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@7,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 7, y: 4, z: 0 },
      type: "baddie",
    },
    "door@3,0,0:Z1V7UEu": {
      config: { direction: "towards", toRoom: "blacktooth32" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "lift@7,7,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    "pickup@0,7,0:Zs6lvR": {
      config: { gives: "jumps" },
      position: { x: 0, y: 7, z: 0 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth34",
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
