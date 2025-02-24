import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "safari",
  id: "safari10",
  items: {
    "barrier@4,0,0": {
      config: { axis: "y", times: { y: 6, z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    "door@8,2,0": {
      config: { direction: "left", toRoom: "safari11" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    "spring@0,5,0": {
      config: {},
      position: { x: 0, y: 5, z: 0 },
      type: "spring",
    },
  },
  planet: "safari",
  roomAbove: "safari9",
  size: { x: 8, y: 6 },
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
    left: ["wall", "shield", "none", "none", "shield", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
