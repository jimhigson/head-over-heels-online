import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "safari",
  id: "safari14",
  items: {
    "block@3,7,1": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    "block@4,6,0": {
      config: { style: "organic" },
      position: { x: 4, y: 6, z: 0 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari9" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "safari13" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "pickup@4,7,0": {
      config: { gives: "jumps" },
      position: { x: 4, y: 7, z: 0 },
      type: "pickup",
    },
    "portableBlock@4,7,2": {
      config: { style: "drum" },
      position: { x: 4, y: 7, z: 2 },
      type: "portableBlock",
    },
    "slidingDeadly@3,7,0": {
      config: { style: "puck" },
      position: { x: 3, y: 7, z: 0 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,7,0": {
      config: { style: "puck" },
      position: { x: 5, y: 7, z: 0 },
      type: "slidingDeadly",
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
