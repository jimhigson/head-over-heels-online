import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "blacktooth40fish",
  items: {
    "block@2,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,15,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 15, z: 0 },
      type: "block",
    },
    "block@4,15,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 15, z: 0 },
      type: "block",
    },
    "block@5,15,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 15, z: 0 },
      type: "block",
    },
    "conveyor@0,1,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 0, y: 1, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,10,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 0, y: 10, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,12,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 0, y: 12, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,14,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 0, y: 14, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,3,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 0, y: 3, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,4,0:cVr4l": {
      config: { direction: "right" },
      position: { x: 0, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@1,14,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 1, y: 14, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,1,0:cVr4l": {
      config: { direction: "right" },
      position: { x: 2, y: 1, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,10,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 2, y: 10, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,14,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 2, y: 14, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,4,0:cVr4l": {
      config: { direction: "right" },
      position: { x: 2, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@3,14,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 3, y: 14, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,10,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 4, y: 10, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,4,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 4, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,5,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 4, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,6,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 4, y: 6, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,7,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 4, y: 7, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,8,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 4, y: 8, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,9,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 4, y: 9, z: 0 },
      type: "conveyor",
    },
    "door@2,0,1:Z1V7SQd": {
      config: { direction: "towards", toRoom: "blacktooth39" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "pickup@3,15,1:1MkQY2": {
      config: { gives: "extra-life" },
      position: { x: 3, y: 15, z: 1 },
      type: "pickup",
    },
    "pickup@4,15,1:DHWsf": {
      config: { gives: "shield" },
      position: { x: 4, y: 15, z: 1 },
      type: "pickup",
    },
    "pickup@5,15,1:ZPJAGD": {
      config: { gives: "reincarnation" },
      position: { x: 5, y: 15, z: 1 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 16 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
