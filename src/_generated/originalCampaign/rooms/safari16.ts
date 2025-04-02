import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari16",
  items: {
    "deadlyBlock@1,1,0": {
      config: { style: "volcano", times: { y: 3 } },
      position: { x: 0.5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 0.5, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 2.5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0": {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "safari15",
      },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "safari17fish" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "monster@2,6,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "towards",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 1.5, y: 6, z: 0 },
      type: "monster",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1fRqC7": {
      config: { direction: "towards", tiles: [] },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards", tiles: [] },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { y: 8 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
