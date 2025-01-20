import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth70",
  items: {
    "block@0,5,0": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,5,1": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 1 },
      type: "block",
    },
    "block@0,6,1": {
      config: { style: "organic" },
      position: { x: 0, y: 6, z: 1 },
      type: "block",
    },
    "block@0,7,1": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    "block@1,5,0": {
      config: { style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@1,5,1": {
      config: { style: "organic" },
      position: { x: 1, y: 5, z: 1 },
      type: "block",
    },
    "block@1,6,1": {
      config: { style: "organic" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,7,1": {
      config: { style: "organic" },
      position: { x: 1, y: 7, z: 1 },
      type: "block",
    },
    "deadlyBlock@0,5,4": {
      config: { style: "volcano" },
      position: { x: 0, y: 5, z: 4 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,2": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,3": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 3 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,4": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 4 },
      type: "deadlyBlock",
    },
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "blacktooth67" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,3": {
      config: { direction: "away", toRoom: "blacktooth71" },
      position: { x: 0, y: 8, z: 3 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
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
