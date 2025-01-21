import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "safari",
  id: "safari37crown",
  items: {
    "block@0,2,0": {
      config: { style: "organic" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,4,0": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,7,1": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    "block@0,7,2": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    "block@0,7,3": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@0,7,4": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    "block@0,7,5": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 5 },
      type: "block",
    },
    "block@1,2,0": {
      config: { style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "block@1,4,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "block@2,2,0": {
      config: { style: "organic" },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    "block@2,4,0": {
      config: { style: "organic" },
      position: { x: 2, y: 4, z: 0 },
      type: "block",
    },
    "block@3,2,0": {
      config: { style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "block@3,4,0": {
      config: { style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@4,2,0": {
      config: { style: "organic" },
      position: { x: 4, y: 2, z: 0 },
      type: "block",
    },
    "block@4,4,0": {
      config: { style: "organic" },
      position: { x: 4, y: 4, z: 0 },
      type: "block",
    },
    "block@5,2,0": {
      config: { style: "organic" },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    "block@5,4,0": {
      config: { style: "organic" },
      position: { x: 5, y: 4, z: 0 },
      type: "block",
    },
    "block@6,2,0": {
      config: { style: "organic" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "block@6,3,0": {
      config: { style: "tower" },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    "block@6,3,1": {
      config: { style: "tower" },
      position: { x: 6, y: 3, z: 1 },
      type: "block",
    },
    "block@6,3,2": {
      config: { style: "tower" },
      position: { x: 6, y: 3, z: 2 },
      type: "block",
    },
    "block@6,4,0": {
      config: { style: "organic" },
      position: { x: 6, y: 4, z: 0 },
      type: "block",
    },
    "block@7,2,0": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,4,0": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "safari33" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "monster@7,2,1": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 7, y: 2, z: 1 },
      type: "monster",
    },
    "movableBlock@0,7,6": {
      config: {
        activated: false,
        movement: "clockwise",
        startDirection: "right",
        style: "stepStool",
      },
      position: { x: 0, y: 7, z: 6 },
      type: "movableBlock",
    },
    "movableBlock@3,5,0": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 3, y: 5, z: 0 },
      type: "movableBlock",
    },
    "pickup@0,7,7": {
      config: { gives: "crown", planet: "safari" },
      position: { x: 0, y: 7, z: 7 },
      type: "pickup",
    },
    "portableBlock@7,3,1": {
      config: { style: "drum" },
      position: { x: 7, y: 3, z: 1 },
      type: "portableBlock",
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
