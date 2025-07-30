import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth19",
  items: {
    "block@2,2,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    "block@2,2,3": {
      config: { style: "organic", times: { x: 4 } },
      position: { x: 2, y: 2, z: 3 },
      type: "block",
    },
    "block@6,2,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "conveyor@6,2,3": {
      config: { direction: "away" },
      position: { x: 6, y: 2, z: 3 },
      type: "conveyor",
    },
    "door@0,3,0": {
      config: {
        direction: "right",
        meta: { toSubRoom: "left" },
        toRoom: "blacktooth17triple",
      },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "blacktooth20" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "lift@1,2,0": {
      config: { bottom: 0, top: 7 },
      position: { x: 1, y: 2, z: 0 },
      type: "lift",
    },
    "pushableBlock@3,2,4": {
      config: {},
      position: { x: 3, y: 2, z: 4 },
      type: "pushableBlock",
    },
    "pushableBlock@4,2,4": {
      config: {},
      position: { x: 4, y: 2, z: 4 },
      type: "pushableBlock",
    },
    "pushableBlock@5,2,4": {
      config: {},
      position: { x: 5, y: 2, z: 4 },
      type: "pushableBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
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
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
