import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "penitentiary23",
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
    "block@1,7,0": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
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
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 4, y: 6, z: 0 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "lift@4,3,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 4, y: 3, z: 0 },
      type: "lift",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary24",
  roomBelow: "penitentiary22",
  size: { x: 8, y: 8 },
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
