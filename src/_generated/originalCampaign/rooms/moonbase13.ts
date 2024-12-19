import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase13",
  items: {
    "baddie@0,2,1:2q6IfP": {
      config: { activated: false, startDirection: "left", which: "cyberman" },
      position: { x: 0, y: 2, z: 1 },
      type: "baddie",
    },
    "baddie@0,3,1:2q6IfP": {
      config: { activated: false, startDirection: "left", which: "cyberman" },
      position: { x: 0, y: 3, z: 1 },
      type: "baddie",
    },
    "baddie@0,4,1:2q6IfP": {
      config: { activated: false, startDirection: "left", which: "cyberman" },
      position: { x: 0, y: 4, z: 1 },
      type: "baddie",
    },
    "baddie@0,5,1:2q6IfP": {
      config: { activated: false, startDirection: "left", which: "cyberman" },
      position: { x: 0, y: 5, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@0,2,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,3,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,5,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0:Z1iR2Tl": {
      config: { direction: "towards", toRoom: "moonbase3" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0:11gSg8": {
      config: { direction: "away", toRoom: "moonbase14" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "door@4,3,0:Z8uX9z": {
      config: { direction: "left", toRoom: "moonbase16" },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 4, y: 8 },
  walls: {
    away: ["window3", "none", "none", "window1"],
    left: [
      "window2",
      "coil",
      "window3",
      "none",
      "none",
      "window3",
      "coil",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
