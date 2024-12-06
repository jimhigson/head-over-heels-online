import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "green", shade: "basic" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus12",
  items: {
    "block@2,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 3, z: 0 },
      type: "block",
    },
    "block@3,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 2, z: 0 },
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
    "charles@7,2,1:13y": {
      config: {},
      position: { x: 7, y: 2, z: 1 },
      type: "charles",
    },
    "deadlyBlock@6,4,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 4, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,1,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 1, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 2, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,4,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 4, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 5, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,6,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 6, z: 3 },
      type: "deadlyBlock",
    },
    "door@0,3,0:2rMnv7": {
      config: { direction: "right", toRoom: "egyptus11" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,5:Z1yI6Li": {
      config: { direction: "away", toRoom: "egyptus13" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "joystick@2,3,1:Z1ncwev": {
      config: { controls: ["charles@7,2,1:13y"] },
      position: { x: 2, y: 3, z: 1 },
      type: "joystick",
    },
    "joystick@3,2,1:Z1ncwev": {
      config: { controls: ["charles@7,2,1:13y"] },
      position: { x: 3, y: 2, z: 1 },
      type: "joystick",
    },
    "joystick@3,4,1:Z1ncwev": {
      config: { controls: ["charles@7,2,1:13y"] },
      position: { x: 3, y: 4, z: 1 },
      type: "joystick",
    },
    "joystick@4,3,1:Z1ncwev": {
      config: { controls: ["charles@7,2,1:13y"] },
      position: { x: 4, y: 3, z: 1 },
      type: "joystick",
    },
    "lift@7,0,0:ZTwqo1": {
      config: { bottom: 0, top: 8 },
      position: { x: 7, y: 0, z: 0 },
      type: "lift",
    },
    "movableBlock@6,4,4:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 6, y: 4, z: 4 },
      type: "movableBlock",
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
} satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
