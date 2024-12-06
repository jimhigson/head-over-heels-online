import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld11",
  items: {
    "door@0,0,0:ocNEV": {
      config: { direction: "right", toRoom: "bookworld6" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,4:Z1lPUPy": {
      config: { direction: "left", toRoom: "bookworld10" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    "hushPuppy@5,1,0:13y": {
      config: {},
      position: { x: 5, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,1,1:13y": {
      config: {},
      position: { x: 6, y: 1, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@7,1,2:13y": {
      config: {},
      position: { x: 7, y: 1, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 2 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["none", "none"],
  },
} satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
