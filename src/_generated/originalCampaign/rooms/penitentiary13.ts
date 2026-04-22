import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "penitentiary13",
  items: {
    b: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 0, y: 3, z: 5 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 1, y: 0, z: 1 },
      type: "block",
    },
    b2: {
      config: { style: "artificial" },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    b3: {
      config: { style: "artificial" },
      position: { x: 2, y: 3, z: 6 },
      type: "block",
    },
    b4: {
      config: { style: "artificial" },
      position: { x: 3, y: 3, z: 3 },
      type: "block",
    },
    b5: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 4, y: 3, z: 2 },
      type: "block",
    },
    b6: {
      config: { style: "artificial" },
      position: { x: 5, y: 3, z: 1 },
      type: "block",
    },
    b7: {
      config: { style: "artificial" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    b8: {
      config: { style: "artificial" },
      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    b9: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 2, y: 0, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "penitentiary2" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { x: 2 } },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    sg: { config: {}, position: { x: 2, y: 3, z: 7 }, type: "spring" },
    w: {
      config: { direction: "right", times: { y: 4 } },
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
          "skeleton",
          "loop",
          "loop",
          "loop",
          "loop",
          "loop",
          "skeleton",
          "loop",
        ],
      },
      position: { x: 0, y: 4, z: 0 },
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
        tiles: ["loop", "loop", "skeleton", "loop"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary14",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
