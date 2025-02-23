import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "penitentiary21",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0": {
      config: { style: "organic", times: { y: 7 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@0,7,6": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 6 },
      type: "block",
    },
    "block@1,1,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@1,7,4": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 1, y: 7, z: 4 },
      type: "block",
    },
    "block@3,7,2": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 7, z: 2 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,1,3": {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 3 },
      type: "block",
    },
    "block@7,2,2": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 2, z: 2 },
      type: "block",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "penitentiary19" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "monster@6,7,1": {
      config: {
        activated: true,
        movement: "clockwise",
        startDirection: "right",
        which: "turtle",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "monster",
    },
    "portableBlock@7,7,1": {
      config: { style: "drum" },
      position: { x: 7, y: 7, z: 1 },
      type: "portableBlock",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary22",
  roomBelow: "penitentiary20",
  size: { x: 8, y: 8, z: 13 },
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
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
