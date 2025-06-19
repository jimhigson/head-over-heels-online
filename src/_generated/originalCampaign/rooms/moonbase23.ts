import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "moonbase23",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "moonbase20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "moonbase25tobookworld" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "moonbase24toegyptus" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "moonbase26" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "slidingBlock@1,4,0": {
      config: { style: "puck" },
      position: { x: 1, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@2,4,0": {
      config: { style: "puck" },
      position: { x: 2, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@3,4,0": {
      config: { style: "puck" },
      position: { x: 3, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@4,2,0": {
      config: { style: "puck" },
      position: { x: 4, y: 2, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@4,4,0": {
      config: { style: "puck" },
      position: { x: 4, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@4,6,0": {
      config: { style: "puck" },
      position: { x: 4, y: 6, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@5,3,0": {
      config: { style: "puck" },
      position: { x: 5, y: 3, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@5,4,0": {
      config: { style: "puck" },
      position: { x: 5, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@5,5,0": {
      config: { style: "puck" },
      position: { x: 5, y: 5, z: 0 },
      type: "slidingBlock",
    },
    "slidingBlock@6,4,0": {
      config: { style: "puck" },
      position: { x: 6, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["window3", "coil", "window2"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["window2", "coil", "window1"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["window3", "coil", "window2"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["window2", "coil", "window1"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
