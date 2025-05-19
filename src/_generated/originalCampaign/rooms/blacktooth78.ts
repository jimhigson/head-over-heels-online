import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth78",
  items: {
    "block@0,1,0": {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,1": {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    "block@3,7,2": {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 3, y: 7, z: 2 },
      type: "block",
    },
    "block@3,7,3": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    "block@4,7,0": {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@4,7,1": {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 4, y: 7, z: 1 },
      type: "block",
    },
    "block@4,7,2": {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 4, y: 7, z: 2 },
      type: "block",
    },
    "block@7,2,0": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,1": {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,2": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "deadlyBlock@1,0,0": {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,2,0": {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,0": {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "blacktooth80" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "blacktooth72" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "lift@1,1,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 1, y: 1, z: 0 },
      type: "lift",
    },
    "monster@4,4,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    "movingPlatform@1,1,1": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "stepStool",
      },
      position: { x: 1, y: 1, z: 1 },
      type: "movingPlatform",
    },
    "pushableBlock@0,1,1": {
      config: { style: "stepStool" },
      position: { x: 0, y: 1, z: 1 },
      type: "pushableBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield", "plain"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield", "plain"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth79fish",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
