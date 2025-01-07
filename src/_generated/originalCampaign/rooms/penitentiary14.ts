import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "penitentiary14",
  items: {
    "block@0,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@1,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@1,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,4,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 4, z: 0 },
      type: "block",
    },
    "block@2,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 2, y: 5, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "block@4,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    "block@4,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "block@5,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@5,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "block@6,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 5, z: 0 },
      type: "block",
    },
    "block@7,0,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,5,0": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "lift@0,1,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 1, z: 0 },
      type: "lift",
    },
    "portableBlock@6,5,1": {
      config: { style: "sticks" },
      position: { x: 6, y: 5, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@7,5,1": {
      config: { style: "sticks" },
      position: { x: 7, y: 5, z: 1 },
      type: "portableBlock",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary15",
  roomBelow: "penitentiary13",
  size: { x: 8, y: 6 },
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
    left: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
