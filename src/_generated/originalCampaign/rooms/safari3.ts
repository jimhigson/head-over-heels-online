import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "deadly",
  id: "safari3",
  items: {
    "block@1,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@2,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    "door@1,0,5:Zj81x8": {
      config: { direction: "towards", toRoom: "safari2" },
      position: { x: 1, y: 0, z: 5 },
      type: "door",
    },
    "door@1,8,5:1SooNj": {
      config: { direction: "away", toRoom: "safari4" },
      position: { x: 1, y: 8, z: 5 },
      type: "door",
    },
    "lift@1,4,0:ZTwqo1": {
      config: { bottom: 0, top: 8 },
      position: { x: 1, y: 4, z: 0 },
      type: "lift",
    },
  },
  planet: "safari",
  size: { x: 4, y: 8 },
  walls: {
    away: ["wall", "none", "none", "wall"],
    left: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
