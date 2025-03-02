import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "penitentiary35",
  items: {
    "block@0,0,0": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0": {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@1,0,0": {
      config: { style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,1,0": {
      config: { style: "organic" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,1,0": {
      config: { style: "organic" },
      position: { x: 2, y: 1, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,1,0": {
      config: { style: "organic" },
      position: { x: 3, y: 1, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,1,0": {
      config: { style: "organic" },
      position: { x: 4, y: 1, z: 0 },
      type: "block",
    },
    "block@5,0,0": {
      config: { style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,1,0": {
      config: { style: "organic" },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    leftWall: {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "portableBlock@1,1,1": {
      config: { style: "sticks" },
      position: { x: 1, y: 1, z: 1 },
      type: "portableBlock",
    },
    "slidingDeadly@5,0,1": {
      config: { style: "puck" },
      position: { x: 5, y: 0, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,0,2": {
      config: { style: "puck" },
      position: { x: 5, y: 0, z: 2 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,1,1": {
      config: { style: "puck" },
      position: { x: 5, y: 1, z: 1 },
      type: "slidingDeadly",
    },
    "slidingDeadly@5,1,2": {
      config: { style: "puck" },
      position: { x: 5, y: 1, z: 2 },
      type: "slidingDeadly",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
      config: {
        direction: "away",
        tiles: [
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary29",
  roomBelow: "penitentiary32",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
