import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "magenta", shade: "basic" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase23",
  items: {
    "door@0,3,0:Z1kFWmp": {
      config: { direction: "right", toRoom: "moonbase20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,0:Z2nb9F4": {
      config: { direction: "towards", toRoom: "moonbase25tobookworld" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0:ZnSMCA": {
      config: { direction: "away", toRoom: "moonbase24toegyptus" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0:Z8uP9c": {
      config: { direction: "left", toRoom: "moonbase26" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "slidingBlock@1,4,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 1, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@2,4,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 2, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@3,4,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 3, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@4,2,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 4, y: 2, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@4,4,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 4, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@4,6,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 4, y: 6, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@5,3,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 5, y: 3, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@5,4,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 5, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@5,5,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 5, y: 5, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@6,4,0:Z1tM18t": {
      config: { style: "puck" },
      position: { x: 6, y: 4, z: 0 },
      type: "slidingBlock",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window2",
      "coil",
      "window3",
      "none",
      "none",
      "window3",
      "coil",
      "window1",
    ],
    left: [
      "window2",
      "coil",
      "window3",
      "none",
      "none",
      "window3",
      "coil",
      "window1",
    ],
  },
} satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
