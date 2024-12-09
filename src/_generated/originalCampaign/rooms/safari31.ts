import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "safari31",
  items: {
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    "block@1,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@1,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@2,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 6, z: 0 },
      type: "block",
    },
    "block@7,3,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "block@7,4,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 1 },
      type: "block",
    },
    "charles@6,6,1:13y": {
      config: {},
      position: { x: 6, y: 6, z: 1 },
      type: "charles",
    },
    "deadlyBlock@0,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,1:1D93r4": {
      config: { direction: "right", toRoom: "safari17fish" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@8,3,5:Z140yfX": {
      config: { direction: "left", toRoom: "safari32" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "joystick@0,6,1:Z2siiC8": {
      config: { controls: ["charles@6,6,1:13y"] },
      position: { x: 0, y: 6, z: 1 },
      type: "joystick",
    },
    "joystick@1,5,1:Z2siiC8": {
      config: { controls: ["charles@6,6,1:13y"] },
      position: { x: 1, y: 5, z: 1 },
      type: "joystick",
    },
    "joystick@1,7,1:Z2siiC8": {
      config: { controls: ["charles@6,6,1:13y"] },
      position: { x: 1, y: 7, z: 1 },
      type: "joystick",
    },
    "joystick@2,6,1:Z2siiC8": {
      config: { controls: ["charles@6,6,1:13y"] },
      position: { x: 2, y: 6, z: 1 },
      type: "joystick",
    },
    "portableBlock@4,0,1:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 4, y: 0, z: 1 },
      type: "portableBlock",
    },
  },
  planet: "safari",
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
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
