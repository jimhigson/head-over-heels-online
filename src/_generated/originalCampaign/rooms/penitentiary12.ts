import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  id: "penitentiary12",
  items: {
    "block@0,2,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    "block@0,3,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "block@0,4,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 3 },
      type: "block",
    },
    "block@7,0,0:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,0,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 0, z: 1 },
      type: "block",
    },
    "block@7,0,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 0, z: 2 },
      type: "block",
    },
    "door@0,3,4:JcM9U": {
      config: { direction: "right", toRoom: "penitentiary18fish" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,8,0:ZtKw2K": {
      config: { direction: "away", toRoom: "penitentiary19" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0:2uBTjf": {
      config: { direction: "left", toRoom: "penitentiary11" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "hushPuppy@0,0,0:13y": {
      config: {},
      position: { x: 0, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@0,1,3:13y": {
      config: {},
      position: { x: 0, y: 1, z: 3 },
      type: "hushPuppy",
    },
    "hushPuppy@1,0,1:13y": {
      config: {},
      position: { x: 1, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@1,1,2:13y": {
      config: {},
      position: { x: 1, y: 1, z: 2 },
      type: "hushPuppy",
    },
    "pickup@7,0,3:Z2prF0G": {
      config: { gives: "donuts" },
      position: { x: 7, y: 0, z: 3 },
      type: "pickup",
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
