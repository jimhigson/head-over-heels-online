import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "penitentiary9",
  items: {
    "lift@0,4,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 0, y: 4, z: 0 },
      type: "lift",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary10",
  roomBelow: "penitentiary8",
  size: { x: 2, y: 8 },
  walls: {
    away: ["loop", "loop"],
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
