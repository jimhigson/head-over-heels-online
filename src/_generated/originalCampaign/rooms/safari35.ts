import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "none",
  id: "safari35",
  items: {
    "block@0,3,0": {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@7,7,0": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "safari36" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "movableBlock@7,5,1": {
      config: {
        activated: "onStand",
        movement: "clockwise",
        startDirection: "right",
        style: "sandwich",
      },
      position: { x: 7, y: 5, z: 1 },
      type: "movableBlock",
    },
  },
  planet: "safari",
  roomBelow: "safari34",
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
