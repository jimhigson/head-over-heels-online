import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "deadly",
  id: "moonbase3",
  items: {
    "block@1,1,0": {
      config: { style: "organic" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,1,0": {
      config: { style: "organic" },
      position: { x: 2, y: 1, z: 0 },
      type: "block",
    },
    "block@2,2,0": {
      config: { style: "organic" },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    "block@2,4,0": {
      config: { style: "organic" },
      position: { x: 2, y: 4, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,1,0": {
      config: { style: "organic" },
      position: { x: 3, y: 1, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "charles@7,7,1": {
      config: {},
      position: { x: 7, y: 7, z: 1 },
      type: "charles",
    },
    "deadlyBlock@0,1,0": {
      config: { style: "spikes" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,4,1": {
      config: { style: "spikes" },
      position: { x: 1, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,4,1": {
      config: { style: "spikes" },
      position: { x: 2, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,7,0": {
      config: { style: "spikes" },
      position: { x: 7, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "moonbase2" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,2": {
      config: { direction: "away", toRoom: "moonbase13" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    "joystick@1,1,1": {
      config: { controls: ["charles@7,7,1"] },
      position: { x: 1, y: 1, z: 1 },
      type: "joystick",
    },
    "joystick@2,0,1": {
      config: { controls: ["charles@7,7,1"] },
      position: { x: 2, y: 0, z: 1 },
      type: "joystick",
    },
    "joystick@2,2,1": {
      config: { controls: ["charles@7,7,1"] },
      position: { x: 2, y: 2, z: 1 },
      type: "joystick",
    },
    "joystick@3,1,1": {
      config: { controls: ["charles@7,7,1"] },
      position: { x: 3, y: 1, z: 1 },
      type: "joystick",
    },
    "movableBlock@0,7,0": {
      config: {
        activated: false,
        movement: "clockwise",
        startDirection: "towards",
        style: "sandwich",
      },
      position: { x: 0, y: 7, z: 0 },
      type: "movableBlock",
    },
    "spring@4,7,0": {
      config: {},
      position: { x: 4, y: 7, z: 0 },
      type: "spring",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window2",
      "coil",
      "window3",
      "none",
      "none",
      "window3",
      "coil",
      "window1",
    ],
    left: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
