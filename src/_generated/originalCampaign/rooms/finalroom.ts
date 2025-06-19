import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
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
      config: { planet: "blacktooth" },
      position: { x: 7, y: 2, z: 8 },
      type: "sceneryCrown",
    },
    crownBookworld: {
      config: { planet: "bookworld" },
      position: { x: 7, y: 1, z: 1 },
      type: "sceneryCrown",
    },
    crownEgyptus: {
      config: { planet: "egyptus" },
      position: { x: 7, y: 4, z: 0 },
      type: "sceneryCrown",
    },
    crownPenitentiary: {
      config: { planet: "penitentiary" },
      position: { x: 7, y: 0, z: 0 },
      type: "sceneryCrown",
    },
    crownSafari: {
      config: { planet: "safari" },
      position: { x: 7, y: 3, z: 1 },
      type: "sceneryCrown",
    },
    emitter: {
      config: {
        emits: { config: { direction: "left" }, type: "firedDoughnut" },
        maximum: 10,
        period: 2000,
      },
      position: { x: 2, y: 2, z: 1.5 },
      type: "emitter",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 12, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "pushableBlock@0,2,0": {
      config: {},
      position: { x: 0, y: 2, z: 0 },
      type: "pushableBlock",
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
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 12 } },
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
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: -7, y: -5, z: 0 },
      with: { room: "blacktooth83tofreedom" },
    },
  },
  planet: "jail",
  size: { x: 12, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
