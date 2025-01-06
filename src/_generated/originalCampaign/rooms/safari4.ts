import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari4",
  items: {
    "baddie@7,4,1:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 1 },
      type: "baddie",
    },
    "block@3,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    "block@3,7,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    "block@7,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,2:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "block@7,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "door@3,0,0:Zj81hn": {
      config: { direction: "towards", toRoom: "safari3" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,5:Z2mYqOi": {
      config: { direction: "away", toRoom: "safari18" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5:LV2Gb": {
      config: { direction: "left", toRoom: "safari5" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
  walls: {
    away: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
