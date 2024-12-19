import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "jail",
  id: "finalroom",
  items: {
    "block@0,2,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 2, z: 1 },
      type: "block",
    },
    "block@0,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@1,2,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 2, z: 1 },
      type: "block",
    },
    "block@1,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@2,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@4,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@5,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "block@6,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    "block@7,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,2,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 1 },
      type: "block",
    },
    "block@7,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "movableBlock@0,2,0:Z15GVb5": {
      config: { style: "anvil" },
      position: { x: 0, y: 2, z: 0 },
      type: "movableBlock",
    },
  },
  planet: "jail",
  size: { x: 12, y: 8 },
  walls: {
    away: [
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
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
