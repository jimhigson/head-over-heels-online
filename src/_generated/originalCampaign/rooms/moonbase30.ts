import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "moonbase30",
  items: {
    "block@3,3,0": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    "block@4,3,1": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 4, y: 2, z: 1 },
      type: "block",
    },
    "block@5,3,2": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 5, y: 2, z: 2 },
      type: "block",
    },
    "door@2,6,0": {
      config: { direction: "away", toRoom: "moonbase27" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "door@6,2,0": {
      config: { direction: "left", toRoom: "moonbase31" },
      position: { x: 6, y: 2, z: 4 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: { direction: "away", tiles: ["window2", "window3"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: { direction: "away", tiles: ["window3", "window1"] },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: { direction: "left", tiles: ["window2", "window3"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,4,0": {
      config: { direction: "left", tiles: ["window3", "window1"] },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
