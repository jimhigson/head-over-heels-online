import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "none",
  id: "safari9",
  items: {
    "block@0,2,3": {
      config: { style: "organic" },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    "block@7,2,3": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,1,2": {
      config: { style: "volcano", times: { x: 8 } },
      position: { x: 0, y: 1, z: 2 },
      type: "deadlyBlock",
    },
    "door@0,2,4": {
      config: { direction: "right", toRoom: "safari8" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    "door@8,2,5": {
      config: { direction: "left", toRoom: "safari14" },
      position: { x: 8, y: 2, z: 5 },
      type: "door",
    },
    "movableBlock@0,1,3": {
      config: {
        activated: "onStand",
        movement: "clockwise",
        startDirection: "left",
        style: "sandwich",
      },
      position: { x: 0, y: 1, z: 3 },
      type: "movableBlock",
    },
  },
  planet: "safari",
  roomBelow: "safari10",
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
