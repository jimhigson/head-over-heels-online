import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld36",
  items: {
    "baddie@1,0,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 1, y: 0, z: 0 },
      type: "baddie",
    },
    "book@7,2,0:Z213BvY": {
      config: { slider: false },
      position: { x: 7, y: 2, z: 0 },
      type: "book",
    },
    "book@7,2,1:Z213BvY": {
      config: { slider: false },
      position: { x: 7, y: 2, z: 1 },
      type: "book",
    },
    "book@7,2,2:Z213BvY": {
      config: { slider: false },
      position: { x: 7, y: 2, z: 2 },
      type: "book",
    },
    "door@3,6,5:ZXTJFs": {
      config: { direction: "away", toRoom: "bookworld37" },
      position: { x: 3, y: 6, z: 5 },
      type: "door",
    },
    "door@8,2,5:Z1lPDx2": {
      config: { direction: "left", toRoom: "bookworld35" },
      position: { x: 8, y: 2, z: 5 },
      type: "door",
    },
    "portableBlock@1,5,0:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 1, y: 5, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,1,0:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 3, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,3,0:Z14c3Fl": {
      config: { style: "sticks" },
      position: { x: 4, y: 3, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 6 },
  walls: {
    away: ["book", "book", "person", "none", "none", "person", "book", "book"],
    left: ["book", "book", "none", "none", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
