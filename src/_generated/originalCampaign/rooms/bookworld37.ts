import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld37",
  items: {
    "deadlyBlock@0,3,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,3,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,4,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 1, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,0,0:Jfr9x": {
      config: { direction: "towards", toRoom: "bookworld36" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0:ZXTJpH": {
      config: { direction: "away", toRoom: "bookworld38" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: ["book", "book", "person", "book", "book", "person", "book", "book"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
