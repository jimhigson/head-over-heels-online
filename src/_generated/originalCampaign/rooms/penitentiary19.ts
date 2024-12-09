import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  floorSkip: [],
  id: "penitentiary19",
  items: {
    "baddie@1,3,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 1, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@2,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 2, y: 4, z: 0 },
      type: "baddie",
    },
    "door@1,0,0:Z4Y5vo": {
      config: { direction: "towards", toRoom: "penitentiary12" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,3:ZtKq6p": {
      config: { direction: "away", toRoom: "penitentiary21" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    "portableBlock@2,3,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 2, y: 3, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "penitentiary",
  size: { x: 4, y: 8 },
  walls: {
    away: ["loop", "none", "none", "loop"],
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
