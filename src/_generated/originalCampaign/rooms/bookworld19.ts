import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld19",
  items: {
    "baddie@0,6,0:1eMnEb": {
      config: {
        activated: true,
        startDirection: "towards",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@1,2,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,3,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,3,1:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 3, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,4,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,4,1:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,0,0:JfhAD": {
      config: { direction: "towards", toRoom: "bookworld20" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0:ZXU0qs": {
      config: { direction: "away", toRoom: "bookworld18" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
