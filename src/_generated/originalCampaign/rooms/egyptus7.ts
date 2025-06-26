import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus7",
  items: {
    barrierForAnalogue: {
      config: { axis: "x", times: { x: 2, z: 3 } },
      position: { x: 3, y: 0.5, z: 4 },
      type: "barrier",
    },
    barrierForAnalogue2: {
      config: { axis: "y", times: { z: 3 } },
      position: { x: 4.5, y: 0, z: 4 },
      type: "barrier",
    },
    barrierForAnalogue3: {
      config: { axis: "y", times: { y: 2, z: 3 } },
      position: { x: 6.5, y: 3, z: 4 },
      type: "barrier",
    },
    barrierForAnalogue4: {
      config: { axis: "x", times: { z: 3 } },
      position: { x: 7, y: 2.5, z: 4 },
      type: "barrier",
    },
    "block@0,0,3": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "block@0,5,3": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 3 },
      type: "block",
    },
    "block@0,7,3": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@2,7,3": {
      config: { style: "organic" },
      position: { x: 2, y: 7, z: 3 },
      type: "block",
    },
    "block@3,0,3": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "block@7,3,3": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 3 },
      type: "block",
    },
    "block@7,7,3": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 3 },
      type: "block",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "egyptus5" },
      position: { x: 3, y: 0, z: 4 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "egyptus8" },
      position: { x: 8, y: 3, z: 4 },
      type: "door",
    },
    "extrablock0@0,0,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "extrablock0@0,5,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "extrablock0@0,7,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "extrablock0@2,7,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    "extrablock0@3,0,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "extrablock0@4,0,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "extrablock0@7,3,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "extrablock0@7,4,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "extrablock0@7,7,3": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 7, y: 7, z: 0 },
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
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
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
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
