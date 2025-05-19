import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "bookworld",
  id: "blacktooth59",
  items: {
    "block@0,1,2": {
      config: { style: "book", times: { x: 2 } },
      position: { x: 0, y: 1, z: 2 },
      type: "block",
    },
    "block@0,1,4": {
      config: { style: "book", times: { x: 2, z: 2 } },
      position: { x: 0, y: 1, z: 4 },
      type: "block",
    },
    "block@0,2,1": {
      config: { style: "book" },
      position: { x: 0, y: 2, z: 1 },
      type: "block",
    },
    "block@0,3,0": {
      config: { style: "book" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@1,0,3": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 1, y: 0, z: 3 },
      type: "block",
    },
    "block@1,1,0": {
      config: { style: "book", times: { z: 2 } },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,1,3": {
      config: { style: "book" },
      position: { x: 1, y: 1, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,1,6": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 0, y: 1, z: 6 },
      type: "deadlyBlock",
    },
    "door@3,0,4": {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "blacktooth58triple",
      },
      position: { x: 5, y: 0, z: 4 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "blacktooth60" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth63" },
      position: { x: 8, y: 5, z: 0 },
      type: "door",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 5 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 1 } },
      position: { x: 7, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars"],
        times: { y: 5 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: { direction: "left", tiles: ["bars"], times: { y: 1 } },
      position: { x: 8, y: 7, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
