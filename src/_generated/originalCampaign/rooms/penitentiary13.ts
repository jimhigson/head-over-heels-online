import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary13",
  items: {
    "block@0,3,5": {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 0, y: 3, z: 5 },
      type: "block",
    },
    "block@1,0,1": {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 1, y: 0, z: 1 },
      type: "block",
    },
    "block@1,3,4": {
      config: { style: "artificial" },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    "block@2,3,6": {
      config: { style: "artificial" },
      position: { x: 2, y: 3, z: 6 },
      type: "block",
    },
    "block@3,3,3": {
      config: { style: "artificial" },
      position: { x: 3, y: 3, z: 3 },
      type: "block",
    },
    "block@4,3,2": {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 4, y: 3, z: 2 },
      type: "block",
    },
    "block@5,3,1": {
      config: { style: "artificial" },
      position: { x: 5, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "artificial" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "deadlyBlock@1,0,0": {
      config: { style: "toaster", times: { x: 2 } },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0": {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary2" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    extra1: {
      config: { style: "artificial" },

      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    secondOverToaster: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 2, y: 0, z: 1 },
      type: "block",
    },
    "spring@2,3,7": {
      config: {},
      position: { x: 2, y: 3, z: 7 },
      type: "spring",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: {
        direction: "away",
        tiles: [
          "skeleton",
          "loop",
          "loop",
          "loop",
          "loop",
          "loop",
          "skeleton",
          "loop",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 4, z: 0 },
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
        tiles: ["loop", "loop", "skeleton", "loop"],
        times: { y: 4 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary14",
  size: { x: 8, y: 4 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
