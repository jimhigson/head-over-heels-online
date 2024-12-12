import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  floorSkip: [],
  id: "safari28",
  items: {
    "deadlyBlock@4,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0:Z2p4A4H": {
      config: { direction: "right", toRoom: "safari27" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@8,3,0:Z140Es4": {
      config: { direction: "left", toRoom: "safari29" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "moveableDeadly@4,3,1:Z1nr7Y3": {
      config: { style: "deadFish" },
      position: { x: 4, y: 3, z: 1 },
      type: "moveableDeadly",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
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
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
