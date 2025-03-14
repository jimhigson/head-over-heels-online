import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "blacktooth73",
  items: {
    "block@0,2,3": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    "block@1,5,0": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@3,5,1": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 5, z: 1 },
      type: "block",
    },
    "block@3,5,4": {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 4 },
      type: "block",
    },
    "block@7,2,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "deadlyBlock@5,5,2": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 5, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,3": {
      config: { style: "volcano" },
      position: { x: 7, y: 5, z: 3 },
      type: "deadlyBlock",
    },
    "door@0,2,4": {
      config: { direction: "right", toRoom: "blacktooth72" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    "door@8,2,2": {
      config: { direction: "left", toRoom: "blacktooth74" },
      position: { x: 8, y: 2, z: 2 },
      type: "door",
    },
    "hushPuppy@0,1,2": {
      config: {},
      position: { x: 0, y: 1, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@1,1,1": {
      config: {},
      position: { x: 1, y: 1, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,1,0": {
      config: {},
      position: { x: 2, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,1,0": {
      config: {},
      position: { x: 4, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,3,0": {
      config: {},
      position: { x: 4, y: 3, z: 0 },
      type: "hushPuppy",
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
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield"],
        times: { y: 2 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,4,0": {
      config: {
        direction: "left",
        tiles: ["shield", "plain"],
        times: { y: 2 },
      },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
