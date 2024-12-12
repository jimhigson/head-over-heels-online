import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth16",
  items: {
    "baddie@0,7,0:Z1WWFt6": {
      config: { activated: true, which: "bubble-robot" },
      position: { x: 0, y: 7, z: 0 },
      type: "baddie",
    },
    "baddie@7,0,0:Z1WWFt6": {
      config: { activated: true, which: "bubble-robot" },
      position: { x: 7, y: 0, z: 0 },
      type: "baddie",
    },
    "baddie@7,7,0:Z1WWFt6": {
      config: { activated: true, which: "bubble-robot" },
      position: { x: 7, y: 7, z: 0 },
      type: "baddie",
    },
    "door@3,0,0:Z1V8aSY": {
      config: { direction: "towards", toRoom: "blacktooth15" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,3,0:Z2iBTr0": {
      config: { direction: "left", toRoom: "blacktooth17triple" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "slidingDeadly@3,3,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 3, y: 3, z: 0 },
      type: "slidingDeadly",
    },
    "slidingDeadly@4,4,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 4, y: 4, z: 0 },
      type: "slidingDeadly",
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
