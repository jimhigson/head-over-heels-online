import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "deadly",
  id: "bookworld18",
  items: {
    "book@0,5,0": {
      config: { slider: false },
      position: { x: 0, y: 5, z: 0 },
      type: "book",
    },
    "book@0,5,1": {
      config: { slider: false },
      position: { x: 0, y: 5, z: 1 },
      type: "book",
    },
    "book@0,5,2": {
      config: { slider: false },
      position: { x: 0, y: 5, z: 2 },
      type: "book",
    },
    "book@0,5,3": {
      config: { slider: false },
      position: { x: 0, y: 5, z: 3 },
      type: "book",
    },
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
    "book@2,0,0": {
      config: { slider: false },
      position: { x: 2, y: 0, z: 0 },
      type: "book",
    },
    "book@3,7,0": {
      config: { slider: false },
      position: { x: 3, y: 7, z: 0 },
      type: "book",
    },
    "door@2,0,2": {
      config: { direction: "towards", toRoom: "bookworld19" },
      position: { x: 2, y: 0, z: 2 },
      type: "door",
    },
    "door@2,8,2": {
      config: { direction: "away", toRoom: "bookworld16" },
      position: { x: 2, y: 8, z: 2 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 8 },
  walls: {
    away: ["book", "book", "none", "none", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
