import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "bookworld",
  id: "blacktooth59",
  items: {
    "block@1,0,3": {
      config: { style: "organic" },
      position: { x: 1, y: 0, z: 3 },
      type: "block",
    },
    "block@2,0,3": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 3 },
      type: "block",
    },
    "block@3,0,3": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 3 },
      type: "block",
    },
    "block@4,0,3": {
      config: { style: "organic" },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "block@5,0,3": {
      config: { style: "organic" },
      position: { x: 5, y: 0, z: 3 },
      type: "block",
    },
    "block@6,0,3": {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 3 },
      type: "block",
    },
    "book@0,1,2": {
      config: { slider: false },
      position: { x: 0, y: 1, z: 2 },
      type: "book",
    },
    "book@0,1,4": {
      config: { slider: false },
      position: { x: 0, y: 1, z: 4 },
      type: "book",
    },
    "book@0,1,5": {
      config: { slider: false },
      position: { x: 0, y: 1, z: 5 },
      type: "book",
    },
    "book@0,2,1": {
      config: { slider: false },
      position: { x: 0, y: 2, z: 1 },
      type: "book",
    },
    "book@0,3,0": {
      config: { slider: false },
      position: { x: 0, y: 3, z: 0 },
      type: "book",
    },
    "book@1,1,0": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 0 },
      type: "book",
    },
    "book@1,1,1": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 1 },
      type: "book",
    },
    "book@1,1,2": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 2 },
      type: "book",
    },
    "book@1,1,3": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 3 },
      type: "book",
    },
    "book@1,1,4": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 4 },
      type: "book",
    },
    "book@1,1,5": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 5 },
      type: "book",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,1,6": {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 6 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,1,6": {
      config: { style: "volcano" },
      position: { x: 1, y: 1, z: 6 },
      type: "deadlyBlock",
    },
    "door@3,0,4": {
      config: { direction: "towards", toRoom: "blacktooth58triple" },
      position: { x: 3, y: 0, z: 4 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "blacktooth60" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth63" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "jail",
  size: { x: 8, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "none", "none", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
