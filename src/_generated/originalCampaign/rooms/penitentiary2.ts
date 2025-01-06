import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary2",
  items: {
    "baddie@6,3,2:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 6, y: 3, z: 2 },
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
    "block@1,3,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    "block@1,4,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "block@4,7,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 7, z: 3 },
      type: "block",
    },
    "block@6,3,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    "block@6,3,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 6, y: 3, z: 1 },
      type: "block",
    },
    "block@6,3,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 6, y: 3, z: 3 },
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
    "door@3,0,0:1sSHAi": {
      config: { direction: "towards", toRoom: "penitentiary1" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,5:ZtKxAh": {
      config: { direction: "away", toRoom: "penitentiary13" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5:2d0pz4": {
      config: { direction: "left", toRoom: "penitentiary3" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "hushPuppy@1,7,0:13y": {
      config: {},
      position: { x: 1, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,1:13y": {
      config: {},
      position: { x: 2, y: 7, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,7,2:13y": {
      config: {},
      position: { x: 3, y: 7, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
      "loop",
    ],
    left: [
      "loop",
      "skeleton",
      "loop",
      "none",
      "none",
      "loop",
      "skeleton",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
