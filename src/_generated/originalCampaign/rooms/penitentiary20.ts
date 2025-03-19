import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary20",
  items: {
    hintAboveA: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 6, z: 14 },
      type: "block",
    },
    hintAboveL: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 6, y: -1, z: 14 },
      type: "block",
    },
    hintAboveR: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: -1, y: -1, z: 14 },
      type: "block",
    },
    hintAboveSingle: {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 0, z: 14 },
      type: "block",
    },
    hintAboveT: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: -1, z: 14 },
      type: "block",
    },
    "monster@2,3,1": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 3, z: 1 },
      type: "monster",
    },
    "portableBlock@1,1,0": {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@1,4,0": {
      config: { style: "cube" },
      position: { x: 1, y: 4, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@2,2,0": {
      config: { style: "cube" },
      position: { x: 2, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@2,3,0": {
      config: { style: "cube" },
      position: { x: 2, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,2,0": {
      config: { style: "cube" },
      position: { x: 3, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,3,0": {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,1,0": {
      config: { style: "cube" },
      position: { x: 4, y: 1, z: 0 },
      type: "portableBlock",
    },
    "spring@3,2,1": {
      config: {},
      position: { x: 3, y: 2, z: 1 },
      type: "spring",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
        times: { x: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary21",
  size: { x: 6, y: 6, z: 14 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
