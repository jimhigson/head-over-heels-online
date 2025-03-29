import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus23",
  items: {
    "block@0,3,5": {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 5 },
      type: "block",
    },
    "block@0,4,5": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 4, z: 5 },
      type: "block",
    },
    "block@0,5,5": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 5, z: 5 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,5,0": {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "block@7,5,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 7, y: 5, z: 1 },
      type: "block",
    },
    "block@7,5,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 7, y: 5, z: 2 },
      type: "block",
    },
    "block@7,5,3": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 7, y: 5, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "volcano", times: { x: 3, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus22" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,6,0": {
      config: { direction: "away", toRoom: "egyptus24" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    "pickup@0,3,6": {
      config: { gives: "extra-life" },
      position: { x: 0, y: 3, z: 6 },
      type: "pickup",
    },
    "spikes@7,2,0": {
      config: {},
      position: { x: 7, y: 2, z: 0 },
      type: "spikes",
    },
    "spikes@7,4,0": {
      config: {},
      position: { x: 7, y: 4, z: 0 },
      type: "spikes",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { x: 3 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,6,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { x: 3 },
      },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
