import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld8",
  items: {
    "book@0,2,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 2, z: 0 },
      type: "book",
    },
    "book@0,2,2:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 2, z: 2 },
      type: "book",
    },
    "book@0,2,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 2, z: 3 },
      type: "book",
    },
    "book@0,3,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 3, z: 3 },
      type: "book",
    },
    "door@0,3,4:ocOrc": {
      config: { direction: "right", toRoom: "bookworld9" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,8,0:Z2k1mhl": {
      config: { direction: "away", toRoom: "bookworld7" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "portableBlock@3,3,0:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,3,0:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 4, y: 3, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "none", "none", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
