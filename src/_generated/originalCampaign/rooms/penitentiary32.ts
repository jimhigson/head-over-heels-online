import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  floorSkip: [],
  id: "penitentiary32",
  items: {
    "baddie@0,1,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 0, y: 1, z: 0 },
      type: "baddie",
    },
    "block@2,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    "block@2,1,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 1, z: 4 },
      type: "block",
    },
    "block@3,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    "block@3,1,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 1, z: 4 },
      type: "block",
    },
    "block@4,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 4 },
      type: "block",
    },
    "block@4,1,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 1, z: 4 },
      type: "block",
    },
    "block@5,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 0, z: 4 },
      type: "block",
    },
    "block@5,1,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 1, z: 4 },
      type: "block",
    },
    "block@6,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 0, z: 4 },
      type: "block",
    },
    "block@6,1,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 1, z: 4 },
      type: "block",
    },
    "block@7,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 4 },
      type: "block",
    },
    "block@7,1,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 4 },
      type: "block",
    },
    "door@3,0,0:Z4XOeS": {
      config: { direction: "towards", toRoom: "penitentiary33" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "slidingDeadly@2,0,5:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 2, y: 0, z: 5 },
      type: "slidingDeadly",
    },
    "slidingDeadly@2,1,5:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 2, y: 1, z: 5 },
      type: "slidingDeadly",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary31",
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
