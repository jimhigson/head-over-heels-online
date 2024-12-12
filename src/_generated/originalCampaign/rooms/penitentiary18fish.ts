import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  floorSkip: [],
  id: "penitentiary18fish",
  items: {
    "block@0,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    "block@1,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 4, z: 3 },
      type: "block",
    },
    "block@10,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 10, y: 4, z: 3 },
      type: "block",
    },
    "block@11,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 11, y: 4, z: 3 },
      type: "block",
    },
    "block@12,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 12, y: 4, z: 3 },
      type: "block",
    },
    "block@13,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 13, y: 4, z: 3 },
      type: "block",
    },
    "block@14,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 14, y: 4, z: 3 },
      type: "block",
    },
    "block@15,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 15, y: 4, z: 3 },
      type: "block",
    },
    "block@2,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 4, z: 3 },
      type: "block",
    },
    "block@3,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 3 },
      type: "block",
    },
    "block@4,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 4, z: 3 },
      type: "block",
    },
    "block@5,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 4, z: 3 },
      type: "block",
    },
    "block@6,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 4, z: 3 },
      type: "block",
    },
    "block@7,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    "block@8,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 8, y: 4, z: 3 },
      type: "block",
    },
    "block@9,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 9, y: 4, z: 3 },
      type: "block",
    },
    "door@16,2,2:2uBTz0": {
      config: { direction: "left", toRoom: "penitentiary12" },
      position: { x: 16, y: 2, z: 2 },
      type: "door",
    },
    "door@3,0,0:Z4Y4dC": {
      config: { direction: "towards", toRoom: "penitentiary17" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "pickup@12,4,4:ZPJAGD": {
      config: { gives: "reincarnation" },
      position: { x: 12, y: 4, z: 4 },
      type: "pickup",
    },
    "portableBlock@11,1,0:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 11, y: 1, z: 0 },
      type: "portableBlock",
    },
    "teleporter@0,4,4:Z2oeKm1": {
      config: { toRoom: "penitentiary30" },
      position: { x: 0, y: 4, z: 4 },
      type: "teleporter",
    },
    "teleporter@15,4,4:2czX9h": {
      config: { toRoom: "penitentiary34crown" },
      position: { x: 15, y: 4, z: 4 },
      type: "teleporter",
    },
  },
  planet: "penitentiary",
  size: { x: 16, y: 6 },
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
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
    left: ["loop", "loop", "none", "none", "loop", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
