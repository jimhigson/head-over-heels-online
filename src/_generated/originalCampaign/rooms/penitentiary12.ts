import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary12",
  items: {
    "block@0,2,3": {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "artificial", times: { z: 3 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "door@0,3,4": {
      config: { direction: "right", toRoom: "penitentiary18fish" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "penitentiary19" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "penitentiary11" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "hushPuppy@0,0,0": {
      config: {},
      position: { x: 0, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@0,1,3": {
      config: {},
      position: { x: 0, y: 1, z: 3 },
      type: "hushPuppy",
    },
    "hushPuppy@1,0,1": {
      config: {},
      position: { x: 1, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@1,1,2": {
      config: {},
      position: { x: 1, y: 1, z: 2 },
      type: "hushPuppy",
    },
    "pickup@7,0,3": {
      config: { gives: "doughnuts" },
      position: { x: 7, y: 0, z: 3 },
      type: "pickup",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
