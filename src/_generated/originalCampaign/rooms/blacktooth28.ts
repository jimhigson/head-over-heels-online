import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  floorSkip: [],
  id: "blacktooth28",
  items: {
    "block@5,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    "block@5,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    "block@6,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "block@7,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "block@7,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "block@7,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    "block@7,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "charles@3,4,0:13y": {
      config: {},
      position: { x: 3, y: 4, z: 0 },
      type: "charles",
    },
    "conveyor@0,7,2:cVr4l": {
      config: { direction: "right" },
      position: { x: 0, y: 7, z: 2 },
      type: "conveyor",
    },
    "conveyor@1,7,2:cVr4l": {
      config: { direction: "right" },
      position: { x: 1, y: 7, z: 2 },
      type: "conveyor",
    },
    "conveyor@2,7,2:cVr4l": {
      config: { direction: "right" },
      position: { x: 2, y: 7, z: 2 },
      type: "conveyor",
    },
    "door@8,3,2:UNV6q": {
      config: { direction: "left", toRoom: "blacktooth27fish" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "joystick@6,1,1:yr4IR": {
      config: { controls: ["charles@3,4,0:13y"] },
      position: { x: 6, y: 1, z: 1 },
      type: "joystick",
    },
    "pickup@2,7,7:Zki5mP": {
      config: { gives: "bag" },
      position: { x: 2, y: 7, z: 7 },
      type: "pickup",
    },
    "portableBlock@1,7,0:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 1, y: 7, z: 0 },
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
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
