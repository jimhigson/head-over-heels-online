import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus39crown",
  items: {
    "block@3,3,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    "block@3,3,1": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 3, y: 3, z: 1 },
      type: "block",
    },
    "block@3,3,2": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 3, y: 3, z: 2 },
      type: "block",
    },
    "block@4,3,0": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@4,3,1": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 1 },
      type: "block",
    },
    "block@4,3,2": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 2 },
      type: "block",
    },
    "block@4,3,3": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 3 },
      type: "block",
    },
    "block@4,3,4": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 4 },
      type: "block",
    },
    "block@4,3,5": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 5 },
      type: "block",
    },
    "block@4,3,6": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 6 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "egyptus38" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "monster@3,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 0, z: 0 },
      type: "monster",
    },
    "monster@3,7,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 7, z: 0 },
      type: "monster",
    },
    "pickup@4,3,7": {
      config: { gives: "crown", planet: "egyptus" },
      position: { x: 4, y: 3, z: 7 },
      type: "pickup",
    },
    "portableBlock@3,3,3": {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 3 },
      type: "portableBlock",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
