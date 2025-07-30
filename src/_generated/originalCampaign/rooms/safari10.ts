import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "safari10",
  items: {
    "barrier@4,0,0": {
      config: { axis: "y", times: { y: 6, z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    "door@8,2,0": {
      config: { direction: "left", toRoom: "safari11" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "spring@0,5,0": {
      config: {},
      position: { x: 0, y: 5, z: 0 },
      type: "spring",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["wall", "shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,4,0": {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomAbove: "safari9",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
