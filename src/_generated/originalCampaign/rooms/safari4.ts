import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari4",
  items: {
    "block@3,7,0": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,3": {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,1": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "safari3" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "safari18" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "safari5" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "monster@7,4,1": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 1 },
      type: "monster",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
  walls: {
    away: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
