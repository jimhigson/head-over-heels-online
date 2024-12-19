import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "safari2",
  items: {
    "block@3,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,7,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    "block@4,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,7,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 1 },
      type: "block",
    },
    "block@7,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,0,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,1,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,7,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,0,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "door@3,0,1:Zj81MS": {
      config: { direction: "towards", toRoom: "safari1" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,3:1Sooxy": {
      config: { direction: "away", toRoom: "safari3" },
      position: { x: 3, y: 8, z: 3 },
      type: "door",
    },
    "movableBlock@7,1,0:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 7, y: 1, z: 0 },
      type: "movableBlock",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
  walls: {
    away: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
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
