import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "moonbase",
  id: "moonbase34",
  items: {
    "baddie@7,0,1:1rpQ64": {
      config: { activated: false, startDirection: "right", which: "cyberman" },
      position: { x: 7, y: 0, z: 1 },
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
    "deadlyBlock@7,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
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
    "door@0,1,0:1osK28": {
      config: { direction: "right", toRoom: "moonbase33triple" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    "door@3,4,0:11h9wD": {
      config: { direction: "away", toRoom: "moonbase35" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 4 },
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
    left: ["window3", "window2", "window1", "coil"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
