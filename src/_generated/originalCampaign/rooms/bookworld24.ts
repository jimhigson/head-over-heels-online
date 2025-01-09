import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "deadly",
  id: "bookworld24",
  items: {
    "block@0,2,0": {
      config: { style: "book" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@3,2,0": {
      config: { style: "book" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,0,1": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0": {
      config: { style: "toaster" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,1": {
      config: { style: "toaster" },
      position: { x: 5, y: 5, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,1": {
      config: { style: "toaster" },
      position: { x: 7, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,0": {
      config: { style: "toaster" },
      position: { x: 7, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,2": {
      config: { direction: "right", toRoom: "bookworld25" },
      position: { x: 0, y: 2, z: 2 },
      type: "door",
    },
    "door@8,2,2": {
      config: { direction: "left", toRoom: "bookworld23" },
      position: { x: 8, y: 2, z: 2 },
      type: "door",
    },
    "movableBlock@7,2,0": {
      config: {
        activated: false,
        movement: "clockwise",
        startDirection: "right",
        style: "sandwich",
      },
      position: { x: 7, y: 2, z: 0 },
      type: "movableBlock",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 6 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
