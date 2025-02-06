import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary13",
  items: {
    "block@0,3,5": {
      config: { disappearing: "onStand", style: "artificial" },
      position: { x: 0, y: 3, z: 5 },
      type: "block",
    },
    "block@1,0,1": {
      config: { disappearing: "onStand", style: "artificial" },
      position: { x: 1, y: 0, z: 1 },
      type: "block",
    },
    "block@1,3,4": {
      config: { style: "artificial" },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    "block@2,0,1": {
      config: { disappearing: "onStand", style: "artificial" },
      position: { x: 2, y: 0, z: 1 },
      type: "block",
    },
    "block@2,3,6": {
      config: { style: "artificial" },
      position: { x: 2, y: 3, z: 6 },
      type: "block",
    },
    "block@3,3,3": {
      config: { style: "artificial" },
      position: { x: 3, y: 3, z: 3 },
      type: "block",
    },
    "block@4,3,2": {
      config: { disappearing: "onStand", style: "artificial" },
      position: { x: 4, y: 3, z: 2 },
      type: "block",
    },
    "block@5,3,1": {
      config: { style: "artificial" },
      position: { x: 5, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "artificial" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "deadlyBlock@1,0,0": {
      config: { style: "toaster" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0": {
      config: { style: "toaster" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0": {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary2" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    extra1: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    "spring@2,3,7": {
      config: {},
      position: { x: 2, y: 3, z: 7 },
      type: "spring",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary14",
  size: { x: 8, y: 4 },
  walls: {
    away: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
    left: ["loop", "loop", "skeleton", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
