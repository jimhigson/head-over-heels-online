import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "bookworld",
  id: "blacktooth60",
  items: {
    "barrier@0,3,0": {
      config: { axis: "x", times: { x: 3, z: 3 } },
      position: { x: 0, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@3,4,0": {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 3, y: 4, z: 0 },
      type: "barrier",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth59" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "pickup@0,4,0": {
      config: { gives: "extra-life" },
      position: { x: 0, y: 4, z: 0 },
      type: "pickup",
    },
    "teleporter@0,6,0": {
      config: { toPosition: { x: 0, y: 6, z: 0 }, toRoom: "moonbase8" },
      position: { x: 0, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@0,7,0": {
      config: { toPosition: { x: 0, y: 7, z: 0 }, toRoom: "moonbase8" },
      position: { x: 0, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,6,0": {
      config: { toPosition: { x: 1, y: 6, z: 0 }, toRoom: "moonbase8" },
      position: { x: 1, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@1,7,0": {
      config: { toPosition: { x: 1, y: 7, z: 0 }, toRoom: "moonbase8" },
      position: { x: 1, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,6,0": {
      config: { toPosition: { x: 6, y: 6, z: 0 }, toRoom: "moonbase8" },
      position: { x: 6, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@6,7,0": {
      config: { toPosition: { x: 6, y: 7, z: 0 }, toRoom: "moonbase8" },
      position: { x: 6, y: 7, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,6,0": {
      config: { toPosition: { x: 7, y: 6, z: 0 }, toRoom: "moonbase8" },
      position: { x: 7, y: 6, z: 0 },
      type: "teleporter",
    },
    "teleporter@7,7,0": {
      config: { toPosition: { x: 7, y: 7, z: 0 }, toRoom: "moonbase8" },
      position: { x: 7, y: 7, z: 0 },
      type: "teleporter",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
