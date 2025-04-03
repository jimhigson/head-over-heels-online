import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "egyptus",
  id: "egyptus10",
  items: {
    "block@7,2,0": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,2,3": {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 7, y: 2, z: 3 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus9fish" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "egyptus15" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "egyptus11" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "hushPuppy@1,7,0": {
      config: {},
      position: { x: 1, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,1": {
      config: {},
      position: { x: 2, y: 7, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,7,2": {
      config: {},
      position: { x: 3, y: 7, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@4,7,3": {
      config: {},
      position: { x: 4, y: 7, z: 3 },
      type: "hushPuppy",
    },
    pyramid1: {
      config: { style: "organic", times: { x: 5, y: 5 } },
      isExtra: true,
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    pyramid2: {
      config: { style: "organic", times: { x: 3, y: 3 } },
      isExtra: true,
      position: { x: 2, y: 2, z: 1 },
      type: "block",
    },
    pyramid3: {
      config: { style: "organic" },
      isExtra: true,
      position: { x: 3, y: 3, z: 2 },
      type: "block",
    },
    pyramidBall: {
      config: {},
      isExtra: true,
      position: { x: 3, y: 3, z: 3 },
      type: "ball",
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
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
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
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
