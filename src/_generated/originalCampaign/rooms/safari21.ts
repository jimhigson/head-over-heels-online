import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "safari",
  id: "safari21",
  items: {
    "baddie@2,5,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 2, y: 5, z: 0 },
      type: "baddie",
    },
    "baddie@3,2,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 3, y: 2, z: 0 },
      type: "baddie",
    },
    "baddie@4,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 4, y: 4, z: 0 },
      type: "baddie",
    },
    "baddie@5,4,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 5, y: 4, z: 0 },
      type: "baddie",
    },
    "block@0,7,4:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    "block@1,7,3:Z1AdJxh": {
      config: { disappearing: true, style: "organic" },
      position: { x: 1, y: 7, z: 3 },
      type: "block",
    },
    "block@4,7,2:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 4, y: 7, z: 2 },
      type: "block",
    },
    "block@7,7,1:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    "door@0,3,0:Z2p4BRY": {
      config: { direction: "right", toRoom: "safari20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "pickup@0,7,5:Z2prF0G": {
      config: { gives: "donuts" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: [
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
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
