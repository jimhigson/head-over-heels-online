import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "safari17fish",
  items: {
    "block@3,0,3": {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 1, y: 0, z: 3 },
      type: "block",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "safari16" },
      position: { x: 1, y: 0, z: 4 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "safari30" },
      position: { x: 5, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "safari31" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "hushPuppy@0,3,0": {
      config: { times: { y: 3 } },
      position: { x: 0, y: 2, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@1,3,1": {
      config: { times: { y: 2 } },
      position: { x: 0, y: 3, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,3,2": {
      config: {},
      position: { x: 0, y: 4, z: 2 },
      type: "hushPuppy",
    },
    "pickup@4,7,4": {
      config: { gives: "reincarnation" },
      position: { x: 1, y: 7, z: 4 },
      type: "pickup",
    },
    tower1: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    tower2: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 1 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["wall", "wall", "wall", "shield", "wall"],
        times: { x: 5 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["wall"], times: { x: 1 } },
      position: { x: 7, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["wall", "wall"], times: { y: 2 } },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["wall", "window", "window", "wall"],
        times: { y: 4 },
      },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
