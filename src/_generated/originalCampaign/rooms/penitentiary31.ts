import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "penitentiary31",
  items: {
    "block@0,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@1,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
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
    "portableBlock@1,1,1:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 1, y: 1, z: 1 },
      type: "portableBlock",
    },
    "slidingDeadly@5,0,1:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 5, y: 0, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,0,2:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 5, y: 0, z: 2 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,1,1:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 5, y: 1, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,1,2:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 5, y: 1, z: 2 },
      type: "slidingDeadly",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary30",
  roomBelow: "penitentiary32",
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
    left: ["loop", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
