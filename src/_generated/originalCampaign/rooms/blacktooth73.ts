import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  floorSkip: [],
  id: "blacktooth73",
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
    "block@1,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@2,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 5, z: 0 },
      type: "block",
    },
    "block@3,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@3,5,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 1 },
      type: "block",
    },
    "block@3,5,2:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 2 },
      type: "block",
    },
    "block@3,5,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 4 },
      type: "block",
    },
    "block@4,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "block@5,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "block@6,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 5, z: 0 },
      type: "block",
    },
    "block@7,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "deadlyBlock@5,5,2:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,5,2:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,3:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 5, z: 3 },
      type: "deadlyBlock",
    },
    "door@0,2,4:uNfbc": {
      config: { direction: "right", toRoom: "blacktooth72" },
      position: { x: 0, y: 2, z: 4 },
      type: "door",
    },
    "door@8,2,2:ZUCh6J": {
      config: { direction: "left", toRoom: "blacktooth74" },
      position: { x: 8, y: 2, z: 2 },
      type: "door",
    },
    "hushPuppy@0,1,2:13y": {
      config: {},
      position: { x: 0, y: 1, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@1,1,1:13y": {
      config: {},
      position: { x: 1, y: 1, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,1,0:13y": {
      config: {},
      position: { x: 2, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,1,0:13y": {
      config: {},
      position: { x: 4, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,3,0:13y": {
      config: {},
      position: { x: 4, y: 3, z: 0 },
      type: "hushPuppy",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
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
    left: ["plain", "shield", "none", "none", "shield", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
