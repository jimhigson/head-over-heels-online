import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld34",
  items: {
    "book@0,10,-1:1g3d60": {
      config: { slider: true },
      position: { x: 0, y: 10, z: -1 },
      type: "book",
    },
    "book@0,10,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 10, z: 0 },
      type: "book",
    },
    "book@0,10,2:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 10, z: 2 },
      type: "book",
    },
    "book@0,13,-1:1g3d60": {
      config: { slider: true },
      position: { x: 0, y: 13, z: -1 },
      type: "book",
    },
    "book@0,13,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 13, z: 0 },
      type: "book",
    },
    "book@0,4,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 4, z: 0 },
      type: "book",
    },
    "book@0,5,-1:1g3d60": {
      config: { slider: true },
      position: { x: 0, y: 5, z: -1 },
      type: "book",
    },
    "book@0,5,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 5, z: 0 },
      type: "book",
    },
    "book@0,5,1:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 5, z: 1 },
      type: "book",
    },
    "book@0,5,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 5, z: 3 },
      type: "book",
    },
    "book@0,6,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 6, z: 3 },
      type: "book",
    },
    "book@0,7,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 3 },
      type: "book",
    },
    "book@0,8,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 8, z: 3 },
      type: "book",
    },
    "book@0,9,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 9, z: 3 },
      type: "book",
    },
    "book@1,10,0:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 10, z: 0 },
      type: "book",
    },
    "book@1,10,1:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 10, z: 1 },
      type: "book",
    },
    "book@1,10,2:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 10, z: 2 },
      type: "book",
    },
    "book@1,10,3:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 10, z: 3 },
      type: "book",
    },
    "book@1,5,0:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 5, z: 0 },
      type: "book",
    },
    "book@1,5,1:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 5, z: 1 },
      type: "book",
    },
    "book@1,5,2:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 5, z: 2 },
      type: "book",
    },
    "book@1,5,3:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 5, z: 3 },
      type: "book",
    },
    "book@1,6,3:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 6, z: 3 },
      type: "book",
    },
    "book@1,7,3:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 7, z: 3 },
      type: "book",
    },
    "book@1,8,3:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 8, z: 3 },
      type: "book",
    },
    "book@1,9,3:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 9, z: 3 },
      type: "book",
    },
    "door@0,0,0:Jfqnh": {
      config: { direction: "towards", toRoom: "bookworld33" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,16,0:ZXTTu7": {
      config: { direction: "away", toRoom: "bookworld20" },
      position: { x: 0, y: 16, z: 0 },
      type: "door",
    },
    "pickup@1,9,0:Zs6lvR": {
      config: { gives: "jumps" },
      position: { x: 1, y: 9, z: 0 },
      type: "pickup",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 16 },
  walls: {
    away: ["none", "none"],
    left: [
      "book",
      "person",
      "book",
      "book",
      "book",
      "book",
      "person",
      "book",
      "book",
      "person",
      "book",
      "book",
      "book",
      "book",
      "person",
      "book",
    ],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
