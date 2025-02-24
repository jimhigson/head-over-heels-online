import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "penitentiary17",
  items: {
    "block@3,0,0": {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "door@3,8,2": {
      config: { direction: "away", toRoom: "penitentiary18fish" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary16",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
      "loop",
    ],
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
