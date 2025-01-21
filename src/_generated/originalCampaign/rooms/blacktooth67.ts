import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth67",
  items: {
    "block@0,0,4": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 4 },
      type: "block",
    },
    "block@0,1,4": {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 4 },
      type: "block",
    },
    "block@0,2,4": {
      config: { style: "organic" },
      position: { x: 0, y: 2, z: 4 },
      type: "block",
    },
    "block@0,3,4": {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 4 },
      type: "block",
    },
    "block@0,4,4": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 4 },
      type: "block",
    },
    "block@0,5,4": {
      config: { style: "organic" },
      position: { x: 0, y: 5, z: 4 },
      type: "block",
    },
    "block@0,6,4": {
      config: { style: "organic" },
      position: { x: 0, y: 6, z: 4 },
      type: "block",
    },
    "block@0,7,4": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    "block@6,3,0": {
      config: { style: "organic" },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,1": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "block@7,4,0": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "block@7,4,1": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 1 },
      type: "block",
    },
    "block@7,4,2": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 2 },
      type: "block",
    },
    "door@0,3,5": {
      config: { direction: "right", toRoom: "blacktooth69" },
      position: { x: 0, y: 3, z: 5 },
      type: "door",
    },
    "door@3,8,4": {
      config: { direction: "away", toRoom: "blacktooth70" },
      position: { x: 3, y: 8, z: 4 },
      type: "door",
    },
    "door@8,3,4": {
      config: { direction: "left", toRoom: "blacktooth66" },
      position: { x: 8, y: 3, z: 4 },
      type: "door",
    },
    "spring@0,0,5": {
      config: {},
      position: { x: 0, y: 0, z: 5 },
      type: "spring",
    },
    towerA0: {
      config: { style: "tower" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    towerA1: {
      config: { style: "tower" },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    towerA2: {
      config: { style: "tower" },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    towerA3: {
      config: { style: "tower" },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    towerB0: {
      config: { style: "tower" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    towerB1: {
      config: { style: "tower" },
      position: { x: 0, y: 7, z: 1 },
      type: "block",
    },
    towerB2: {
      config: { style: "tower" },
      position: { x: 0, y: 7, z: 2 },
      type: "block",
    },
    towerB3: {
      config: { style: "tower" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
  },
  planet: "blacktooth",
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
