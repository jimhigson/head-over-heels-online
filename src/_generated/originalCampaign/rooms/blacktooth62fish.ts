import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "deadly",
  id: "blacktooth62fish",
  items: {
    "block@0,0,0": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,10,0": {
      config: { style: "organic" },
      position: { x: 0, y: 10, z: 0 },
      type: "block",
    },
    "block@0,11,0": {
      config: { style: "organic" },
      position: { x: 0, y: 11, z: 0 },
      type: "block",
    },
    "block@0,12,0": {
      config: { style: "organic" },
      position: { x: 0, y: 12, z: 0 },
      type: "block",
    },
    "block@0,13,0": {
      config: { style: "organic" },
      position: { x: 0, y: 13, z: 0 },
      type: "block",
    },
    "block@0,14,0": {
      config: { style: "organic" },
      position: { x: 0, y: 14, z: 0 },
      type: "block",
    },
    "block@0,15,0": {
      config: { style: "organic" },
      position: { x: 0, y: 15, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,8,0": {
      config: { style: "organic" },
      position: { x: 0, y: 8, z: 0 },
      type: "block",
    },
    "block@0,9,0": {
      config: { style: "organic" },
      position: { x: 0, y: 9, z: 0 },
      type: "block",
    },
    "block@1,0,0": {
      config: { style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,12,0": {
      config: { style: "organic" },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@5,0,0": {
      config: { style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,10,0": {
      config: { style: "organic" },
      position: { x: 5, y: 10, z: 0 },
      type: "block",
    },
    "block@5,15,0": {
      config: { style: "organic" },
      position: { x: 5, y: 15, z: 0 },
      type: "block",
    },
    "block@5,9,0": {
      config: { style: "organic" },
      position: { x: 5, y: 9, z: 0 },
      type: "block",
    },
    "conveyor@5,4,0": {
      config: { direction: "away" },
      position: { x: 5, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,5,0": {
      config: { direction: "away" },
      position: { x: 5, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,6,0": {
      config: { direction: "away" },
      position: { x: 5, y: 6, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,7,0": {
      config: { direction: "away" },
      position: { x: 5, y: 7, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,8,0": {
      config: { direction: "away" },
      position: { x: 5, y: 8, z: 0 },
      type: "conveyor",
    },
    "door@0,11,1": {
      config: { direction: "right", toRoom: "blacktooth63" },
      position: { x: 0, y: 11, z: 1 },
      type: "door",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth61" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "pickup@5,15,1": {
      config: { gives: "reincarnation" },
      position: { x: 5, y: 15, z: 1 },
      type: "pickup",
    },
    "portableBlock@0,1,0": {
      config: { style: "cube" },
      position: { x: 0, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@0,2,0": {
      config: { style: "cube" },
      position: { x: 0, y: 2, z: 0 },
      type: "portableBlock",
    },
    "spring@0,6,0": {
      config: {},
      position: { x: 0, y: 6, z: 0 },
      type: "spring",
    },
    "spring@4,15,0": {
      config: {},
      position: { x: 4, y: 15, z: 0 },
      type: "spring",
    },
    "spring@5,12,0": {
      config: {},
      position: { x: 5, y: 12, z: 0 },
      type: "spring",
    },
  },
  planet: "jail",
  size: { x: 6, y: 16 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars"],
    left: [
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
      "bars",
    ],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
