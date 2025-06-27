import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "egyptus13",
  items: {
    "block@2,0,4": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 2, y: 0, z: 4 },
      type: "block",
    },
    "block@7,0,6": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 6 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus12" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 8, y: 10 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "lift@0,0,2": {
      config: { bottom: 2, top: 5 },
      position: { x: 0, y: 0, z: 2 },
      type: "lift",
    },
    "pushableBlock@1,0,0": {
      config: {},
      position: { x: 1, y: 0, z: 0 },
      type: "pushableBlock",
    },
    "spring@7,0,7": {
      config: {},
      position: { x: 7, y: 0, z: 7 },
      type: "spring",
    },
    "teleporter@4,0,5": {
      config: { toPosition: { x: 3, y: 0, z: 5 }, toRoom: "egyptus9fish" },
      position: { x: 4, y: 0, z: 5 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 10 } },
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
      position: { x: 0, y: 10, z: 0 },
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
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
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
  roomAbove: "egyptus14",
  size: { x: 8, y: 10, z: 13 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
