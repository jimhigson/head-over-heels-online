import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld1",
  items: {
    "book@0,3,0:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 3, z: 0 },
      type: "book",
    },
    "book@0,3,1:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 3, z: 1 },
      type: "book",
    },
    "book@0,3,3:Z213BvY": {
      config: { slider: false },
      position: { x: 0, y: 3, z: 3 },
      type: "book",
    },
    "door@0,3,4:ocMCU": {
      config: { direction: "right", toRoom: "bookworld2" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,0,0:1OwmAS": {
      config: { direction: "towards", toRoom: "bookworld7" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "teleporter@6,3,0:Z2o7W20": {
      config: { toRoom: "moonbase25tobookworld" },
      position: { x: 6, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,4,0:Z2o7W20": {
      config: { toRoom: "moonbase25tobookworld" },
      position: { x: 6, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,3,0:Z2o7W20": {
      config: { toRoom: "moonbase25tobookworld" },
      position: { x: 7, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,4,0:Z2o7W20": {
      config: { toRoom: "moonbase25tobookworld" },
      position: { x: 7, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
