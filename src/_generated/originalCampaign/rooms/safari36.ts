import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "none",
  id: "safari36",
  items: {
    "block@4,3,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@4,4,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 4, y: 4, z: 0 },
      type: "block",
    },
    "block@4,5,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "block@4,6,0": {
      config: { style: "organic" },
      position: { x: 4, y: 6, z: 0 },
      type: "block",
    },
    "block@6,3,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "deadlyBlock@4,3,1": {
      config: { style: "spikes" },
      position: { x: 4, y: 3, z: 1 },
      type: "deadlyBlock",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "safari35" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
  },
  planet: "safari",
  roomBelow: "safari33",
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
