import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth77",
  items: {
    "barrier@4,0,0": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@4,0,1": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    "barrier@4,0,2": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@4,0,3": {
      config: { axis: "y", disappearing: "onTouch" },
      position: { x: 4, y: 0, z: 3 },
      type: "barrier",
    },
    "barrier@4,0,4": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 4 },
      type: "barrier",
    },
    "barrier@4,0,5": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 5 },
      type: "barrier",
    },
    "barrier@4,1,0": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 0 },
      type: "barrier",
    },
    "barrier@4,1,1": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 1 },
      type: "barrier",
    },
    "barrier@4,1,2": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 2 },
      type: "barrier",
    },
    "barrier@4,1,3": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 3 },
      type: "barrier",
    },
    "barrier@4,1,5": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 5 },
      type: "barrier",
    },
    "barrier@4,2,0": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 0 },
      type: "barrier",
    },
    "barrier@4,2,1": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 1 },
      type: "barrier",
    },
    "barrier@4,2,2": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 2 },
      type: "barrier",
    },
    "barrier@4,2,3": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 3 },
      type: "barrier",
    },
    "barrier@4,2,4": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 4 },
      type: "barrier",
    },
    "barrier@4,2,5": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 5 },
      type: "barrier",
    },
    "barrier@4,3,0": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@4,3,1": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 1 },
      type: "barrier",
    },
    "barrier@4,3,2": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@4,3,3": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 3 },
      type: "barrier",
    },
    "barrier@4,3,4": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 4 },
      type: "barrier",
    },
    "barrier@4,3,5": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 5 },
      type: "barrier",
    },
    "door@0,1,0": {
      config: { direction: "right", toRoom: "blacktooth84" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@8,1,0": {
      config: { direction: "left", toRoom: "blacktooth71" },
      position: { x: 8, y: 1, z: 0 },
      type: "door",
    },
    "movableBlock@3,1,0": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 3, y: 1, z: 0 },
      type: "movableBlock",
    },
    "portableBlock@3,3,0": {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,0,6": {
      config: { style: "cube" },
      position: { x: 4, y: 0, z: 6 },
      type: "portableBlock",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 4 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: ["shield", "none", "none", "shield"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
