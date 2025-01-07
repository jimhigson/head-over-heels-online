import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "deadly",
  id: "penitentiary3",
  items: {
    "block@0,3,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@4,7,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,4,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "deadlyBlock@7,1,0": {
      config: { style: "toaster" },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,1,1": {
      config: { style: "toaster" },
      position: { x: 7, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "penitentiary2" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "penitentiary4" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "movableBlock@0,1,0": {
      config: {
        activated: false,
        movement: "clockwise",
        startDirection: "left",
        style: "sandwich",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "movableBlock",
    },
    "switch@0,0,0": {
      config: {
        activates: {
          "movableBlock@0,1,0": {
            left: { activated: false },
            right: { activated: true },
          },
          "switch@7,7,0": {
            left: { setting: "left" },
            right: { setting: "right" },
          },
        },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "switch",
    },
    "switch@7,7,0": {
      config: {
        activates: {
          "movableBlock@0,1,0": {
            left: { activated: false },
            right: { activated: true },
          },
          "switch@0,0,0": {
            left: { setting: "left" },
            right: { setting: "right" },
          },
        },
      },
      position: { x: 7, y: 7, z: 0 },
      type: "switch",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
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
    left: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
