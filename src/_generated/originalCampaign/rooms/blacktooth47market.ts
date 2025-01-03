import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth47market",
  items: {
    "block@0,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@1,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "block@2,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 1, z: 0 },
      type: "block",
    },
    "block@3,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@4,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@5,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 6, z: 0 },
      type: "block",
    },
    "block@5,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "block@6,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 5, z: 0 },
      type: "block",
    },
    "block@6,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "block@6,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    "block@7,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    "charles@0,7,0:13y": {
      config: {},
      position: { x: 0, y: 7, z: 0 },
      type: "charles",
    },
    "door@3,0,1:BbplW": {
      config: { direction: "towards", toRoom: "blacktooth46market" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,2:YmisE": {
      config: { direction: "away", toRoom: "blacktooth48market" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    "joystick@0,1,1:ZA6jib": {
      config: { controls: ["charles@0,7,0:13y"] },
      position: { x: 0, y: 1, z: 1 },
      type: "joystick",
    },
    "joystick@1,0,1:ZA6jib": {
      config: { controls: ["charles@0,7,0:13y"] },
      position: { x: 1, y: 0, z: 1 },
      type: "joystick",
    },
    "joystick@1,2,1:ZA6jib": {
      config: { controls: ["charles@0,7,0:13y"] },
      position: { x: 1, y: 2, z: 1 },
      type: "joystick",
    },
    "joystick@2,1,1:ZA6jib": {
      config: { controls: ["charles@0,7,0:13y"] },
      position: { x: 2, y: 1, z: 1 },
      type: "joystick",
    },
    "joystick@5,6,1:ZA6jib": {
      config: { controls: ["charles@0,7,0:13y"] },
      position: { x: 5, y: 6, z: 1 },
      type: "joystick",
    },
    "joystick@6,5,1:ZA6jib": {
      config: { controls: ["charles@0,7,0:13y"] },
      position: { x: 6, y: 5, z: 1 },
      type: "joystick",
    },
    "joystick@6,7,1:ZA6jib": {
      config: { controls: ["charles@0,7,0:13y"] },
      position: { x: 6, y: 7, z: 1 },
      type: "joystick",
    },
    "joystick@7,6,1:ZA6jib": {
      config: { controls: ["charles@0,7,0:13y"] },
      position: { x: 7, y: 6, z: 1 },
      type: "joystick",
    },
  },
  planet: "market",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "passage",
      "more-fruits",
      "fruits",
      "none",
      "none",
      "more-fruits",
      "fruits",
      "passage",
    ],
    left: [
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
    ],
  },
}) satisfies RoomJson<"market", OriginalCampaignRoomId>;
