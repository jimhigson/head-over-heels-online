import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "moonbase",
  id: "moonbase4",
  items: {
    "block@1,7,0": {
      config: { style: "artificial" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    "block@1,7,1": {
      config: { style: "artificial" },
      position: { x: 1, y: 7, z: 1 },
      type: "block",
    },
    "block@1,7,3": {
      config: { style: "artificial" },
      position: { x: 1, y: 7, z: 3 },
      type: "block",
    },
    "block@2,7,3": {
      config: { style: "artificial" },
      position: { x: 2, y: 7, z: 3 },
      type: "block",
    },
    "block@3,7,3": {
      config: { style: "artificial" },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "artificial" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "block@7,1,1": {
      config: { style: "artificial" },
      position: { x: 7, y: 1, z: 1 },
      type: "block",
    },
    "block@7,2,2": {
      config: { style: "artificial" },
      position: { x: 7, y: 2, z: 2 },
      type: "block",
    },
    "block@7,3,3": {
      config: { style: "artificial" },
      position: { x: 7, y: 3, z: 3 },
      type: "block",
    },
    "deadlyBlock@1,1,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,6,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 6, z: 0 },
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
    "deadlyBlock@3,2,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,5,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,1,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,6,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "moonbase5" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "moonbase1" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "monster@2,5,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "computerBot",
      },
      position: { x: 2, y: 5, z: 0 },
      type: "monster",
    },
    "monster@5,2,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "computerBot",
      },
      position: { x: 5, y: 2, z: 0 },
      type: "monster",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window3",
      "coil",
      "window2",
      "none",
      "none",
      "window2",
      "coil",
      "window1",
    ],
    left: [
      "window3",
      "coil",
      "window2",
      "none",
      "none",
      "window2",
      "coil",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
