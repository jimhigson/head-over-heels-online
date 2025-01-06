import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "egyptus",
  id: "egyptus2",
  items: {
    "baddie@2,3,0:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@2,4,0:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "baddie",
    },
    "block@0,3,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@6,3,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 6, y: 3, z: 3 },
      type: "block",
    },
    "block@6,4,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 6, y: 4, z: 3 },
      type: "block",
    },
    "block@7,3,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 3, z: 3 },
      type: "block",
    },
    "block@7,4,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    "door@0,3,1:2mUeta": {
      config: { direction: "right", toRoom: "egyptus1" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@8,3,5:Z1mcXI8": {
      config: { direction: "left", toRoom: "egyptus3" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "hushPuppy@3,4,0:13y": {
      config: {},
      position: { x: 3, y: 4, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,4,1:13y": {
      config: {},
      position: { x: 4, y: 4, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@5,4,2:13y": {
      config: {},
      position: { x: 5, y: 4, z: 2 },
      type: "hushPuppy",
    },
    "spring@6,3,4:13y": {
      config: {},
      position: { x: 6, y: 3, z: 4 },
      type: "spring",
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
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
