import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus9fish",
  items: {
    "block@2,0,4": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    "block@3,1,4": {
      config: { style: "organic", times: { y: 7 } },
      position: { x: 3, y: 1, z: 4 },
      type: "block",
    },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "egyptus8" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "egyptus10" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    extrapillar: {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    extrapillar2: {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "pickup@3,3,5": {
      config: { gives: "reincarnation" },
      position: { x: 3, y: 3, z: 5 },
      type: "pickup",
    },
    "portableBlock@0,7,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 7, z: 0 },
      type: "portableBlock",
    },
    "teleporter@2,0,5": {
      config: { toPosition: { x: 4, y: 0, z: 5 }, toRoom: "egyptus13" },
      position: { x: 2, y: 0, z: 5 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["hieroglyphics"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["hieroglyphics"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
        ],
        times: { y: 8 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
