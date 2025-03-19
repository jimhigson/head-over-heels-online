import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  id: "safari34",
  items: {
    "block@4,0,3": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "deadlyBlock@4,0,0": {
      config: { style: "volcano", times: { y: 8 } },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari33" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "lift@7,7,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    "portableBlock@1,0,0": {
      config: { style: "drum" },
      position: { x: 1, y: 0, z: 0 },
      type: "portableBlock",
    },
    scroll: {
      config: { gives: "scroll", page: "teleportBack" },
      position: { x: 3, y: 6, z: 0 },
      type: "pickup",
    },
    "teleporter@3,3,0": {
      config: {
        times: { y: 2 },
        toPosition: { x: 1, y: 6, z: 1 },
        toRoom: "safari33",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
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
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomAbove: "safari35",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
