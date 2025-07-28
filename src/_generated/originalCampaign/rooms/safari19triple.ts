import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari19triple",
  items: {
    "barrier@13,0,0": {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 13, y: 0, z: 0 },
      type: "barrier",
    },
    "block@0,9,0": {
      config: { style: "tower", times: { z: 5 } },
      position: { x: 0, y: 9, z: 0 },
      type: "block",
    },
    "block@6,6,0": {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "door@16,1,0": {
      config: { direction: "left", toRoom: "safari20" },
      position: { x: 16, y: 1, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "safari18",
      },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,10,0": {
      config: { direction: "away", toRoom: "safari25" },
      position: { x: 3, y: 10, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 16, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    floorR: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 4, z: 0 },
      type: "floor",
    },
    keepMonsterInPlace0: {
      config: { axis: "y" },
      position: { x: 8, y: 0, z: 0 },
      type: "barrier",
    },
    keepMonsterInPlace1: {
      config: { axis: "y" },
      position: { x: 8, y: 1, z: 0 },
      type: "barrier",
    },
    keepMonsterInPlace2: {
      config: { axis: "y" },
      position: { x: 8, y: 2, z: 0 },
      type: "barrier",
    },
    keepMonsterInPlace3: {
      config: { axis: "y" },
      position: { x: 8, y: 3, z: 0 },
      type: "barrier",
    },
    "monster@12,0,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 12, y: 0, z: 0 },
      type: "monster",
    },
    "pickup@0,9,6": {
      config: { gives: "extra-life" },
      position: { x: 0, y: 9, z: 6 },
      type: "pickup",
    },
    "portableBlock@12,0,1": {
      config: { style: "drum" },
      position: { x: 12, y: 0, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@6,6,1": {
      config: { style: "drum" },
      position: { x: 6, y: 6, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@6,8,1": {
      config: { style: "drum" },
      position: { x: 6, y: 8, z: 1 },
      type: "portableBlock",
    },
    "spring@6,7,1": {
      config: {},
      position: { x: 6, y: 7, z: 1 },
      type: "spring",
    },
    towerTop: {
      config: { style: "organic" },
      position: { x: 0, y: 9, z: 5 },
      type: "block",
    },
    "wall(away)@8,4,0": {
      config: {
        direction: "away",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
      },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
    "wall(left)@8,4,0": {
      config: {
        direction: "left",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
      },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
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
    "wall@0,10,0": {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    "wall@16,0,0": {
      config: { direction: "left", tiles: ["wall"] },
      position: { x: 16, y: 0, z: 0 },
      type: "wall",
    },
    "wall@16,3,0": {
      config: { direction: "left", tiles: ["wall"] },
      position: { x: 16, y: 3, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 11 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,10,0": {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 5, y: 10, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 4 } },
      },
      middle: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 4 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 4 }, to: { x: 8, y: 10 } },
      },
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
