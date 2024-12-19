import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth81",
  items: {
    "baddie@6,7,1:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 6, y: 7, z: 1 },
      type: "baddie",
    },
    "block@0,7,2:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 2 },
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
    "charles@0,7,3:13y": {
      config: {},
      position: { x: 0, y: 7, z: 3 },
      type: "charles",
    },
    "door@3,0,0:Z1V7h97": {
      config: { direction: "towards", toRoom: "blacktooth80" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,3,5:ZUC9BR": {
      config: { direction: "left", toRoom: "blacktooth82" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "joystick@1,2,0:vjcmz": {
      config: { controls: ["charles@0,7,3:13y"] },
      position: { x: 1, y: 2, z: 0 },
      type: "joystick",
    },
    "joystick@1,5,0:vjcmz": {
      config: { controls: ["charles@0,7,3:13y"] },
      position: { x: 1, y: 5, z: 0 },
      type: "joystick",
    },
    "joystick@4,2,0:vjcmz": {
      config: { controls: ["charles@0,7,3:13y"] },
      position: { x: 4, y: 2, z: 0 },
      type: "joystick",
    },
    "joystick@4,5,0:vjcmz": {
      config: { controls: ["charles@0,7,3:13y"] },
      position: { x: 4, y: 5, z: 0 },
      type: "joystick",
    },
    "movableBlock@6,7,0:Z15GVb5": {
      config: { style: "anvil" },
      position: { x: 6, y: 7, z: 0 },
      type: "movableBlock",
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
