import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "cyan", shade: "basic" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase2",
  items: {
    "baddie@0,5,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 0, y: 5, z: 0 },
      type: "baddie",
    },
    "baddie@7,1,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 7, y: 1, z: 1 },
      type: "baddie",
    },
    "baddie@7,2,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 7, y: 2, z: 1 },
      type: "baddie",
    },
    "baddie@7,3,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 7, y: 3, z: 1 },
      type: "baddie",
    },
    "baddie@7,4,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 7, y: 4, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@7,1,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,4,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0:1Aqaro": {
      config: { direction: "right", toRoom: "moonbase1" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,4:Z2q5jP1": {
      config: { direction: "away", toRoom: "moonbase3" },
      position: { x: 3, y: 6, z: 4 },
      type: "door",
    },
    "hushPuppy@2,5,0:13y": {
      config: {},
      position: { x: 2, y: 5, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@3,5,1:13y": {
      config: {},
      position: { x: 3, y: 5, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@4,5,2:13y": {
      config: {},
      position: { x: 4, y: 5, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "window2",
      "coil",
      "window3",
      "none",
      "none",
      "window3",
      "coil",
      "window1",
    ],
    left: ["window1", "coil", "window3", "window2", "coil", "window1"],
  },
} satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
