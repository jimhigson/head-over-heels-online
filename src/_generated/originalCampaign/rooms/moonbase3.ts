import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "moonbase3",
  items: {
    "block@1,1,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 2, y: 0, z: 0 },
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
    "charles@7,7,1": {
      config: {},
      position: { x: 7, y: 7, z: 1 },
      type: "charles",
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
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
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
    "movingPlatform@0,7,0": {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "towards",
      },
      position: { x: 0, y: 7, z: 0 },
      type: "movingPlatform",
    },
    "spikes@0,1,0": {
      config: {},
      position: { x: 0, y: 1, z: 0 },
      type: "spikes",
    },
    "spikes@1,4,1": {
      config: { times: { x: 2 } },
      position: { x: 1, y: 4, z: 1 },
      type: "spikes",
    },
    "spikes@7,7,0": {
      config: {},
      position: { x: 7, y: 7, z: 0 },
      type: "spikes",
    },
    "spring@4,7,0": {
      config: {},
      position: { x: 4, y: 7, z: 0 },
      type: "spring",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["window3", "coil", "window2"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["window2", "coil", "window1"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
