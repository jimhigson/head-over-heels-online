import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth85",
  items: {
    "block@3,0,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    "block@3,4,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@3,4,1": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 1 },
      type: "block",
    },
    "block@3,4,2": {
      config: { disappearing: false, style: "tower" },
      position: { x: 3, y: 4, z: 2 },
      type: "block",
    },
    "block@3,4,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 3 },
      type: "block",
    },
    "block@3,4,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 4 },
      type: "block",
    },
    "block@4,0,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 4 },
      type: "block",
    },
    "door@3,0,5": {
      config: { direction: "towards", toRoom: "blacktooth86" },
      position: { x: 3, y: 0, z: 5 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth84" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "monster@0,7,1": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    "portableBlock@0,7,0": {
      config: { style: "cube" },
      position: { x: 0, y: 7, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,4,5": {
      config: { style: "cube" },
      position: { x: 3, y: 4, z: 5 },
      type: "portableBlock",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
