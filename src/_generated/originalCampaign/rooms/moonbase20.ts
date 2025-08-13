import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "moonbase20",
  items: {
    crownsScroll: {
      config: { gives: "scroll", page: "crowns", source: "manual" },
      position: { x: 5, y: 4, z: 1 },
      type: "pickup",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "moonbase19" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "moonbase22topenitentiary" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "moonbase21tosafari" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "moonbase23" },
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
      config: { direction: "away", tiles: ["window3", "coil", "window2"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["window2", "coil", "window1"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["window3", "coil", "window2"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: { direction: "left", tiles: ["window2", "coil", "window1"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
