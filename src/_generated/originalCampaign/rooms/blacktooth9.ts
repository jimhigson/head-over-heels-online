import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "deadly",
  id: "blacktooth9",
  items: {
    "block@0,4,0": {
      config: { style: "organic", times: { z: 3 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@3,4,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@3,4,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 4, z: 1 },
      type: "block",
    },
    "block@3,4,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 4, z: 2 },
      type: "block",
    },
    "block@3,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 7, z: 1 },
      type: "block",
    },
    "block@3,7,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 7, z: 2 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,7,1": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "blacktooth8fish" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "pickup@0,4,7": {
      config: { gives: "hooter" },
      position: { x: 0, y: 4, z: 7 },
      type: "pickup",
    },
    scroll: {
      config: { gives: "scroll", page: "hooter" },
      position: { x: 7, y: 1, z: 1 },
      type: "pickup",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: -1, y: 2, z: 0 },
      with: { room: "blacktooth1head" },
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
