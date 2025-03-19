import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth85",
  items: {
    "block@3,0,4": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    "block@3,4,0": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@3,4,2": {
      config: { style: "tower" },
      position: { x: 3, y: 4, z: 2 },
      type: "block",
    },
    "block@3,4,3": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 4, z: 3 },
      type: "block",
    },
    "door@3,0,5": {
      config: { direction: "towards", toRoom: "blacktooth86" },
      position: { x: 3, y: 0, z: 5 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth84" },
      position: { x: 8, y: 6, z: 0 },
      type: "door",
    },
    "monster@0,7,1": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 0, y: 7, z: 1 },
      type: "monster",
    },
    "portableBlock@0,7,0": {
      config: { style: "cube" },
      position: { x: 0, y: 7, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,4,5": {
      config: { style: "cube" },
      position: { x: 3, y: 4, z: 5 },
      type: "portableBlock",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
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
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain", "plain", "plain", "plain"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
