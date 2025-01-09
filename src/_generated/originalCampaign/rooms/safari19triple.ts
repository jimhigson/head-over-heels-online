import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "safari",
  id: "safari19triple",
  items: {
    "barrier@13,0,0": {
      config: { axis: "y" },
      position: { x: 13, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@13,0,1": {
      config: { axis: "y" },
      position: { x: 13, y: 0, z: 1 },
      type: "barrier",
    },
    "barrier@13,0,2": {
      config: { axis: "y" },
      position: { x: 13, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@13,1,0": {
      config: { axis: "y" },
      position: { x: 13, y: 1, z: 0 },
      type: "barrier",
    },
    "barrier@13,1,1": {
      config: { axis: "y" },
      position: { x: 13, y: 1, z: 1 },
      type: "barrier",
    },
    "barrier@13,1,2": {
      config: { axis: "y" },
      position: { x: 13, y: 1, z: 2 },
      type: "barrier",
    },
    "barrier@13,2,0": {
      config: { axis: "y" },
      position: { x: 13, y: 2, z: 0 },
      type: "barrier",
    },
    "barrier@13,2,1": {
      config: { axis: "y" },
      position: { x: 13, y: 2, z: 1 },
      type: "barrier",
    },
    "barrier@13,2,2": {
      config: { axis: "y" },
      position: { x: 13, y: 2, z: 2 },
      type: "barrier",
    },
    "barrier@13,3,0": {
      config: { axis: "y" },
      position: { x: 13, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@13,3,1": {
      config: { axis: "y" },
      position: { x: 13, y: 3, z: 1 },
      type: "barrier",
    },
    "barrier@13,3,2": {
      config: { axis: "y" },
      position: { x: 13, y: 3, z: 2 },
      type: "barrier",
    },
    "block@0,9,0": {
      config: { style: "tower" },
      position: { x: 0, y: 9, z: 0 },
      type: "block",
    },
    "block@0,9,1": {
      config: { style: "tower" },
      position: { x: 0, y: 9, z: 1 },
      type: "block",
    },
    "block@0,9,2": {
      config: { style: "tower" },
      position: { x: 0, y: 9, z: 2 },
      type: "block",
    },
    "block@0,9,3": {
      config: { style: "tower" },
      position: { x: 0, y: 9, z: 3 },
      type: "block",
    },
    "block@0,9,4": {
      config: { style: "tower" },
      position: { x: 0, y: 9, z: 4 },
      type: "block",
    },
    "block@0,9,5": {
      config: { style: "tower" },
      position: { x: 0, y: 9, z: 5 },
      type: "block",
    },
    "block@6,6,0": {
      config: { style: "organic" },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "block@6,7,0": {
      config: { style: "organic" },
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    "block@6,8,0": {
      config: { style: "organic" },
      position: { x: 6, y: 8, z: 0 },
      type: "block",
    },
    "door@16,1,0": {
      config: { direction: "left", toRoom: "safari20" },
      position: { x: 16, y: 1, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "safari18" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,10,0": {
      config: { direction: "away", toRoom: "safari25" },
      position: { x: 3, y: 10, z: 0 },
      type: "door",
    },
    keepMonsterInPlace0: {
      config: { axis: "y" },
      position: { x: 8, y: 0, z: 0 },
      type: "barrier",
    },
    keepMonsterInPlace1: {
      config: { axis: "y" },
      position: { x: 8, y: 1, z: 0 },
      type: "barrier",
    },
    keepMonsterInPlace2: {
      config: { axis: "y" },
      position: { x: 8, y: 2, z: 0 },
      type: "barrier",
    },
    keepMonsterInPlace3: {
      config: { axis: "y" },
      position: { x: 8, y: 3, z: 0 },
      type: "barrier",
    },
    "monster@12,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 12, y: 0, z: 0 },
      type: "monster",
    },
    "pickup@0,9,6": {
      config: { gives: "extra-life" },
      position: { x: 0, y: 9, z: 6 },
      type: "pickup",
    },
    "portableBlock@12,0,1": {
      config: { style: "drum" },
      position: { x: 12, y: 0, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@6,6,1": {
      config: { style: "drum" },
      position: { x: 6, y: 6, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@6,8,1": {
      config: { style: "drum" },
      position: { x: 6, y: 8, z: 1 },
      type: "portableBlock",
    },
    "spring@6,7,1": {
      config: {},
      position: { x: 6, y: 7, z: 1 },
      type: "spring",
    },
    "wall@10,4,0": {
      config: { side: "away", style: "wall" },
      position: { x: 10, y: 4, z: 0 },
      type: "wall",
    },
    "wall@11,4,0": {
      config: { side: "away", style: "shield" },
      position: { x: 11, y: 4, z: 0 },
      type: "wall",
    },
    "wall@12,4,0": {
      config: { side: "away", style: "shield" },
      position: { x: 12, y: 4, z: 0 },
      type: "wall",
    },
    "wall@13,4,0": {
      config: { side: "away", style: "wall" },
      position: { x: 13, y: 4, z: 0 },
      type: "wall",
    },
    "wall@14,4,0": {
      config: { side: "away", style: "window" },
      position: { x: 14, y: 4, z: 0 },
      type: "wall",
    },
    "wall@15,4,0": {
      config: { side: "away", style: "wall" },
      position: { x: 15, y: 4, z: 0 },
      type: "wall",
    },
    "wall@8,4,0:BKGHK": {
      config: { side: "left", style: "shield" },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
    "wall@8,4,0:Z1Jyjna": {
      config: { side: "away", style: "wall" },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: { side: "left", style: "wall" },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
    "wall@8,6,0": {
      config: { side: "left", style: "window" },
      position: { x: 8, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,7,0": {
      config: { side: "left", style: "window" },
      position: { x: 8, y: 7, z: 0 },
      type: "wall",
    },
    "wall@8,8,0": {
      config: { side: "left", style: "wall" },
      position: { x: 8, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,9,0": {
      config: { side: "left", style: "shield" },
      position: { x: 8, y: 9, z: 0 },
      type: "wall",
    },
    "wall@9,4,0": {
      config: { side: "away", style: "window" },
      position: { x: 9, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 16, y: 10 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "none",
      "none",
      "wall",
      "window",
      "wall",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
    left: [
      "wall",
      "none",
      "none",
      "wall",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
