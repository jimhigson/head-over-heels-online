import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "safari",
  id: "safari32",
  items: {
    "door@0,0,0:Z2p4tBQ": {
      config: { direction: "right", toRoom: "safari31" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:Z140y0d": {
      config: { direction: "left", toRoom: "safari33" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
