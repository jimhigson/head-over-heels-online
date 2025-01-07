import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld22",
  items: {
    "book@0,0,2": {
      config: { slider: false },
      position: { x: 0, y: 0, z: 2 },
      type: "book",
    },
    "book@0,1,0": {
      config: { slider: false },
      position: { x: 0, y: 1, z: 0 },
      type: "book",
    },
    "book@0,1,1": {
      config: { slider: false },
      position: { x: 0, y: 1, z: 1 },
      type: "book",
    },
    "book@1,0,3": {
      config: { slider: false },
      position: { x: 1, y: 0, z: 3 },
      type: "book",
    },
    "book@1,1,0": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 0 },
      type: "book",
    },
    "book@1,1,1": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 1 },
      type: "book",
    },
    "book@1,1,2": {
      config: { slider: false },
      position: { x: 1, y: 1, z: 2 },
      type: "book",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "bookworld23" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "bookworld21" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "pickup@1,0,0": {
      config: { gives: "shield" },
      position: { x: 1, y: 0, z: 0 },
      type: "pickup",
    },
    "portableBlock@0,5,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 5, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
