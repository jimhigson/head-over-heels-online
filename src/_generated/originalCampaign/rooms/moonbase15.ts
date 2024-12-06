import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase15",
  items: {
    "door@0,0,0:1AqbYU": {
      config: { direction: "right", toRoom: "moonbase7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,4:Z8uXF5": {
      config: { direction: "left", toRoom: "moonbase14" },
      position: { x: 8, y: 0, z: 4 },
      type: "door",
    },
    "hushPuppy@5,0,0:13y": {
      config: {},
      position: { x: 5, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@5,1,0:13y": {
      config: {},
      position: { x: 5, y: 1, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,0,1:13y": {
      config: {},
      position: { x: 6, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@6,1,1:13y": {
      config: {},
      position: { x: 6, y: 1, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@7,0,2:13y": {
      config: {},
      position: { x: 7, y: 0, z: 2 },
      type: "hushPuppy",
    },
    "hushPuppy@7,1,2:13y": {
      config: {},
      position: { x: 7, y: 1, z: 2 },
      type: "hushPuppy",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
    left: ["none", "none"],
  },
} satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
