import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth80",
  items: {
    "baddie@2,4,0:1eMnEb": {
      config: {
        activated: true,
        startDirection: "towards",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "baddie",
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
    "deadlyBlock@1,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0:Z1V7n5s": {
      config: { direction: "towards", toRoom: "blacktooth78" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0:xSabx": {
      config: { direction: "away", toRoom: "blacktooth81" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 8 },
  walls: {
    away: ["shield", "none", "none", "shield"],
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
