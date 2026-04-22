import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "safari3",
  items: {
    b: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "safari2" },
      position: { x: 1, y: 0, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "safari4" },
      position: { x: 1, y: 8, z: 5 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 4, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 8 },
      position: { x: 1, y: 4, z: 0 },
      type: "lift",
    },
    l1: {
      config: { bottom: 0, top: 8 },
      position: { x: 2, y: 4, z: 0 },
      type: "lift",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
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
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
