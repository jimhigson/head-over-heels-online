import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth67",
  items: {
    "block@0,0,4": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 0, y: 0, z: 4 },
      type: "block",
    },
    "block@6,3,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,1": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "block@7,4,0": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "block@7,4,2": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 2 },
      type: "block",
    },
    "door@0,3,5": {
      config: { direction: "right", toRoom: "blacktooth69" },
      position: { x: 0, y: 3, z: 5 },
      type: "door",
    },
    "door@3,8,4": {
      config: { direction: "away", toRoom: "blacktooth70" },
      position: { x: 6, y: 8, z: 4 },
      type: "door",
    },
    "door@8,3,4": {
      config: { direction: "left", toRoom: "blacktooth66" },
      position: { x: 8, y: 3, z: 4 },
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
    "spring@0,0,5": {
      config: {},
      position: { x: 0, y: 0, z: 5 },
      type: "spring",
    },
    towerA: {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    towerB: {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
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
      config: {
        direction: "away",
        tiles: ["plain", "plain", "plain", "plain", "plain", "plain"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
