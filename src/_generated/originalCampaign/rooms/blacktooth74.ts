import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth74",
  items: {
    "block@0,2,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 4 },
      type: "block",
    },
    "block@0,3,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 4 },
      type: "block",
    },
    "block@1,3,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    "block@2,3,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 3, z: 4 },
      type: "block",
    },
    "block@3,3,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 3, z: 4 },
      type: "block",
    },
    "block@4,3,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 3, z: 4 },
      type: "block",
    },
    "block@5,3,4": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 3, z: 4 },
      type: "block",
    },
    "door@0,2,5": {
      config: { direction: "right", toRoom: "blacktooth73" },
      position: { x: 0, y: 2, z: 5 },
      type: "door",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth75" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "monster@3,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    "pickup@5,3,5": {
      config: { gives: "doughnuts" },
      position: { x: 5, y: 3, z: 5 },
      type: "pickup",
    },
    "portableBlock@0,2,0": {
      config: { style: "cube" },
      position: { x: 0, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,5,0": {
      config: { style: "cube" },
      position: { x: 4, y: 5, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@5,0,0": {
      config: { style: "cube" },
      position: { x: 5, y: 0, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 6 },
  walls: {
    away: ["plain", "armour", "shield", "shield", "armour", "plain"],
    left: ["plain", "armour", "shield", "shield", "armour", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
