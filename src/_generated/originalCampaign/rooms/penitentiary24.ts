import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "penitentiary24",
  items: {
    "door@3,8,1:ZtKp4o": {
      config: { direction: "away", toRoom: "penitentiary25" },
      position: { x: 3, y: 8, z: 1 },
      type: "door",
    },
    "lift@4,3,0:ZTwqp2": {
      config: { bottom: 0, top: 6 },
      position: { x: 4, y: 3, z: 0 },
      type: "lift",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary23",
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
