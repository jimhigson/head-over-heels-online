import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "egyptus17",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,5,0": {
      config: { style: "organic", times: { x: 12 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@11,2,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 11, y: 2, z: 0 },
      type: "block",
    },
    "door@12,2,2": {
      config: { direction: "left", toRoom: "egyptus18" },
      position: { x: 12, y: 2, z: 2 },
      type: "door",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "egyptus16" },
      position: { x: 5, y: 0, z: 1 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 12, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@5,1,0": {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "away",
        which: "turtle",
      },
      position: { x: 5, y: 1, z: 0 },
      type: "monster",
    },
    "portableBlock@1,0,1": {
      config: { style: "sticks" },
      position: { x: 1, y: 0, z: 1 },
      type: "portableBlock",
    },
    "spikes@4,1,0": {
      config: {},
      position: { x: 4, y: 1, z: 0 },
      type: "spikes",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 5 } },
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
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@12,0,0": {
      config: { direction: "left", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    "wall@12,4,0": {
      config: { direction: "left", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 12, y: 4, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 5 } },
      position: { x: 7, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 8, y: 0 }, to: { x: 12, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 6 } },
      },
    },
  },
  planet: "egyptus",
  size: { x: 12, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
