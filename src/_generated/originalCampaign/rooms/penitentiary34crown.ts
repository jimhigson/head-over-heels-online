import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary34crown",
  items: {
    "block@0,0,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,0,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    "block@0,0,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    "block@0,0,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "block@0,0,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 0, z: 4 },
      type: "block",
    },
    "block@0,0,5:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 0, z: 5 },
      type: "block",
    },
    "block@0,1,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@0,7,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    "block@7,3,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 3, z: 4 },
      type: "block",
    },
    "block@7,4,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 4, z: 4 },
      type: "block",
    },
    "door@3,8,1:ZtKhzw": {
      config: { direction: "away", toRoom: "penitentiary33" },
      position: { x: 3, y: 8, z: 1 },
      type: "door",
    },
    "movableBlock@7,3,5:1EfFpg": {
      config: { style: "sandwich" },
      position: { x: 7, y: 3, z: 5 },
      type: "movableBlock",
    },
    "pickup@0,0,6:2fxkqv": {
      config: { gives: "crown" },
      position: { x: 0, y: 0, z: 6 },
      type: "pickup",
    },
    "portableBlock@0,7,3:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 0, y: 7, z: 3 },
      type: "portableBlock",
    },
    "teleporter@7,5,4:2mFPXS": {
      config: { toRoom: "penitentiary18fish" },
      position: { x: 7, y: 5, z: 4 },
      type: "teleporter",
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
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
