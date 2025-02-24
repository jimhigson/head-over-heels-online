import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "penitentiary31",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 6, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "portableBlock@1,1,1": {
      config: { style: "sticks" },
      position: { x: 1, y: 1, z: 1 },
      type: "portableBlock",
    },
    "slidingDeadly@5,0,1": {
      config: { style: "puck" },
      position: { x: 5, y: 0, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,0,2": {
      config: { style: "puck" },
      position: { x: 5, y: 0, z: 2 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,1,1": {
      config: { style: "puck" },
      position: { x: 5, y: 1, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,1,2": {
      config: { style: "puck" },
      position: { x: 5, y: 1, z: 2 },
      type: "slidingDeadly",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary30",
  roomBelow: "penitentiary32",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
    left: ["loop", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
