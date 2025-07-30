import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "moonbase10",
  items: {
    "block@0,3,3": {
      config: { style: "artificial", times: { y: 4, z: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,7,3": {
      config: { style: "artificial", times: { z: 4 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,7,5": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 5 },
      type: "block",
    },
    "block@4,7,3": {
      config: { style: "artificial", times: { x: 2, z: 4 } },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "deadlyBlock@0,7,6": {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 6 },
      type: "deadlyBlock",
    },
    "door@0,3,5": {
      config: { direction: "right", toRoom: "moonbase9" },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "moonbase11" },
      position: { x: 4, y: 8, z: 4 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["window3", "window2", "window1", "coil"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["window2", "window1"] },
      position: { x: 6, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
