import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "penitentiary27",
  items: {
    "block@0,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@7,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "deadlyBlock@3,0,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,0,1:1QJMd2": {
      config: { direction: "right", toRoom: "penitentiary28" },
      position: { x: 0, y: 0, z: 1 },
      type: "door",
    },
    "door@8,0,2:2uC3Bo": {
      config: { direction: "left", toRoom: "penitentiary26" },
      position: { x: 8, y: 0, z: 2 },
      type: "door",
    },
    "movableBlock@6,0,0:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 6, y: 0, z: 0 },
      type: "movableBlock",
    },
  },
  planet: "penitentiary",
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
