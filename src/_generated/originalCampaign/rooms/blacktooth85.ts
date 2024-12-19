import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth85",
  items: {
    "baddie@0,7,1:Z1ubuHg": {
      config: { activated: true, which: "monkey" },
      position: { x: 0, y: 7, z: 1 },
      type: "baddie",
    },
    "block@3,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    "block@3,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@3,4,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 1 },
      type: "block",
    },
    "block@3,4,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 3, y: 4, z: 2 },
      type: "block",
    },
    "block@3,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 3 },
      type: "block",
    },
    "block@3,4,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 4 },
      type: "block",
    },
    "block@4,0,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 4 },
      type: "block",
    },
    "door@3,0,5:Z1V7fAA": {
      config: { direction: "towards", toRoom: "blacktooth86" },
      position: { x: 3, y: 0, z: 5 },
      type: "door",
    },
    "door@8,3,0:ZUC96m": {
      config: { direction: "left", toRoom: "blacktooth84" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "portableBlock@0,7,0:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 0, y: 7, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,4,5:Z1UEQTQ": {
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
