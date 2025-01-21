import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "penitentiary17",
  items: {
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,1,0": {
      config: { style: "organic" },
      position: { x: 3, y: 1, z: 0 },
      type: "block",
    },
    "block@3,2,0": {
      config: { style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "block@3,3,0": {
      config: { style: "organic" },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    "block@3,4,0": {
      config: { style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@3,5,0": {
      config: { style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@3,6,0": {
      config: { style: "organic" },
      position: { x: 3, y: 6, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,1,0": {
      config: { style: "organic" },
      position: { x: 4, y: 1, z: 0 },
      type: "block",
    },
    "block@4,2,0": {
      config: { style: "organic" },
      position: { x: 4, y: 2, z: 0 },
      type: "block",
    },
    "block@4,3,0": {
      config: { style: "organic" },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@4,4,0": {
      config: { style: "organic" },
      position: { x: 4, y: 4, z: 0 },
      type: "block",
    },
    "block@4,5,0": {
      config: { style: "organic" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "block@4,6,0": {
      config: { style: "organic" },
      position: { x: 4, y: 6, z: 0 },
      type: "block",
    },
    "block@4,7,0": {
      config: { style: "organic" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "door@3,8,2": {
      config: { direction: "away", toRoom: "penitentiary18fish" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary16",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
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
