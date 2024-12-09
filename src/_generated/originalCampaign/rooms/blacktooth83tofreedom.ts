import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "blacktooth83tofreedom",
  items: {
    "block@0,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,7,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    "block@0,7,3:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@5,3,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    "block@5,3,1:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 5, y: 3, z: 1 },
      type: "block",
    },
    "block@5,3,2:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 5, y: 3, z: 2 },
      type: "block",
    },
    "block@5,7,0:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "block@5,7,1:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 5, y: 7, z: 1 },
      type: "block",
    },
    "block@5,7,2:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 5, y: 7, z: 2 },
      type: "block",
    },
    "block@6,2,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 6, y: 2, z: 2 },
      type: "block",
    },
    "block@7,1,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 1, z: 2 },
      type: "block",
    },
    "block@7,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "door@0,3,1:uNnbz": {
      config: { direction: "right", toRoom: "blacktooth82" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "hushPuppy@0,0,0:13y": {
      config: {},
      position: { x: 0, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@3,0,0:13y": {
      config: {},
      position: { x: 3, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,0,0:13y": {
      config: {},
      position: { x: 6, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@7,0,0:13y": {
      config: {},
      position: { x: 7, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@7,0,1:13y": {
      config: {},
      position: { x: 7, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "teleporter@7,2,1:XYoHN": {
      config: { toRoom: "finalroom" },
      position: { x: 7, y: 2, z: 1 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
