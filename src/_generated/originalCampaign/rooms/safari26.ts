import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari26",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    bl: { config: {}, position: { x: 1, y: 10, z: 0 }, type: "ball" },
    br: {
      config: { axis: "y", times: { y: 12, z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "right", toRoom: "safari23" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "safari27" },
      position: { x: 8, y: 8, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 1, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 2, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 2, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano", times: { z: 3 } },
      position: { x: 3, y: 8, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 12 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "extra-life" },
      position: { x: 7, y: 0, z: 4 },
      type: "pickup",
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
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "shield",
          "wall",
          "window",
          "window",
          "wall",
          "shield",
          "wall",
          "shield",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 8, y: 10, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 6 }, to: { x: 8, y: 12 } },
      },
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
