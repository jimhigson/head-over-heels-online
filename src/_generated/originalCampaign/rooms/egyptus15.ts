import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "egyptus15",
  items: {
    "block@0,5,2": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 5, z: 2 },
      type: "block",
    },
    "block@0,5,6": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 6 },
      type: "block",
    },
    "block@1,5,1": {
      config: { style: "organic" },
      position: { x: 1, y: 5, z: 1 },
      type: "block",
    },
    "block@1,5,5": {
      config: { style: "organic" },
      position: { x: 1, y: 5, z: 5 },
      type: "block",
    },
    "block@2,5,3": {
      config: { style: "organic" },
      position: { x: 2, y: 5, z: 3 },
      type: "block",
    },
    "block@3,5,1": {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 1 },
      type: "block",
    },
    "block@3,5,4": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 5, z: 4 },
      type: "block",
    },
    "block@5,5,0": {
      config: { style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "egyptus10" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    extra1: {
      config: { style: "organic" },

      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    extra2: {
      config: { style: "organic" },

      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "spikes@0,5,0": {
      config: {},
      position: { x: 0, y: 5, z: 0 },
      type: "spikes",
    },
    "spring@0,5,7": {
      config: {},
      position: { x: 0, y: 5, z: 7 },
      type: "spring",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
        times: { x: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus16",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
