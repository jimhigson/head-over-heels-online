import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld12fish",
  items: {
    "book@0,7,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 0 },
      type: "book",
    },
    "book@0,7,1:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 1 },
      type: "book",
    },
    "book@0,7,2:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 2 },
      type: "book",
    },
    "book@0,7,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 3 },
      type: "book",
    },
    "book@0,7,4:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 7, z: 4 },
      type: "book",
    },
    "door@0,3,0:286lMP": {
      config: { direction: "right", toRoom: "bookworld13" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@2,0,0:1OwlOC": {
      config: { direction: "towards", toRoom: "bookworld4" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "movableBlock@3,4,0:Z15GVb5": {
      config: { style: "anvil" },
      position: { x: 3, y: 4, z: 0 },
      type: "movableBlock",
    },
    "pickup@0,7,5:ZPJAGD": {
      config: { gives: "reincarnation" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
    },
    "portableBlock@5,7,0:Z1UEQTQ": {
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
