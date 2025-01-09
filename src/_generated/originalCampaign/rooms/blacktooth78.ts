import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth78",
  items: {
    "block@0,1,0": {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@3,7,3": {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    "block@4,7,3": {
      config: { style: "organic" },
      position: { x: 4, y: 7, z: 3 },
      type: "block",
    },
    "block@7,2,0": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,2": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "deadlyBlock@1,0,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,1": {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,2,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,2,1": {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,1": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "blacktooth80" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "blacktooth72" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "lift@1,1,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 1, y: 1, z: 0 },
      type: "lift",
    },
    "monster@4,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    "movableBlock@0,1,1": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 0, y: 1, z: 1 },
      type: "movableBlock",
    },
    "movableBlock@1,1,1": {
      config: {
        activated: false,
        movement: "back-forth",
        startDirection: "right",
        style: "stepStool",
      },
      position: { x: 1, y: 1, z: 1 },
      type: "movableBlock",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth79fish",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
    left: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
