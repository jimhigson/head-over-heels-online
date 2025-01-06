import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld6",
  items: {
    "book@1,3,0:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 3, z: 0 },
      type: "book",
    },
    "book@1,3,1:1g3d60": {
      config: { slider: true },
      position: { x: 1, y: 3, z: 1 },
      type: "book",
    },
    "book@1,7,0:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 7, z: 0 },
      type: "book",
    },
    "deadlyBlock@3,0,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,8,3:Z2k1mMQ": {
      config: { direction: "away", toRoom: "bookworld5" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    "door@4,3,3:Z1lPUzN": {
      config: { direction: "left", toRoom: "bookworld11" },
      position: { x: 4, y: 3, z: 3 },
      type: "door",
    },
    "movableBlock@2,4,0:1TpLUC": {
      config: { movement: "free", style: "anvil" },
      position: { x: 2, y: 4, z: 0 },
      type: "movableBlock",
    },
    "movableBlock@2,5,0:1TpLUC": {
      config: { movement: "free", style: "anvil" },
      position: { x: 2, y: 5, z: 0 },
      type: "movableBlock",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
  walls: {
    away: ["book", "none", "none", "book"],
    left: ["book", "book", "person", "none", "none", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
