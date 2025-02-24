import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "penitentiary22",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0": {
      config: { style: "organic", times: { y: 7 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@0,4,7": {
      config: { style: "artificial" },
      position: { x: 0, y: 4, z: 7 },
      type: "block",
    },
    "block@1,4,6": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 4, z: 6 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@2,4,5": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 2, y: 4, z: 5 },
      type: "block",
    },
    "block@3,4,4": {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 3, y: 4, z: 4 },
      type: "block",
    },
    "block@4,1,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 4, y: 1, z: 1 },
      type: "block",
    },
    "block@4,2,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 4, y: 2, z: 2 },
      type: "block",
    },
    "block@4,3,3": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 4, y: 3, z: 3 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    extra1: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 1 },
      type: "block",
    },
    extra2: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 2 },
      type: "block",
    },
    extra3: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    extra4: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 4 },
      type: "block",
    },
    extra5: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 5 },
      type: "block",
    },
    extra6: {
      config: { style: "tower" },
      position: { x: 0, y: 4, z: 6 },
      type: "block",
    },
    "pickup@4,4,5": {
      config: { gives: "extra-life" },
      position: { x: 4, y: 4, z: 5 },
      type: "pickup",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary23",
  roomBelow: "penitentiary21",
  size: { x: 8, y: 8, z: 13 },
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
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
