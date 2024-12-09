import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "none",
  floorSkip: [],
  id: "safari35",
  items: {
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@7,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,1:Z2p4sk5": {
      config: { direction: "right", toRoom: "safari36" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "movableBlock@7,5,1:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 7, y: 5, z: 1 },
      type: "movableBlock",
    },
  },
  planet: "safari",
  roomBelow: "safari34",
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
