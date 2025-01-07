import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary30",
  items: {
    "block@0,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "block@1,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 3, z: 3 },
      type: "block",
    },
    "block@2,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 3, z: 3 },
      type: "block",
    },
    "block@3,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 3, z: 3 },
      type: "block",
    },
    "block@4,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 3, z: 3 },
      type: "block",
    },
    "block@5,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 3, z: 3 },
      type: "block",
    },
    "door@3,4,0": {
      config: { direction: "away", toRoom: "penitentiary28" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
    "portableBlock@0,3,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@7,0,0": {
      config: { style: "sticks" },
      position: { x: 7, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@7,3,0": {
      config: { style: "sticks" },
      position: { x: 7, y: 3, z: 0 },
      type: "portableBlock",
    },
    "teleporter@0,3,4": {
      config: { toRoom: "penitentiary18fish" },
      position: { x: 0, y: 3, z: 4 },
      type: "teleporter",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 4 },
  walls: {
    away: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
      "loop",
    ],
    left: ["loop", "loop", "skeleton", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
