import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  floorSkip: [],
  id: "penitentiary13",
  items: {
    "block@0,3,5:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 0, y: 3, z: 5 },
      type: "block",
    },
    "block@1,0,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 0, z: 1 },
      type: "block",
    },
    "block@1,3,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    "block@2,0,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 2, y: 0, z: 1 },
      type: "block",
    },
    "block@2,3,6:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 2, y: 3, z: 6 },
      type: "block",
    },
    "block@3,3,3:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 3, y: 3, z: 3 },
      type: "block",
    },
    "block@4,3,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 3, z: 2 },
      type: "block",
    },
    "block@5,3,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "deadlyBlock@1,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0:1sSHQ3": {
      config: { direction: "towards", toRoom: "penitentiary2" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "spring@2,3,7:13y": {
      config: {},
      position: { x: 2, y: 3, z: 7 },
      type: "spring",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary14",
  size: { x: 8, y: 4 },
  walls: {
    away: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
    left: ["loop", "loop", "loop", "loop"],
  },
} satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
