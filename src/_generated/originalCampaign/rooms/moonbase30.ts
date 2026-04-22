import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "moonbase30",
  items: {
    b: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 4, y: 2, z: 1 },
      type: "block",
    },
    b2: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 5, y: 2, z: 2 },
      type: "block",
    },
    b3: {
      config: { style: "artificial" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "moonbase27" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "moonbase31" },
      position: { x: 6, y: 2, z: 4 },
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
    m: {
      config: {
        activated: "on",
        movement: "anticlockwise",
        startDirection: "right",
        which: "turtle",
      },
      position: { x: 5, y: 3, z: 3 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
        which: "turtle",
      },
      position: { x: 5, y: 2, z: 3 },
      type: "monster",
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
      config: { direction: "left", tiles: ["window2", "window3"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["window3", "window1"] },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
