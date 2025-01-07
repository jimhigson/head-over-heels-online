import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  id: "safari15",
  items: {
    "deadlyBlock@0,13,0": {
      config: { style: "spikes" },
      position: { x: 0, y: 13, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,9,0": {
      config: { style: "spikes" },
      position: { x: 0, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,11,0": {
      config: { style: "spikes" },
      position: { x: 1, y: 11, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,12,0": {
      config: { style: "spikes" },
      position: { x: 2, y: 12, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,9,0": {
      config: { style: "spikes" },
      position: { x: 2, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,10,0": {
      config: { style: "spikes" },
      position: { x: 3, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,14,0": {
      config: { style: "spikes" },
      position: { x: 3, y: 14, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,6,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "safari13" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,16,0": {
      config: { direction: "away", toRoom: "safari16" },
      position: { x: 1, y: 16, z: 0 },
      type: "door",
    },
    "monster@0,6,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "monster",
    },
    "monster@1,4,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 1, y: 4, z: 0 },
      type: "monster",
    },
    "monster@2,12,1": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 12, z: 1 },
      type: "monster",
    },
    "monster@2,2,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "monster",
    },
  },
  planet: "safari",
  size: { x: 4, y: 16 },
  walls: {
    away: ["wall", "none", "none", "wall"],
    left: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
