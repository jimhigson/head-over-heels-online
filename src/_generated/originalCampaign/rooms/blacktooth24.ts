import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth24",
  items: {
    "door@8,3,3": {
      config: { direction: "left", toRoom: "blacktooth25" },
      position: { x: 8, y: 3, z: 3 },
      type: "door",
    },
    map: {
      config: { gives: "extra-life" },
      isExtra: true,
      position: { x: 6, y: 7, z: 6 },
      type: "pickup",
    },
    mapStacka0: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    mapStacka1: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 4, y: 7, z: 1 },
      type: "block",
    },
    mapStacka2: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 4, y: 7, z: 2 },
      type: "block",
    },
    mapStackb0: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    mapStackb1: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 5, y: 7, z: 1 },
      type: "block",
    },
    mapStackb2: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 5, y: 7, z: 2 },
      type: "block",
    },
    mapStackb3: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 5, y: 7, z: 3 },
      type: "block",
    },
    mapStackb4: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 5, y: 7, z: 4 },
      type: "block",
    },
    mapStackb5: {
      config: { style: "book" },
      isExtra: true,
      position: { x: 5, y: 7, z: 5 },
      type: "block",
    },
    mapStackc0: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    mapStackc1: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 6, y: 7, z: 1 },
      type: "block",
    },
    mapStackc2: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 6, y: 7, z: 2 },
      type: "block",
    },
    mapStackc3: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 6, y: 7, z: 3 },
      type: "block",
    },
    mapStackc4: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 6, y: 7, z: 4 },
      type: "block",
    },
    mapStackc5: {
      config: { style: "tower" },
      isExtra: true,
      position: { x: 6, y: 7, z: 5 },
      type: "block",
    },
    "spring@4,4,0": {
      config: {},
      position: { x: 4, y: 4, z: 0 },
      type: "spring",
    },
    "teleporter@0,0,0": {
      config: { toPosition: { x: 0, y: 0, z: 0 }, toRoom: "blacktooth23heels" },
      position: { x: 0, y: 0, z: 0 },
      type: "teleporter",
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
