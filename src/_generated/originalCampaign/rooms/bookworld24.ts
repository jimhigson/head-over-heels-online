import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "deadly",
  id: "bookworld24",
  items: {
    "book@0,2,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 2, z: 0 },
      type: "book",
    },
    "book@3,2,0:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 2, z: 0 },
      type: "book",
    },
    "deadlyBlock@0,0,1:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,1:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 5, y: 5, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,1:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 7, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,2:286ujI": {
      config: { direction: "right", toRoom: "bookworld25" },
      position: { x: 0, y: 2, z: 2 },
      type: "door",
    },
    "door@8,2,2:Z1lPM3U": {
      config: { direction: "left", toRoom: "bookworld23" },
      position: { x: 8, y: 2, z: 2 },
      type: "door",
    },
    "movableBlock@7,2,0:28GVaT": {
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
