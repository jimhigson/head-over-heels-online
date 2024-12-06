import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth75",
  items: {
    "baddie@1,3,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 1, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@4,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 4, y: 4, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@0,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,1:Z1V7nAX": {
      config: { direction: "towards", toRoom: "blacktooth76" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "door@2,8,2:xS2Wq": {
      config: { direction: "away", toRoom: "blacktooth74" },
      position: { x: 2, y: 8, z: 2 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 8 },
  walls: {
    away: ["plain", "shield", "none", "none", "shield", "plain"],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
