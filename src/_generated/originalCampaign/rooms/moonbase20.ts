import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase20",
  items: {
    "door@0,3,0:Z1kG330": {
      config: { direction: "right", toRoom: "moonbase19" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,0:Yi6zN": {
      config: { direction: "towards", toRoom: "moonbase22topenitentiary" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0:Z1yg1qz": {
      config: { direction: "away", toRoom: "moonbase21tosafari" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0:Z8uPUs": {
      config: { direction: "left", toRoom: "moonbase23" },
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
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
