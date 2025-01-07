import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus23",
  items: {
    "block@0,3,5": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 5 },
      type: "block",
    },
    "block@0,4,5": {
      config: { disappearing: true, style: "organic" },
      position: { x: 0, y: 4, z: 5 },
      type: "block",
    },
    "block@0,5,5": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 5 },
      type: "block",
    },
    "block@1,5,5": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 5 },
      type: "block",
    },
    "block@2,5,5": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 5, z: 5 },
      type: "block",
    },
    "block@3,5,5": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 5 },
      type: "block",
    },
    "block@4,5,5": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 5, z: 5 },
      type: "block",
    },
    "block@5,5,5": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 5, z: 5 },
      type: "block",
    },
    "block@7,1,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "block@7,1,1": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 1 },
      type: "block",
    },
    "block@7,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "block@7,5,1": {
      config: { disappearing: true, style: "organic" },
      position: { x: 7, y: 5, z: 1 },
      type: "block",
    },
    "block@7,5,2": {
      config: { disappearing: true, style: "organic" },
      position: { x: 7, y: 5, z: 2 },
      type: "block",
    },
    "block@7,5,3": {
      config: { disappearing: true, style: "organic" },
      position: { x: 7, y: 5, z: 3 },
      type: "block",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,1,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,2,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,3,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,5,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,1,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,2,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,3,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,4,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,2,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,3,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,4,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,5,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,0": {
      config: { style: "spikes" },
      position: { x: 7, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,4,0": {
      config: { style: "spikes" },
      position: { x: 7, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus22" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,6,0": {
      config: { direction: "away", toRoom: "egyptus24" },
      position: { x: 3, y: 6, z: 0 },
      type: "door",
    },
    "pickup@0,3,6": {
      config: { gives: "extra-life" },
      position: { x: 0, y: 3, z: 6 },
      type: "pickup",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
