import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth19",
  items: {
    "block@2,2,0": {
      config: { disappearing: false, style: "tower" },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    "block@2,2,1": {
      config: { disappearing: false, style: "tower" },
      position: { x: 2, y: 2, z: 1 },
      type: "block",
    },
    "block@2,2,2": {
      config: { disappearing: false, style: "tower" },
      position: { x: 2, y: 2, z: 2 },
      type: "block",
    },
    "block@2,2,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 2, z: 3 },
      type: "block",
    },
    "block@3,2,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 2, z: 3 },
      type: "block",
    },
    "block@4,2,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 2, z: 3 },
      type: "block",
    },
    "block@5,2,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 2, z: 3 },
      type: "block",
    },
    "block@6,2,0": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "block@6,2,1": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 2, z: 1 },
      type: "block",
    },
    "block@6,2,2": {
      config: { disappearing: false, style: "tower" },
      position: { x: 6, y: 2, z: 2 },
      type: "block",
    },
    "conveyor@6,2,3": {
      config: { direction: "away" },
      position: { x: 6, y: 2, z: 3 },
      type: "conveyor",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "blacktooth17triple" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "blacktooth20" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "lift@1,2,0": {
      config: { bottom: 0, top: 7 },
      position: { x: 1, y: 2, z: 0 },
      type: "lift",
    },
    "movableBlock@3,2,4": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 3, y: 2, z: 4 },
      type: "movableBlock",
    },
    "movableBlock@4,2,4": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 4, y: 2, z: 4 },
      type: "movableBlock",
    },
    "movableBlock@5,2,4": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 5, y: 2, z: 4 },
      type: "movableBlock",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
    left: [
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
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
