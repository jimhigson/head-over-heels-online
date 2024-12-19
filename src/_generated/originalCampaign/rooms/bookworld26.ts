import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "bookworld",
  id: "bookworld26",
  items: {
    "baddie@3,7,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 3, y: 7, z: 0 },
      type: "baddie",
    },
    "book@3,0,0:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 0, z: 0 },
      type: "book",
    },
    "book@3,0,1:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 0, z: 1 },
      type: "book",
    },
    "book@3,0,2:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 0, z: 2 },
      type: "book",
    },
    "book@3,0,4:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 0, z: 4 },
      type: "book",
    },
    "door@0,3,0:286t1W": {
      config: { direction: "right", toRoom: "bookworld20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@4,3,0:Z1lPLxp": {
      config: { direction: "left", toRoom: "bookworld25" },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
    "pickup@3,0,5:Z2prF0G": {
      config: { gives: "donuts" },
      position: { x: 3, y: 0, z: 5 },
      type: "pickup",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
  walls: {
    away: ["book", "book", "book", "book"],
    left: ["book", "book", "person", "none", "none", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
