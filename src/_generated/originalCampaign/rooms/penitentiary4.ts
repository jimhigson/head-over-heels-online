import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary4",
  items: {
    "block@4,5,1": {
      config: { style: "artificial" },
      position: { x: 4, y: 5, z: 1 },
      type: "block",
    },
    "block@5,0,4": {
      config: { style: "artificial" },
      position: { x: 5, y: 0, z: 4 },
      type: "block",
    },
    "block@5,0,7": {
      config: { style: "artificial" },
      position: { x: 5, y: 0, z: 7 },
      type: "block",
    },
    "block@5,1,2": {
      config: { style: "artificial" },
      position: { x: 5, y: 1, z: 2 },
      type: "block",
    },
    "block@5,2,6": {
      config: { style: "artificial" },
      position: { x: 5, y: 2, z: 6 },
      type: "block",
    },
    "block@5,5,2": {
      config: { style: "artificial" },
      position: { x: 5, y: 5, z: 2 },
      type: "block",
    },
    "deadlyBlock@5,2,0": {
      config: { style: "spikes", times: { y: 2 } },
      position: { x: 5, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "penitentiary3" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    extra1: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    extra2: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 5, z: 1 },
      type: "block",
    },
    extra2b: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    extra3: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 1, z: 1 },
      type: "block",
    },
    extra4: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    extra5: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 0, z: 3 },
      type: "block",
    },
    extra6: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 0, z: 2 },
      type: "block",
    },
    extra7: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 0, z: 1 },
      type: "block",
    },
    extra8: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
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
  roomAbove: "penitentiary5",
  size: { x: 6, y: 6, z: 12 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
