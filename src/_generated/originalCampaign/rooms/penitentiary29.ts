import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "penitentiary29",
  items: {
    "block@2,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 1, z: 0 },
      type: "block",
    },
    "block@3,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 1, z: 0 },
      type: "block",
    },
    "block@4,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 1, z: 0 },
      type: "block",
    },
    "block@5,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    "block@6,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@7,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "door@8,0,3:2uC47T": {
      config: { direction: "left", toRoom: "penitentiary28" },
      position: { x: 8, y: 0, z: 3 },
      type: "door",
    },
    "slidingDeadly@2,0,1:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 2, y: 0, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@2,1,1:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 2, y: 1, z: 1 },
      type: "slidingDeadly",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary30",
  size: { x: 8, y: 2 },
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
    left: ["none", "none"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
