import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "moonbase17",
  items: {
    d: {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "moonbase16",
      },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    t: {
      config: { times: { x: 2, y: 2 }, toRoom: "moonbase18" },
      position: { x: 2, y: 2, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["window2", "window3"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["window3", "window1"] },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: 2, y: 4, z: 0 },
      with: { room: "moonbase18" },
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
