import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "egyptus19",
  items: {
    "barrier@7,3,2": {
      config: { axis: "y" },
      position: { x: 7, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@7,3,4": {
      config: { axis: "y" },
      position: { x: 7, y: 3, z: 4 },
      type: "barrier",
    },
    "barrier@7,3,6": {
      config: { axis: "y" },
      position: { x: 7, y: 3, z: 6 },
      type: "barrier",
    },
    "block@0,7,0": {
      config: { style: "organic" },
      position: { x: 0, y: 9, z: 0 },
      type: "block",
    },
    "block@2,7,1": {
      config: { style: "organic" },
      position: { x: 2, y: 9, z: 1 },
      type: "block",
    },
    "block@4,7,2": {
      config: { style: "organic" },
      position: { x: 4, y: 9, z: 2 },
      type: "block",
    },
    "block@7,0,7": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 7 },
      type: "block",
    },
    "block@7,1,0": {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "lift@5,7,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 5, y: 9, z: 0 },
      type: "lift",
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
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
        times: { y: 10 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus20",
  roomBelow: "egyptus14",
  size: { x: 8, y: 10, z: 12 },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
