import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "penitentiary28",
  items: {
    "block@0,3,0": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,3,3": {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "door@0,3,4": {
      config: { direction: "right", toRoom: "penitentiary29" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "penitentiary30" },
      position: { x: 3, y: 0, z: 4 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "penitentiary27" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "hushPuppy@2,0,0": {
      config: {},
      position: { x: 2, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@3,0,1": {
      config: {},
      position: { x: 3, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@4,0,2": {
      config: {},
      position: { x: 4, y: 0, z: 2 },
      type: "hushPuppy",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
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
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: { direction: "left", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
