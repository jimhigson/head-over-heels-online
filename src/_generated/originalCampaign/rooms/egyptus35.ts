import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "egyptus",
  id: "egyptus35",
  items: {
    "block@1,2,4": {
      config: { style: "artificial" },
      position: { x: 1, y: 2, z: 4 },
      type: "block",
    },
    "block@1,3,4": {
      config: { style: "artificial" },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    "block@1,4,3": {
      config: { style: "artificial" },
      position: { x: 1, y: 4, z: 3 },
      type: "block",
    },
    "block@1,5,2": {
      config: { style: "artificial" },
      position: { x: 1, y: 5, z: 2 },
      type: "block",
    },
    "block@1,6,1": {
      config: { style: "artificial" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    "block@1,7,0": {
      config: { style: "artificial" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,7,2": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,5": {
      config: { style: "toaster" },
      position: { x: 1, y: 5, z: 5 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,6,4": {
      config: { style: "toaster" },
      position: { x: 1, y: 6, z: 4 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,7,3": {
      config: { style: "toaster" },
      position: { x: 1, y: 7, z: 3 },
      type: "deadlyBlock",
    },
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "egyptus34fish" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    extra0: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    extra1: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 1, y: 2, z: 1 },
      type: "block",
    },
    extra2: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 1, y: 2, z: 2 },
      type: "block",
    },
    extra3: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 1, y: 2, z: 3 },
      type: "block",
    },
    extrab0: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    extrab1: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 1, y: 5, z: 1 },
      type: "block",
    },
    "portableBlock@0,2,0": {
      config: { style: "drum" },
      position: { x: 0, y: 2, z: 0 },
      type: "portableBlock",
    },
    "spring@1,2,5": {
      config: {},
      position: { x: 1, y: 2, z: 5 },
      type: "spring",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus36",
  size: { x: 2, y: 8 },
  walls: {
    away: ["hieroglyphics", "hieroglyphics"],
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "hieroglyphics",
      "hieroglyphics",
      "hieroglyphics",
      "hieroglyphics",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
