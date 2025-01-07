import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "deadly",
  id: "safari24",
  items: {
    "block@1,2,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "block@7,2,1": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 1 },
      type: "block",
    },
    "deadlyBlock@4,0,1": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,1,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,1,1": {
      config: { style: "volcano" },
      position: { x: 4, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,4,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,4,1": {
      config: { style: "volcano" },
      position: { x: 4, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,1": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,2,1": {
      config: { direction: "right", toRoom: "safari25" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    "door@8,2,3": {
      config: { direction: "left", toRoom: "safari23" },
      position: { x: 8, y: 2, z: 3 },
      type: "door",
    },
    "movableBlock@0,2,0": {
      config: {
        activated: false,
        movement: "clockwise",
        startDirection: "left",
        style: "sandwich",
      },
      position: { x: 0, y: 2, z: 0 },
      type: "movableBlock",
    },
  },
  planet: "safari",
  size: { x: 8, y: 6 },
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
    left: ["wall", "shield", "none", "none", "shield", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
