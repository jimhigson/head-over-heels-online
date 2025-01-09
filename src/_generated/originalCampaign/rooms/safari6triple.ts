import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "safari6triple",
  items: {
    "block@0,0,0": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,11,0": {
      config: { style: "organic" },
      position: { x: 0, y: 11, z: 0 },
      type: "block",
    },
    "block@0,2,0": {
      config: { style: "organic" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,3,0": {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@1,10,0": {
      config: { style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    "block@1,8,0": {
      config: { style: "organic" },
      position: { x: 1, y: 8, z: 0 },
      type: "block",
    },
    "block@10,2,0": {
      config: { style: "organic" },
      position: { x: 10, y: 2, z: 0 },
      type: "block",
    },
    "block@10,4,0": {
      config: { style: "organic" },
      position: { x: 10, y: 4, z: 0 },
      type: "block",
    },
    "block@10,5,0": {
      config: { style: "organic" },
      position: { x: 10, y: 5, z: 0 },
      type: "block",
    },
    "block@11,0,0": {
      config: { style: "organic" },
      position: { x: 11, y: 0, z: 0 },
      type: "block",
    },
    "block@11,2,0": {
      config: { style: "organic" },
      position: { x: 11, y: 2, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,2,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "block@3,8,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 8, z: 0 },
      type: "block",
    },
    "block@5,2,0": {
      config: { style: "organic" },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    "block@5,5,0": {
      config: { style: "organic" },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "block@5,6,0": {
      config: { style: "organic" },
      position: { x: 5, y: 6, z: 0 },
      type: "block",
    },
    "block@5,8,0": {
      config: { style: "organic" },
      position: { x: 5, y: 8, z: 0 },
      type: "block",
    },
    "block@6,2,0": {
      config: { style: "organic" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "block@6,5,0": {
      config: { style: "organic" },
      position: { x: 6, y: 5, z: 0 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,2,0": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@8,5,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 8, y: 5, z: 0 },
      type: "block",
    },
    "block@9,0,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 9, y: 0, z: 0 },
      type: "block",
    },
    "door@0,2,1": {
      config: { direction: "right", toRoom: "safari5" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    "door@6,8,2": {
      config: { direction: "left", toRoom: "safari7" },
      position: { x: 6, y: 8, z: 2 },
      type: "door",
    },
    "door@8,6,2": {
      config: { direction: "away", toRoom: "safari7" },
      position: { x: 8, y: 6, z: 2 },
      type: "door",
    },
    "pickup@0,11,1": {
      config: { gives: "shield" },
      position: { x: 0, y: 11, z: 1 },
      type: "pickup",
    },
    "wall@10,6,0": {
      config: { side: "away", style: "shield" },
      position: { x: 10, y: 6, z: 0 },
      type: "wall",
    },
    "wall@11,6,0": {
      config: { side: "away", style: "wall" },
      position: { x: 11, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,10,0": {
      config: { side: "left", style: "shield" },
      position: { x: 6, y: 10, z: 0 },
      type: "wall",
    },
    "wall@6,11,0": {
      config: { side: "left", style: "wall" },
      position: { x: 6, y: 11, z: 0 },
      type: "wall",
    },
    "wall@6,6,0:Z1Jyjna": {
      config: { side: "away", style: "wall" },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,6,0:rwVyt": {
      config: { side: "left", style: "wall" },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,7,0": {
      config: { side: "left", style: "shield" },
      position: { x: 6, y: 7, z: 0 },
      type: "wall",
    },
    "wall@7,6,0": {
      config: { side: "away", style: "shield" },
      position: { x: 7, y: 6, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 12, y: 12 },
  walls: {
    away: [
      "shield",
      "wall",
      "window",
      "window",
      "wall",
      "shield",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
    left: [
      "shield",
      "wall",
      "window",
      "window",
      "wall",
      "shield",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
