import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "deadly",
  id: "safari18",
  items: {
    "block@0,0,2": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    "block@0,1,2": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 1, z: 2 },
      type: "block",
    },
    "block@0,2,2": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 2 },
      type: "block",
    },
    "block@0,3,2": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 2 },
      type: "block",
    },
    "block@1,10,0": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    "block@1,11,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 11, z: 0 },
      type: "block",
    },
    "block@1,12,0": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    "block@1,13,0": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 13, z: 0 },
      type: "block",
    },
    "block@1,14,0": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 14, z: 0 },
      type: "block",
    },
    "block@1,15,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 15, z: 0 },
      type: "block",
    },
    "block@1,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@1,6,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,7,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@1,8,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 8, z: 0 },
      type: "block",
    },
    "block@1,9,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 9, z: 0 },
      type: "block",
    },
    "door@0,0,3": {
      config: { direction: "towards", toRoom: "safari4" },
      position: { x: 0, y: 0, z: 3 },
      type: "door",
    },
    "door@0,16,2": {
      config: { direction: "away", toRoom: "safari19triple" },
      position: { x: 0, y: 16, z: 2 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 2, y: 16 },
  walls: {
    away: ["none", "none"],
    left: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
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
