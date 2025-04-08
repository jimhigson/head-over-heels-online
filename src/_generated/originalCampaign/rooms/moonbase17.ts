import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "moonbase",
  id: "moonbase17",
  items: {
    "door@2,6,0": {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "moonbase16",
      },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "teleporter@2,2,0": {
      config: {
        times: { x: 2, y: 2 },
        toPosition: { x: 2, y: 2, z: 0 },
        toRoom: "moonbase18",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["window2", "window3"],
        times: { x: 2 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: {
        direction: "away",
        tiles: ["window3", "window1"],
        times: { x: 2 },
      },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: -4, y: -3, z: 0 },
      with: { room: "moonbase18" },
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
