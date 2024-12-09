import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase19",
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
    "door@0,0,0:Z1kG572": {
      config: { direction: "right", toRoom: "moonbase11" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:Z8uQGI": {
      config: { direction: "left", toRoom: "moonbase20" },
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
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
