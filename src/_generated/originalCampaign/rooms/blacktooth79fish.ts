import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "blacktooth79fish",
  items: {
    "block@1,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    "block@1,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    "block@1,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "block@1,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@1,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@1,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@6,0,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@7,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "pickup@7,0,1:ZPJAGD": {
      config: { gives: "reincarnation" },
      position: { x: 7, y: 0, z: 1 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  roomBelow: "blacktooth78",
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
