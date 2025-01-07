import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari33",
  items: {
    "block@7,3,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,1": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,2": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari32" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "safari37crown" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "safari34" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "monster@4,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "elephant",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    "movableBlock@1,1,0": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 1, y: 1, z: 0 },
      type: "movableBlock",
    },
  },
  planet: "safari",
  roomAbove: "safari36",
  size: { x: 8, y: 8 },
  walls: {
    away: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
