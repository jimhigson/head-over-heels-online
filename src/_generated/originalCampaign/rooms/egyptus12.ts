import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "egyptus",
  id: "egyptus12",
  items: {
    "block@2,3,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 2, y: 3, z: 0 },
      type: "block",
    },
    "block@3,2,0": {
      config: { style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "block@3,4,0": {
      config: { style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "charles@7,2,1": {
      config: {},
      position: { x: 7, y: 2, z: 1 },
      type: "charles",
    },
    "deadlyBlock@6,4,3": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 6, y: 4, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,1,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,1,3": {
      config: { style: "volcano", times: { y: 3 } },
      position: { x: 7, y: 1, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,3": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 7, y: 5, z: 3 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "egyptus11" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "egyptus13" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "joystick@2,3,1": {
      config: { controls: ["charles@7,2,1"] },
      position: { x: 2, y: 3, z: 1 },
      type: "joystick",
    },
    "joystick@3,2,1": {
      config: { controls: ["charles@7,2,1"] },
      position: { x: 3, y: 2, z: 1 },
      type: "joystick",
    },
    "joystick@3,4,1": {
      config: { controls: ["charles@7,2,1"] },
      position: { x: 3, y: 4, z: 1 },
      type: "joystick",
    },
    "joystick@4,3,1": {
      config: { controls: ["charles@7,2,1"] },
      position: { x: 4, y: 3, z: 1 },
      type: "joystick",
    },
    "lift@7,0,0": {
      config: { bottom: 0, top: 8 },
      position: { x: 7, y: 0, z: 0 },
      type: "lift",
    },
    "movableBlock@6,4,4": {
      config: { movement: "free", style: "sandwich" },
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
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
