import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  floorSkip: [],
  id: "safari15",
  items: {
    "baddie@0,6,0:ZiWCzO": {
      config: {
        activated: true,
        startDirection: "right",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "baddie",
    },
    "baddie@1,4,0:ZiWCzO": {
      config: {
        activated: true,
        startDirection: "right",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 1, y: 4, z: 0 },
      type: "baddie",
    },
    "baddie@2,12,1:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 2, y: 12, z: 1 },
      type: "baddie",
    },
    "baddie@2,2,0:ZiWCzO": {
      config: {
        activated: true,
        startDirection: "right",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@0,13,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 0, y: 13, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,9,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 0, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,11,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 1, y: 11, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,12,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 2, y: 12, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,9,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 2, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,10,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 3, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,14,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 3, y: 14, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0:rjqs3": {
      config: { direction: "towards", toRoom: "safari13" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,16,0:Z2mYrkN": {
      config: { direction: "away", toRoom: "safari16" },
      position: { x: 1, y: 16, z: 0 },
      type: "door",
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
} satisfies RoomJson<"safari", OriginalCampaignRoomId>;
