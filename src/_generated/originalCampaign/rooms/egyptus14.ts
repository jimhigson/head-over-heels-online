import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "egyptus14",
  items: {
    "block@2,7,1": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 2, y: 9, z: 1 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,0,4": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 4 },
      type: "block",
    },
    "block@7,0,6": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 6 },
      type: "block",
    },
    "block@7,1,7": {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 7 },
      type: "block",
    },
    "block@7,3,2": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "door@3,8,3": {
      config: { direction: "away", toRoom: "egyptus18" },
      position: { x: 3, y: 10, z: 3 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 10 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "lift@0,7,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 9, z: 0 },
      type: "lift",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 10 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 5, y: 10, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
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
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus19",
  roomBelow: "egyptus13",
  size: { x: 8, y: 10, z: 12 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
