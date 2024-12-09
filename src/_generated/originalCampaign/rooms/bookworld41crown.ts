import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld41crown",
  items: {
    "baddie@0,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 0, y: 4, z: 0 },
      type: "baddie",
    },
    "baddie@4,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 4, y: 4, z: 0 },
      type: "baddie",
    },
    "barrier@3,4,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 3, y: 4, z: 0 },
      type: "barrier",
    },
    "book@2,4,0:1g3d60": {
      config: { slider: true },
      position: { x: 2, y: 4, z: 0 },
      type: "book",
    },
    "book@3,4,1:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 1 },
      type: "book",
    },
    "book@3,4,2:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 2 },
      type: "book",
    },
    "book@3,4,3:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 3 },
      type: "book",
    },
    "book@3,4,4:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 4 },
      type: "book",
    },
    "book@3,4,5:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 4, z: 5 },
      type: "book",
    },
    "door@2,0,0:JfxBo": {
      config: { direction: "towards", toRoom: "bookworld40" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "pickup@3,4,6:2fxkqv": {
      config: { gives: "crown" },
      position: { x: 3, y: 4, z: 6 },
      type: "pickup",
    },
    "portableBlock@0,0,0:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@0,7,0:Z14c3Fl": {
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
