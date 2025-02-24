import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari20",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari19triple" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "safari22" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "door@4,3,0": {
      config: { direction: "left", toRoom: "safari21" },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEu0": {
      config: { direction: "towards", tiles: [], times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
        tiles: ["wall", "shield", "wall"],
        times: { y: 3 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,5,0": {
      config: {
        direction: "left",
        tiles: ["wall", "window", "wall"],
        times: { y: 3 },
      },
      position: { x: 4, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
