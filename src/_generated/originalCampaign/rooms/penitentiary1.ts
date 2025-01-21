import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary1",
  items: {
    "door@2,8,0": {
      config: { direction: "away", toRoom: "penitentiary2" },
      position: { x: 2, y: 8, z: 0 },
      type: "door",
    },
    "teleporter@2,3,0": {
      config: {
        toPosition: { x: 2, y: 3, z: 0 },
        toRoom: "moonbase22topenitentiary",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@2,4,0": {
      config: {
        toPosition: { x: 2, y: 4, z: 0 },
        toRoom: "moonbase22topenitentiary",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,3,0": {
      config: {
        toPosition: { x: 3, y: 3, z: 0 },
        toRoom: "moonbase22topenitentiary",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "teleporter@3,4,0": {
      config: {
        toPosition: { x: 3, y: 4, z: 0 },
        toRoom: "moonbase22topenitentiary",
      },
      position: { x: 3, y: 4, z: 0 },
      type: "teleporter",
    },
  },
  planet: "penitentiary",
  size: { x: 6, y: 8 },
  walls: {
    away: ["loop", "loop", "none", "none", "loop", "loop"],
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
