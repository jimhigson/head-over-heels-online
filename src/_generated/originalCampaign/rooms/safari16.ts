import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari16",
  items: {
    "baddie@2,6,0:Z1feWja": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "towards",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 2, y: 6, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@0,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0:rjqXy": {
      config: { direction: "towards", toRoom: "safari15" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0:1GdPGM": {
      config: { direction: "away", toRoom: "safari17fish" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 4, y: 8 },
  walls: {
    away: ["wall", "none", "none", "wall"],
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
