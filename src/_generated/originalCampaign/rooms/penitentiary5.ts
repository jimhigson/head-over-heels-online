import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "none",
  id: "penitentiary5",
  items: {
    "block@0,5,7": {
      config: { style: "artificial" },
      position: { x: 0, y: 5, z: 7 },
      type: "block",
    },
    "block@2,5,5": {
      config: { disappearing: "onStand", style: "artificial" },
      position: { x: 2, y: 5, z: 5 },
      type: "block",
    },
    "block@5,0,0": {
      config: { style: "artificial" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,4,0": {
      config: { style: "artificial" },
      position: { x: 5, y: 4, z: 0 },
      type: "block",
    },
    "block@5,5,2": {
      config: { style: "artificial" },
      position: { x: 5, y: 5, z: 2 },
      type: "block",
    },
    "block@5,5,4": {
      config: { style: "artificial" },
      position: { x: 5, y: 5, z: 4 },
      type: "block",
    },
    extra1: {
      config: { disappearing: "onStand", style: "artificial" },
      isExtra: true,
      position: { x: 2, y: 5, z: 4 },
      type: "block",
    },
    extra2: {
      config: { disappearing: "onStand", style: "artificial" },
      isExtra: true,
      position: { x: 2, y: 5, z: 3 },
      type: "block",
    },
    extra3: {
      config: { disappearing: "onStand", style: "artificial" },
      isExtra: true,
      position: { x: 2, y: 5, z: 2 },
      type: "block",
    },
    extra4: {
      config: { disappearing: "onStand", style: "artificial" },
      isExtra: true,
      position: { x: 2, y: 5, z: 1 },
      type: "block",
    },
    extra5: {
      config: { disappearing: "onStand", style: "artificial" },
      isExtra: true,
      position: { x: 2, y: 5, z: 0 },
      type: "block",
    },
    extra6: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 5, z: 1 },
      type: "block",
    },
    extra7: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 6 } },
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
  roomAbove: "penitentiary6",
  roomBelow: "penitentiary4",
  size: { x: 6, y: 6, z: 12 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
