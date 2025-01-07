import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "safari",
  id: "safari17fish",
  items: {
    "block@3,0,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "block@3,1,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 1, z: 3 },
      type: "block",
    },
    "block@3,2,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 2, z: 3 },
      type: "block",
    },
    "block@3,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 3, z: 3 },
      type: "block",
    },
    "block@3,4,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 4, z: 3 },
      type: "block",
    },
    "block@3,5,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 3 },
      type: "block",
    },
    "block@3,6,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 6, z: 3 },
      type: "block",
    },
    "block@3,7,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    "block@4,0,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "block@4,1,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 1, z: 3 },
      type: "block",
    },
    "block@4,2,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 2, z: 3 },
      type: "block",
    },
    "block@4,3,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 3, z: 3 },
      type: "block",
    },
    "block@4,4,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 4, z: 3 },
      type: "block",
    },
    "block@4,5,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 5, z: 3 },
      type: "block",
    },
    "block@4,6,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 6, z: 3 },
      type: "block",
    },
    "block@4,7,3": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 3 },
      type: "block",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "safari16" },
      position: { x: 3, y: 0, z: 4 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "safari30" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "safari31" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "hushPuppy@0,3,0": {
      config: {},
      position: { x: 0, y: 3, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@1,3,1": {
      config: {},
      position: { x: 1, y: 3, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,3,2": {
      config: {},
      position: { x: 2, y: 3, z: 2 },
      type: "hushPuppy",
    },
    "pickup@4,7,4": {
      config: { gives: "reincarnation" },
      position: { x: 4, y: 7, z: 4 },
      type: "pickup",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
  walls: {
    away: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
