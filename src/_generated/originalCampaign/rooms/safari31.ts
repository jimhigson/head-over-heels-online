import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "deadly",
  id: "safari31",
  items: {
    "block@0,3,0": {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@1,5,0": {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@2,6,0": {
      config: { style: "organic" },
      position: { x: 2, y: 6, z: 0 },
      type: "block",
    },
    "block@7,3,1": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "charles@6,6,1": {
      config: {},
      position: { x: 6, y: 6, z: 1 },
      type: "charles",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "volcano", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,1,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "safari17fish" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "safari32" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "joystick@0,6,1": {
      config: { controls: ["charles@6,6,1"] },
      position: { x: 0, y: 6, z: 1 },
      type: "joystick",
    },
    "joystick@1,5,1": {
      config: { controls: ["charles@6,6,1"] },
      position: { x: 1, y: 5, z: 1 },
      type: "joystick",
    },
    "joystick@1,7,1": {
      config: { controls: ["charles@6,6,1"] },
      position: { x: 1, y: 7, z: 1 },
      type: "joystick",
    },
    "joystick@2,6,1": {
      config: { controls: ["charles@6,6,1"] },
      position: { x: 2, y: 6, z: 1 },
      type: "joystick",
    },
    "portableBlock@4,0,1": {
      config: { style: "drum" },
      position: { x: 4, y: 0, z: 1 },
      type: "portableBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["wall", "shield", "wall"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["wall", "window", "wall"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
