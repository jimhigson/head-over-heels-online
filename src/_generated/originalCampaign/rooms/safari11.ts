import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  id: "safari11",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "safari10" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@6,2,0": {
      config: { direction: "left", toRoom: "safari12" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
    "monster@0,0,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "elephant",
      },
      position: { x: 0, y: 0, z: 0 },
      type: "monster",
    },
    "monster@2,3,0": {
      config: {
        activated: true,
        movement: "unmoving",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "monster",
    },
    "monster@3,1,0": {
      config: {
        activated: true,
        movement: "unmoving",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 3, y: 1, z: 0 },
      type: "monster",
    },
    "monster@3,5,0": {
      config: {
        activated: true,
        movement: "unmoving",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 3, y: 5, z: 0 },
      type: "monster",
    },
  },
  planet: "safari",
  size: { x: 6, y: 6 },
  walls: {
    away: ["shield", "wall", "window", "window", "wall", "shield"],
    left: ["wall", "shield", "none", "none", "shield", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
