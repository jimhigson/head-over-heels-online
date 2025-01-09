import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "bookworld",
  id: "bookworld36",
  items: {
    "block@7,2,0": {
      config: { style: "book" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,2,1": {
      config: { style: "book" },
      position: { x: 7, y: 2, z: 1 },
      type: "block",
    },
    "block@7,2,2": {
      config: { style: "book" },
      position: { x: 7, y: 2, z: 2 },
      type: "block",
    },
    "door@3,6,5": {
      config: { direction: "away", toRoom: "bookworld37" },
      position: { x: 3, y: 6, z: 5 },
      type: "door",
    },
    "door@8,2,5": {
      config: { direction: "left", toRoom: "bookworld35" },
      position: { x: 8, y: 2, z: 5 },
      type: "door",
    },
    "monster@1,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 1, y: 0, z: 0 },
      type: "monster",
    },
    "portableBlock@1,5,0": {
      config: { style: "sticks" },
      position: { x: 1, y: 5, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,1,0": {
      config: { style: "sticks" },
      position: { x: 3, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,3,0": {
      config: { style: "sticks" },
      position: { x: 4, y: 3, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 6 },
  walls: {
    away: ["book", "book", "person", "none", "none", "person", "book", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
