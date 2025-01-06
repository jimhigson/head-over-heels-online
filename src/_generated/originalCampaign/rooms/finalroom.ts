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
    "movableBlock@0,2,0:Z1lxgK4": {
      config: {
        movement: "clockwise",
        startDirection: "right",
        style: "anvil",
      },
      position: { x: 0, y: 2, z: 0 },
      type: "movableBlock",
    },
    "sceneryPlayer@0,3,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 0, y: 3, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@0,6,0:Z2h3J70": {
      config: { which: "heels" },
      position: { x: 0, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@0,7,1:JwJT2": {
      config: { which: "head" },
      position: { x: 0, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@1,6,0:JwJT2": {
      config: { which: "head" },
      position: { x: 1, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@1,7,1:JwJT2": {
      config: { which: "head" },
      position: { x: 1, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,0,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 11, y: 0, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,1,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 11, y: 1, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,2,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 11, y: 2, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,3,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 11, y: 3, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,4,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 11, y: 4, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,5,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 11, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@2,6,0:Z2h3J70": {
      config: { which: "heels" },
      position: { x: 2, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@2,7,1:Z2h3J70": {
      config: { which: "heels" },
      position: { x: 2, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@3,6,0:JwJT2": {
      config: { which: "head" },
      position: { x: 3, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@3,7,1:Z2h3J70": {
      config: { which: "heels" },
      position: { x: 3, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@4,6,0:Z2h3J70": {
      config: { which: "heels" },
      position: { x: 4, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@4,7,1:JwJT2": {
      config: { which: "head" },
      position: { x: 4, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@5,6,0:JwJT2": {
      config: { which: "head" },
      position: { x: 5, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@5,7,1:JwJT2": {
      config: { which: "head" },
      position: { x: 5, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@6,6,0:Z2h3J70": {
      config: { which: "heels" },
      position: { x: 6, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@6,7,1:Z2h3J70": {
      config: { which: "heels" },
      position: { x: 6, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@7,6,0:JwJT2": {
      config: { which: "head" },
      position: { x: 7, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@7,7,1:Z2h3J70": {
      config: { which: "heels" },
      position: { x: 7, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@8,7,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 8, y: 7, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@9,7,0:Z1SkXXR": {
      config: { which: "headOverHeels" },
      position: { x: 9, y: 7, z: 0 },
      type: "sceneryPlayer",
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
