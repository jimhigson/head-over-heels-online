import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus4",
  items: {
    "ball@1,1,3:13y": {
      config: {},
      position: { x: 1, y: 1, z: 3 },
      type: "ball",
    },
    "ball@1,6,3:13y": {
      config: {},
      position: { x: 1, y: 6, z: 3 },
      type: "ball",
    },
    "ball@6,1,3:13y": {
      config: {},
      position: { x: 6, y: 1, z: 3 },
      type: "ball",
    },
    "ball@6,6,3:13y": {
      config: {},
      position: { x: 6, y: 6, z: 3 },
      type: "ball",
    },
    "block@1,1,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,1,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 1 },
      type: "block",
    },
    "block@1,1,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 1, z: 2 },
      type: "block",
    },
    "block@1,6,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,6,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,6,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 1, y: 6, z: 2 },
      type: "block",
    },
    "block@3,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    "block@3,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@4,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@4,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 4, z: 0 },
      type: "block",
    },
    "block@6,1,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,1,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 1 },
      type: "block",
    },
    "block@6,1,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 1, z: 2 },
      type: "block",
    },
    "block@6,6,0:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "block@6,6,1:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 1 },
      type: "block",
    },
    "block@6,6,2:Z1V7JSA": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 6, z: 2 },
      type: "block",
    },
    "door@0,3,0:2mUeYF": {
      config: { direction: "right", toRoom: "egyptus3" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,0:2p0wvd": {
      config: { direction: "away", toRoom: "egyptus5" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
