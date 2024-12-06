import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  floorSkip: [],
  id: "safari12",
  items: {
    "baddie@5,5,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 5, y: 5, z: 0 },
      type: "baddie",
    },
    "barrier@4,0,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    "barrier@4,0,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@4,1,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 1, z: 0 },
      type: "barrier",
    },
    "barrier@4,1,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 1, z: 1 },
      type: "barrier",
    },
    "barrier@4,1,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 1, z: 2 },
      type: "barrier",
    },
    "barrier@4,2,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 2, z: 0 },
      type: "barrier",
    },
    "barrier@4,2,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 2, z: 1 },
      type: "barrier",
    },
    "barrier@4,2,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 2, z: 2 },
      type: "barrier",
    },
    "barrier@4,3,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@4,3,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 3, z: 1 },
      type: "barrier",
    },
    "barrier@4,3,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@4,4,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 4, z: 0 },
      type: "barrier",
    },
    "barrier@4,4,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 4, z: 1 },
      type: "barrier",
    },
    "barrier@4,4,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 4, z: 2 },
      type: "barrier",
    },
    "barrier@4,5,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 5, z: 0 },
      type: "barrier",
    },
    "barrier@4,5,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 5, z: 1 },
      type: "barrier",
    },
    "barrier@4,5,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 4, y: 5, z: 2 },
      type: "barrier",
    },
    "deadlyBlock@2,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0:Z2p4JCB": {
      config: { direction: "right", toRoom: "safari11" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "lift@7,5,0:ZTwqnv": {
      config: { bottom: 0, top: 9 },
      position: { x: 7, y: 5, z: 0 },
      type: "lift",
    },
    "portableBlock@3,5,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 3, y: 5, z: 0 },
      type: "portableBlock",
    },
    "slidingDeadly@4,0,0:Z1tM18t": {
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
} satisfies RoomJson<"safari", OriginalCampaignRoomId>;
