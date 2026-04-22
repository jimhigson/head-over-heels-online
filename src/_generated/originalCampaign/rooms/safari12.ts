import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "safari12",
  items: {
    br: {
      config: { axis: "y", times: { y: 6, z: 2 } },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    br1: {
      config: { axis: "y", times: { y: 5 } },
      position: { x: 4, y: 1, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "right", toRoom: "safari11" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 5, z: 0 },
      type: "lift",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 5, y: 5, z: 0 },
      type: "monster",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 3, y: 5, z: 0 },
      type: "portableBlock",
    },
    sd: {
      config: { startingPhase: 2, style: "spikyBall" },
      position: { x: 4, y: 0, z: 0 },
      type: "slidingDeadly",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomAbove: "safari13",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
