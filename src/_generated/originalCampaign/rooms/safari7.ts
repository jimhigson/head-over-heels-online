import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "deadly",
  id: "safari7",
  items: {
    "block@0,3,0": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic" },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@2,1,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 2, y: 1, z: 0 },
      type: "block",
    },
    "block@2,2,0": {
      config: { style: "organic" },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    "door@0,2,1": {
      config: { direction: "right", toRoom: "safari6triple" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "safari6triple" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "door@6,2,2": {
      config: { direction: "left", toRoom: "safari8" },
      position: { x: 6, y: 2, z: 2 },
      type: "door",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
        times: { x: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: { direction: "left", tiles: ["wall", "shield"], times: { y: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,4,0": {
      config: { direction: "left", tiles: ["shield", "wall"], times: { y: 2 } },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
