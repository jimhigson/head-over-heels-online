import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth81",
  items: {
    "block@0,7,2": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "charles@0,7,3": {
      config: {},
      position: { x: 0, y: 7, z: 3 },
      type: "charles",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth80" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "blacktooth82" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "joystick@1,2,0": {
      config: { controls: ["charles@0,7,3"] },
      position: { x: 1, y: 2, z: 0 },
      type: "joystick",
    },
    "joystick@1,5,0": {
      config: { controls: ["charles@0,7,3"] },
      position: { x: 1, y: 5, z: 0 },
      type: "joystick",
    },
    "joystick@4,2,0": {
      config: { controls: ["charles@0,7,3"] },
      position: { x: 4, y: 2, z: 0 },
      type: "joystick",
    },
    "joystick@4,5,0": {
      config: { controls: ["charles@0,7,3"] },
      position: { x: 4, y: 5, z: 0 },
      type: "joystick",
    },
    "monster@6,7,1": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 6, y: 7, z: 1 },
      type: "monster",
    },
    "movingPlatform@6,7,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "stepStool",
      },
      position: { x: 6, y: 7, z: 0 },
      type: "movingPlatform",
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
      config: {
        direction: "away",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
