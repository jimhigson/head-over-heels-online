import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld21",
  items: {
    "baddie@0,4,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 0, y: 4, z: 0 },
      type: "baddie",
    },
    "book@1,5,0:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 5, z: 0 },
      type: "book",
    },
    "book@1,6,0:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 6, z: 0 },
      type: "book",
    },
    "book@3,3,0:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 3, z: 0 },
      type: "book",
    },
    "book@6,2,0:Z213BvY": {
      config: { slider: false },
      position: { x: 6, y: 2, z: 0 },
      type: "book",
    },
    "book@7,5,0:Z213BvY": {
      config: { slider: false },
      position: { x: 7, y: 5, z: 0 },
      type: "book",
    },
    "door@3,0,0:Jfi79": {
      config: { direction: "towards", toRoom: "bookworld22" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0:Z2k1lKP": {
      config: { direction: "away", toRoom: "bookworld9" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "none", "none", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
