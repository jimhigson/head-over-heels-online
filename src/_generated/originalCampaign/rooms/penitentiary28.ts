import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  floorSkip: [],
  id: "penitentiary28",
  items: {
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,3,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 1 },
      type: "block",
    },
    "block@0,3,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "door@0,3,4:1QJMsM": {
      config: { direction: "right", toRoom: "penitentiary29" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,0,4:Z4XP19": {
      config: { direction: "towards", toRoom: "penitentiary30" },
      position: { x: 3, y: 0, z: 4 },
      type: "door",
    },
    "door@8,3,0:2uC3R9": {
      config: { direction: "left", toRoom: "penitentiary27" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "hushPuppy@2,0,0:13y": {
      config: {},
      position: { x: 2, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@3,0,1:13y": {
      config: {},
      position: { x: 3, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@4,0,2:13y": {
      config: {},
      position: { x: 4, y: 0, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
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
