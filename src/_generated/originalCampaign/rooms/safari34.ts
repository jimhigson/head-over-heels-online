import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "safari34",
  items: {
    b: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "safari33" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 8 } },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    pi: {
      config: { gives: "scroll", page: "teleportBack", source: "manual" },
      position: { x: 3, y: 6, z: 0 },
      type: "pickup",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 1, y: 0, z: 0 },
      type: "portableBlock",
    },
    t: {
      config: { times: { y: 2 }, toRoom: "safari33" },
      position: { x: 3, y: 3, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
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
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
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
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomAbove: "safari35",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
