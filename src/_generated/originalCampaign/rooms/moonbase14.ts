import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase14",
  items: {
    "baddie@2,7,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 2, y: 7, z: 0 },
      type: "baddie",
    },
    "baddie@5,2,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 5, y: 2, z: 1 },
      type: "baddie",
    },
    "baddie@5,3,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 5, y: 3, z: 1 },
      type: "baddie",
    },
    "baddie@5,4,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 5, y: 4, z: 1 },
      type: "baddie",
    },
    "baddie@5,5,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 5, y: 5, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@5,2,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0:Z1kG451": {
      config: { direction: "right", toRoom: "moonbase15" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@2,0,0:5Ct4F": {
      config: { direction: "towards", toRoom: "moonbase13" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 8 },
  walls: {
    away: ["window1", "coil", "window3", "window2", "coil", "window1"],
    left: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
  },
} satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
