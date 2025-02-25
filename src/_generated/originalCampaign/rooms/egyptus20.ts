import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "egyptus20",
  items: {
    "block@5,7,0": {
      config: { style: "organic" },
      position: { x: 5, y: 9, z: 0 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,7,0": {
      config: { style: "organic" },
      position: { x: 7, y: 9, z: 0 },
      type: "block",
    },
    disappearingBlock: {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "egyptus21" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    newBlockForLongerRoom: {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
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
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
        times: { y: 5 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus19",
  size: { x: 8, y: 10 },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
