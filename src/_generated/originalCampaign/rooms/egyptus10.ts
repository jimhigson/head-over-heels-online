import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "egyptus10",
  items: {
    barrier: {
      config: { axis: "y", times: { y: 3, z: 4 } },
      position: { x: 7.5, y: 1, z: 7 },
      type: "barrier",
    },
    barrier2: {
      config: { axis: "y", times: { z: 6 } },
      position: { x: 7.5, y: 1, z: 0 },
      type: "barrier",
    },
    barrier3: {
      config: { axis: "x", times: { z: 4 } },
      position: { x: 8, y: 3.5, z: 7 },
      type: "barrier",
    },
    "block@7,2,0": {
      config: { style: "organic", times: { z: 5 } },
      position: { x: 8, y: 1, z: 0 },
      type: "block",
    },
    "block@7,2,3": {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 8, y: 1, z: 6 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus9fish" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "egyptus15" },
      position: { x: 5, y: 9, z: 6 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "egyptus11" },
      position: { x: 9, y: 2, z: 7 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 9, y: 9 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "hushPuppy@2,7,1": {
      config: {},
      position: { x: 2, y: 8, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,7,2": {
      config: {},
      position: { x: 3, y: 8, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@4,7,3": {
      config: {},
      position: { x: 4, y: 8, z: 3 },
      type: "hushPuppy",
    },
    portable: {
      config: { style: "cube" },
      position: { x: 4, y: 8, z: 4 },
      type: "portableBlock",
    },
    pyramid1: {
      config: { style: "organic", times: { x: 5, y: 5 } },

      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    pyramid2: {
      config: { style: "organic", times: { x: 3, y: 3 } },

      position: { x: 2, y: 2, z: 1 },
      type: "block",
    },
    pyramid3: {
      config: { style: "organic" },

      position: { x: 3, y: 3, z: 2 },
      type: "block",
    },
    pyramidBall: {
      config: {},

      position: { x: 3, y: 3, z: 3 },
      type: "ball",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 9 } },
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
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
        ],
        times: { x: 5 },
      },
      position: { x: 0, y: 9, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { x: 2 },
      },
      position: { x: 7, y: 9, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { y: 2 },
      },
      position: { x: 9, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "sarcophagus",
          "hieroglyphics",
        ],
        times: { y: 5 },
      },
      position: { x: 9, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 9, y: 9 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
