import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "penitentiary",
  id: "finalroom",
  items: {
    "block@0,2,1": {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 0, y: 2, z: 1 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,2,1": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 1 },
      type: "block",
    },
    crownBlacktooth: {
      config: { gives: "crown", planet: "blacktooth" },
      position: { x: 7, y: 2, z: 6 },
      type: "pickup",
    },
    crownBookworld: {
      config: { gives: "crown", planet: "bookworld" },
      position: { x: 7, y: 1, z: 1 },
      type: "pickup",
    },
    crownEgyptus: {
      config: { gives: "crown", planet: "egyptus" },
      position: { x: 7, y: 4, z: 0 },
      type: "pickup",
    },
    crownPenitentiary: {
      config: { gives: "crown", planet: "penitentiary" },
      position: { x: 7, y: 0, z: 0 },
      type: "pickup",
    },
    crownSafari: {
      config: { gives: "crown", planet: "safari" },
      position: { x: 7, y: 3, z: 1 },
      type: "pickup",
    },
    "movingPlatform@0,2,0": {
      config: {
        activated: "off",
        movement: "clockwise",
        startDirection: "right",
        style: "stepStool",
      },
      position: { x: 0, y: 2, z: 0 },
      type: "movingPlatform",
    },
    "sceneryPlayer@0,3,0": {
      config: { startDirection: "towards", which: "headOverHeels" },
      position: { x: 0, y: 3, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@0,6,0": {
      config: { startDirection: "towardsLeft", which: "heels" },
      position: { x: 0, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@0,7,1": {
      config: { startDirection: "towardsLeft", which: "head" },
      position: { x: 0, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@1,6,0": {
      config: { startDirection: "towardsLeft", which: "head" },
      position: { x: 1, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@1,7,1": {
      config: { startDirection: "towardsLeft", which: "head" },
      position: { x: 1, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,0,0": {
      config: { startDirection: "awayRight", which: "headOverHeels" },
      position: { x: 11, y: 0, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,1,0": {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 11, y: 1, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,2,0": {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 11, y: 2, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,3,0": {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 11, y: 3, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,4,0": {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 11, y: 4, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@11,5,0": {
      config: { startDirection: "towardsRight", which: "headOverHeels" },
      position: { x: 11, y: 5, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@2,6,0": {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 2, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@2,7,1": {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 2, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@3,6,0": {
      config: { startDirection: "towards", which: "head" },
      position: { x: 3, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@3,7,1": {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 3, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@4,6,0": {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 4, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@4,7,1": {
      config: { startDirection: "towards", which: "head" },
      position: { x: 4, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@5,6,0": {
      config: { startDirection: "towards", which: "head" },
      position: { x: 5, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@5,7,1": {
      config: { startDirection: "towards", which: "head" },
      position: { x: 5, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@6,6,0": {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 6, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@6,7,1": {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 6, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@7,6,0": {
      config: { startDirection: "towards", which: "head" },
      position: { x: 7, y: 6, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@7,7,1": {
      config: { startDirection: "towards", which: "heels" },
      position: { x: 7, y: 7, z: 1 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@8,7,0": {
      config: { startDirection: "towards", which: "headOverHeels" },
      position: { x: 8, y: 7, z: 0 },
      type: "sceneryPlayer",
    },
    "sceneryPlayer@9,7,0": {
      config: { startDirection: "towardsRight", which: "headOverHeels" },
      position: { x: 9, y: 7, z: 0 },
      type: "sceneryPlayer",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Za9xLq": {
      config: { direction: "towards", tiles: [], times: { x: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
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
        times: { x: 12 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@12,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
        times: { y: 8 },
      },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    winner: {
      config: { startDirection: "right", which: "headOverHeels" },
      position: { x: 7, y: 2, z: 2 },
      type: "sceneryPlayer",
    },
  },
  planet: "jail",
  size: { x: 12, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
