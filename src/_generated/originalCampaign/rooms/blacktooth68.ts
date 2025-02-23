import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "blacktooth68",
  items: {
    "block@0,0,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,0,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    "block@0,0,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    "block@0,5,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,5,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 5, z: 1 },
      type: "block",
    },
    "block@0,5,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 5, z: 2 },
      type: "block",
    },
    "block@2,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    "block@2,7,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 2, y: 7, z: 1 },
      type: "block",
    },
    "block@2,7,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 2, y: 7, z: 2 },
      type: "block",
    },
    "block@3,0,3": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "block@7,4,3": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    "block@7,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "block@7,7,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    "block@7,7,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 7, y: 7, z: 2 },
      type: "block",
    },
    "door@3,0,5": {
      config: { direction: "towards", toRoom: "blacktooth66" },
      position: { x: 3, y: 0, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "blacktooth76" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
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
    left: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
