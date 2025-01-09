import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "none",
  id: "safari13",
  items: {
    "block@0,3,0": {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,5,0": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@1,5,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@3,5,0": {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@5,5,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "block@7,5,0": {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "door@0,2,2": {
      config: { direction: "right", toRoom: "safari14" },
      position: { x: 0, y: 2, z: 2 },
      type: "door",
    },
    "door@3,6,2": {
      config: { direction: "away", toRoom: "safari15" },
      position: { x: 3, y: 6, z: 2 },
      type: "door",
    },
  },
  planet: "safari",
  roomBelow: "safari12",
  size: { x: 8, y: 6 },
  walls: {
    away: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
    left: ["shield", "wall", "window", "window", "wall", "shield"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
