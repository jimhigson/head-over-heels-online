import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari33",
  items: {
    "baddie@4,4,0:Z2qiM0z": {
      config: { activated: true, which: "elephant" },
      position: { x: 4, y: 4, z: 0 },
      type: "baddie",
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
    "door@0,3,0:Z2p4tm6": {
      config: { direction: "right", toRoom: "safari32" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,5:ZqJYTY": {
      config: { direction: "away", toRoom: "safari37crown" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5:Z140xJs": {
      config: { direction: "left", toRoom: "safari34" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "movableBlock@1,1,0:Z15GVb5": {
      config: { style: "anvil" },
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
