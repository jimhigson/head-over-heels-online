import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "bookworld",
  id: "bookworld26",
  items: {
    "block@3,0,0": {
      config: { style: "book" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,1": {
      config: { style: "book" },
      position: { x: 3, y: 0, z: 1 },
      type: "block",
    },
    "block@3,0,2": {
      config: { style: "book" },
      position: { x: 3, y: 0, z: 2 },
      type: "block",
    },
    "block@3,0,4": {
      config: { style: "book" },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "bookworld20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@4,3,0": {
      config: { direction: "left", toRoom: "bookworld25" },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
    "monster@3,7,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 7, z: 0 },
      type: "monster",
    },
    "pickup@3,0,5": {
      config: { gives: "doughnuts" },
      position: { x: 3, y: 0, z: 5 },
      type: "pickup",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
  walls: {
    away: ["book", "book", "book", "book"],
    left: ["book", "book", "person", "none", "none", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
