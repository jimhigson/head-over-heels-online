import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "deadly",
  id: "egyptus17",
  items: {
    "baddie@5,1,0:2eI3Ll": {
      config: { activated: true, startDirection: "away", which: "turtle" },
      position: { x: 5, y: 1, z: 0 },
      type: "baddie",
    },
    "block@0,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@1,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@10,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 10, y: 5, z: 0 },
      type: "block",
    },
    "block@11,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 11, y: 2, z: 0 },
      type: "block",
    },
    "block@11,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 11, y: 3, z: 0 },
      type: "block",
    },
    "block@11,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 11, y: 5, z: 0 },
      type: "block",
    },
    "block@2,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 5, z: 0 },
      type: "block",
    },
    "block@3,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@4,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "block@5,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "block@6,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 5, z: 0 },
      type: "block",
    },
    "block@7,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "block@8,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 8, y: 5, z: 0 },
      type: "block",
    },
    "block@9,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 9, y: 5, z: 0 },
      type: "block",
    },
    "deadlyBlock@4,1,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 4, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@12,2,2:Z1B0mUW": {
      config: { direction: "left", toRoom: "egyptus18" },
      position: { x: 12, y: 2, z: 2 },
      type: "door",
    },
    "door@2,0,1:ZruO4m": {
      config: { direction: "towards", toRoom: "egyptus16" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "portableBlock@1,0,1:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 1, y: 0, z: 1 },
      type: "portableBlock",
    },
  },
  planet: "egyptus",
  size: { x: 12, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
