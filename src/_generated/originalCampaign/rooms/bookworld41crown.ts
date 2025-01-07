import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld41crown",
  items: {
    "barrier@3,4,0": {
      config: { axis: "y", disappearing: false },
      position: { x: 3, y: 4, z: 0 },
      type: "barrier",
    },
    "book@2,4,0": {
      config: { slider: true },
      position: { x: 2, y: 4, z: 0 },
      type: "book",
    },
    "book@3,4,1": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 1 },
      type: "book",
    },
    "book@3,4,2": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 2 },
      type: "book",
    },
    "book@3,4,3": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 3 },
      type: "book",
    },
    "book@3,4,4": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 4 },
      type: "book",
    },
    "book@3,4,5": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 5 },
      type: "book",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "bookworld40" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "monster@0,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 4, z: 0 },
      type: "monster",
    },
    "monster@4,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    "pickup@3,4,6": {
      config: { gives: "crown", planet: "bookworld" },
      position: { x: 3, y: 4, z: 6 },
      type: "pickup",
    },
    "portableBlock@0,0,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@0,7,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 7, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 8 },
  walls: {
    away: ["book", "person", "book", "book", "person", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
