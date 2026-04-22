import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "blacktooth60",
  items: {
    br: {
      config: { axis: "x", times: { x: 3, z: 3 } },
      position: { x: 0, y: 3.4, z: 0 },
      type: "barrier",
    },
    br1: {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 2.6, y: 4, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth59" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "extra-life" },
      position: { x: 0, y: 4, z: 0 },
      type: "pickup",
    },
    t: {
      config: { times: { x: 2, y: 2 }, toItemId: "t", toRoom: "moonbase8" },
      position: { x: 0, y: 6, z: 0 },
      type: "teleporter",
    },
    t1: {
      config: { times: { x: 2, y: 2 }, toItemId: "t1", toRoom: "moonbase8" },
      position: { x: 6, y: 6, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: [
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: 7, y: 7, z: 0 },
      with: { room: "moonbase8" },
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
