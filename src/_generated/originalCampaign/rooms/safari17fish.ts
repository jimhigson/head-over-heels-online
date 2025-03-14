import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "safari",
  id: "safari17fish",
  items: {
    "block@3,0,3": {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "safari16" },
      position: { x: 3, y: 0, z: 4 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "safari30" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "safari31" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "hushPuppy@0,3,0": {
      config: {},
      position: { x: 0, y: 3, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@1,3,1": {
      config: {},
      position: { x: 1, y: 3, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,3,2": {
      config: {},
      position: { x: 2, y: 3, z: 2 },
      type: "hushPuppy",
    },
    "pickup@4,7,4": {
      config: { gives: "reincarnation" },
      position: { x: 4, y: 7, z: 4 },
      type: "pickup",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["wall", "shield", "wall"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["wall", "window", "wall"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["wall", "shield", "wall"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["wall", "window", "wall"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
