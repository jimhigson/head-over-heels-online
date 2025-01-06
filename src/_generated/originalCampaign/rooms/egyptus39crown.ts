import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus39crown",
  items: {
    "baddie@3,0,0:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 0, z: 0 },
      type: "baddie",
    },
    "baddie@3,7,0:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 7, z: 0 },
      type: "baddie",
    },
    "block@3,3,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    "block@3,3,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 3, y: 3, z: 1 },
      type: "block",
    },
    "block@3,3,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 3, y: 3, z: 2 },
      type: "block",
    },
    "block@4,3,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 0 },
      type: "block",
    },
    "block@4,3,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 1 },
      type: "block",
    },
    "block@4,3,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 2 },
      type: "block",
    },
    "block@4,3,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 3 },
      type: "block",
    },
    "block@4,3,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 4 },
      type: "block",
    },
    "block@4,3,5:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 5 },
      type: "block",
    },
    "block@4,3,6:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 6 },
      type: "block",
    },
    "door@0,3,0:2rMFk9": {
      config: { direction: "right", toRoom: "egyptus38" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "pickup@4,3,7:2fxkqv": {
      config: { gives: "crown" },
      position: { x: 4, y: 3, z: 7 },
      type: "pickup",
    },
    "portableBlock@3,3,3:Z1UEQTQ": {
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
