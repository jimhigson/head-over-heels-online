import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "bookworld39",
  items: {
    "conveyor@0,0,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 0, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@1,0,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 1, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,0,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 2, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@3,0,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 3, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,0,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 4, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,0,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 5, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@6,0,0:2pPzNa": {
      config: { direction: "left" },
      position: { x: 6, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@7,0,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 7, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@7,1,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 7, y: 1, z: 0 },
      type: "conveyor",
    },
    "teleporter@7,3,0:Z8cIGu": {
      config: { toRoom: "bookworld1" },
      position: { x: 7, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,4,0:Z8cIGu": {
      config: { toRoom: "bookworld1" },
      position: { x: 7, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "bookworld",
  roomAbove: "bookworld38",
  roomBelow: "bookworld40",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
