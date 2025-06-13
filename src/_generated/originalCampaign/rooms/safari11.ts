import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
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
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@0,0,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4",
        which: "elephant",
      },
      position: { x: 0, y: 0, z: 0 },
      type: "monster",
    },
    "monster@2,3,0": {
      config: {
        activated: "on",
        movement: "turn-to-player",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 2, y: 3, z: 0 },
      type: "monster",
    },
    "monster@3,1,0": {
      config: {
        activated: "on",
        movement: "turn-to-player",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 3, y: 1, z: 0 },
      type: "monster",
    },
    "monster@3,5,0": {
      config: {
        activated: "on",
        movement: "turn-to-player",
        startDirection: "right",
        which: "elephantHead",
      },
      position: { x: 3, y: 5, z: 0 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 2 } },
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
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
