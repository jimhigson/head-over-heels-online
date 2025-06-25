import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth17triple",
  items: {
    "deadlyBlock@1,2,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "deadlyBlock@1,8,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 1, y: 8, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@10,2,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 10, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,10,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,4,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,7,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,8,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 4, y: 8, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 7, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,1,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 8, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,4,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 8, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth16" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@12,2,0": {
      config: { direction: "left", toRoom: "blacktooth19" },
      position: { x: 12, y: 2, z: 0 },
      type: "door",
    },
    "door@6,8,0": {
      config: { direction: "left", toRoom: "blacktooth18" },
      position: { x: 6, y: 8, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 12, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    floorR: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "floor",
    },
    "monster@3,0,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 3, y: 0, z: 0 },
      type: "monster",
    },
    "pickup@3,9,0": {
      config: { gives: "shield" },
      position: { x: 3, y: 9, z: 0 },
      type: "pickup",
    },
    "wall(away)@6,6,0": {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
        times: { x: 6 },
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall(left)@6,6,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield"],
        times: { y: 2 },
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,12,0": {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
        times: { x: 6 },
      },
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@12,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield"],
        times: { y: 2 },
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    "wall@12,4,0": {
      config: {
        direction: "left",
        tiles: ["shield", "plain"],
        times: { y: 2 },
      },
      position: { x: 12, y: 4, z: 0 },
      type: "wall",
    },
    "wall@6,10,0": {
      config: {
        direction: "left",
        tiles: ["shield", "plain"],
        times: { y: 2 },
      },
      position: { x: 6, y: 10, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 12, y: 6 } },
      },
      middle: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 6 }, to: { x: 6, y: 12 } },
      },
    },
  },
  planet: "blacktooth",
  size: { x: 12, y: 12 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
