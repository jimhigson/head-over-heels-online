import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary11",
  items: {
    "block@5,5,0": {
      config: { style: "artificial", times: { z: 3 } },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "penitentiary12" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "penitentiary10" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "moveableDeadly@5,5,3": {
      config: { style: "deadFish" },
      position: { x: 5, y: 5, z: 3 },
      type: "moveableDeadly",
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
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
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
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
