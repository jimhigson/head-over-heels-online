import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "green", shade: "basic" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase26",
  items: {
    "baddie@3,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 3, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@4,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 4, y: 0, z: 1 },
      type: "baddie",
    },
    "baddie@5,0,1:Z1xC3bd": {
      config: { activated: false, startDirection: "away", which: "cyberman" },
      position: { x: 5, y: 0, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@2,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,0,0:Z1kFVA9": {
      config: { direction: "right", toRoom: "moonbase23" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:Z8uOSr": {
      config: { direction: "left", toRoom: "moonbase27" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
    left: ["none", "none"],
  },
} satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
