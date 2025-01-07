import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "bookworld",
  id: "bookworld12fish",
  items: {
    "book@0,7,0": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 0 },
      type: "book",
    },
    "book@0,7,1": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 1 },
      type: "book",
    },
    "book@0,7,2": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 2 },
      type: "book",
    },
    "book@0,7,3": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 3 },
      type: "book",
    },
    "book@0,7,4": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 4 },
      type: "book",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "bookworld13" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "bookworld4" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "movableBlock@3,4,0": {
      config: { movement: "free", style: "stepStool" },
      position: { x: 3, y: 4, z: 0 },
      type: "movableBlock",
    },
    "pickup@0,7,5": {
      config: { gives: "reincarnation" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
    },
    "portableBlock@5,7,0": {
      config: { style: "cube" },
      position: { x: 5, y: 7, z: 0 },
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
