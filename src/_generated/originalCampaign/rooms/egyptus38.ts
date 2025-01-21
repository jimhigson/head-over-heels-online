import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus38",
  items: {
    "ball@1,1,3": { config: {}, position: { x: 1, y: 1, z: 3 }, type: "ball" },
    "ball@1,6,3": { config: {}, position: { x: 1, y: 6, z: 3 }, type: "ball" },
    "ball@6,1,3": { config: {}, position: { x: 6, y: 1, z: 3 }, type: "ball" },
    "ball@6,6,3": { config: {}, position: { x: 6, y: 6, z: 3 }, type: "ball" },
    "block@1,1,0": {
      config: { style: "tower" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,1,1": {
      config: { style: "tower" },
      position: { x: 1, y: 1, z: 1 },
      type: "block",
    },
    "block@1,1,2": {
      config: { style: "tower" },
      position: { x: 1, y: 1, z: 2 },
      type: "block",
    },
    "block@1,6,0": {
      config: { style: "tower" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,6,1": {
      config: { style: "tower" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,6,2": {
      config: { style: "tower" },
      position: { x: 1, y: 6, z: 2 },
      type: "block",
    },
    "block@6,1,0": {
      config: { style: "tower" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,1,1": {
      config: { style: "tower" },
      position: { x: 6, y: 1, z: 1 },
      type: "block",
    },
    "block@6,1,2": {
      config: { style: "tower" },
      position: { x: 6, y: 1, z: 2 },
      type: "block",
    },
    "block@6,6,0": {
      config: { style: "tower" },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "block@6,6,1": {
      config: { style: "tower" },
      position: { x: 6, y: 6, z: 1 },
      type: "block",
    },
    "block@6,6,2": {
      config: { style: "tower" },
      position: { x: 6, y: 6, z: 2 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "egyptus37" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "egyptus39crown" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    scroll: {
      config: {
        gives: "scroll",
        page: "teleportBack",
      },
      position: { x: 5, y: 6, z: 6 },
      type: "pickup",
    },
    "teleporter@3,3,0": {
      config: { toPosition: { x: 3, y: 3, z: 0 }, toRoom: "egyptus4" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0": {
      config: { toPosition: { x: 3, y: 4, z: 0 }, toRoom: "egyptus4" },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,3,0": {
      config: { toPosition: { x: 4, y: 3, z: 0 }, toRoom: "egyptus4" },
      position: { x: 4, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@4,4,0": {
      config: { toPosition: { x: 4, y: 4, z: 0 }, toRoom: "egyptus4" },
      position: { x: 4, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
