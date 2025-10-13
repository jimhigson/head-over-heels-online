import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus7",
  items: {
    block: {
      config: { style: "tower", times: { x: 2, y: 2, z: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,0,3": {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "block@0,5,3": {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 0, y: 6, z: 3 },
      type: "block",
    },
    "block@7,3,3": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    "block@7,7,3": {
      config: { style: "organic", times: { x: 2, y: 2 } },
      position: { x: 6, y: 6, z: 3 },
      type: "block",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "egyptus5" },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "egyptus8" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    "extrablock0@0,5,3": {
      config: { style: "tower", times: { x: 2, y: 2, z: 3 } },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    "extrablock0@7,3,3": {
      config: { style: "tower", times: { y: 2, z: 3 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "extrablock0@7,7,3": {
      config: { style: "tower", times: { x: 2, y: 2, z: 3 } },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
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
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    wall_2: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    wall_3: {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 8, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
