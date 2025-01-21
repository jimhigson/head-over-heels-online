import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  id: "safari12",
  items: {
    "barrier@4,0,1": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    "barrier@4,0,2": {
      config: { axis: "y" },
      position: { x: 4, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@4,1,0": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 0 },
      type: "barrier",
    },
    "barrier@4,1,1": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 1 },
      type: "barrier",
    },
    "barrier@4,1,2": {
      config: { axis: "y" },
      position: { x: 4, y: 1, z: 2 },
      type: "barrier",
    },
    "barrier@4,2,0": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 0 },
      type: "barrier",
    },
    "barrier@4,2,1": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 1 },
      type: "barrier",
    },
    "barrier@4,2,2": {
      config: { axis: "y" },
      position: { x: 4, y: 2, z: 2 },
      type: "barrier",
    },
    "barrier@4,3,0": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@4,3,1": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 1 },
      type: "barrier",
    },
    "barrier@4,3,2": {
      config: { axis: "y" },
      position: { x: 4, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@4,4,0": {
      config: { axis: "y" },
      position: { x: 4, y: 4, z: 0 },
      type: "barrier",
    },
    "barrier@4,4,1": {
      config: { axis: "y" },
      position: { x: 4, y: 4, z: 1 },
      type: "barrier",
    },
    "barrier@4,4,2": {
      config: { axis: "y" },
      position: { x: 4, y: 4, z: 2 },
      type: "barrier",
    },
    "barrier@4,5,0": {
      config: { axis: "y" },
      position: { x: 4, y: 5, z: 0 },
      type: "barrier",
    },
    "barrier@4,5,1": {
      config: { axis: "y" },
      position: { x: 4, y: 5, z: 1 },
      type: "barrier",
    },
    "barrier@4,5,2": {
      config: { axis: "y" },
      position: { x: 4, y: 5, z: 2 },
      type: "barrier",
    },
    "deadlyBlock@2,1,0": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "safari11" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "lift@7,5,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 5, z: 0 },
      type: "lift",
    },
    "monster@5,5,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 5, y: 5, z: 0 },
      type: "monster",
    },
    "portableBlock@3,5,0": {
      config: { style: "drum" },
      position: { x: 3, y: 5, z: 0 },
      type: "portableBlock",
    },
    "slidingDeadly@4,0,0": {
      config: { style: "puck" },
      position: { x: 4, y: 0, z: 0 },
      type: "slidingDeadly",
    },
  },
  planet: "safari",
  roomAbove: "safari13",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: ["shield", "wall", "window", "window", "wall", "shield"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
