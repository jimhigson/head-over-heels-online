import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari6triple",
  items: {
    "block@0,0,0": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,11,0": {
      config: { style: "organic" },
      position: { x: 0, y: 11, z: 0 },
      type: "block",
    },
    "block@0,2,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@1,10,0": {
      config: { style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    "block@1,8,0": {
      config: { style: "organic" },
      position: { x: 1, y: 8, z: 0 },
      type: "block",
    },
    "block@10,2,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 10, y: 2, z: 0 },
      type: "block",
    },
    "block@10,4,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 10, y: 4, z: 0 },
      type: "block",
    },
    "block@11,0,0": {
      config: { style: "organic" },
      position: { x: 11, y: 0, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@3,2,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "block@3,8,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 8, z: 0 },
      type: "block",
    },
    "block@5,2,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    "block@5,5,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "block@5,6,0": {
      config: { style: "organic" },
      position: { x: 5, y: 6, z: 0 },
      type: "block",
    },
    "block@5,8,0": {
      config: { style: "organic" },
      position: { x: 5, y: 8, z: 0 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@8,5,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 8, y: 5, z: 0 },
      type: "block",
    },
    "block@9,0,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 9, y: 0, z: 0 },
      type: "block",
    },
    blockMissingInXml: {
      config: { style: "organic" },
      position: { x: 10, y: 5, z: 0 },
      type: "block",
    },
    "door@0,2,1": {
      config: { direction: "right", toRoom: "safari5" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    "door@6,8,2": {
      config: { direction: "left", toRoom: "safari7" },
      position: { x: 6, y: 8, z: 2 },
      type: "door",
    },
    "door@8,6,2": {
      config: { direction: "away", toRoom: "safari7" },
      position: { x: 8, y: 6, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 12, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    floorR: {
      config: {
        floorType: "deadly",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "floor",
    },
    "pickup@0,11,1": {
      config: { gives: "shield" },
      position: { x: 0, y: 11, z: 1 },
      type: "pickup",
    },
    "wall(away)@6,6,0": {
      config: { direction: "away", tiles: ["wall", "shield"], times: { x: 2 } },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall(left)@6,6,0": {
      config: { direction: "left", tiles: ["wall", "shield"], times: { y: 2 } },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 13 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,13,0": {
      config: {
        direction: "away",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
        times: { x: 6 },
      },
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 9 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@10,6,0": {
      config: { direction: "away", tiles: ["shield", "wall"], times: { x: 2 } },
      position: { x: 10, y: 6, z: 0 },
      type: "wall",
    },
    "wall@13,0,0": {
      config: {
        direction: "left",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
        times: { y: 6 },
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,10,0": {
      config: { direction: "left", tiles: ["shield", "wall"], times: { y: 2 } },
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
  planet: "safari",
  size: { x: 12, y: 12 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
