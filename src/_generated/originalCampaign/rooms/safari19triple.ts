import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari19triple",
  items: {
    b: {
      config: { style: "tower", times: { z: 5 } },
      position: { x: 0, y: 9, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 0, y: 9, z: 5 },
      type: "block",
    },
    br: {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 13, y: 0, z: 0 },
      type: "barrier",
    },
    br1: {
      config: { axis: "y" },
      position: { x: 8, y: 0, z: 0 },
      type: "barrier",
    },
    br2: {
      config: { axis: "y" },
      position: { x: 8, y: 1, z: 0 },
      type: "barrier",
    },
    br3: {
      config: { axis: "y" },
      position: { x: 8, y: 2, z: 0 },
      type: "barrier",
    },
    br4: {
      config: { axis: "y" },
      position: { x: 8, y: 3, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "left", toRoom: "safari20" },
      position: { x: 16, y: 1, z: 0 },
      type: "door",
    },
    d1: {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "safari18",
      },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "away", toRoom: "safari25" },
      position: { x: 3, y: 10, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 16, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    f1: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 4, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 12, y: 0, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "extra-life" },
      position: { x: 0, y: 9, z: 6 },
      type: "pickup",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 12, y: 0, z: 1 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "drum" },
      position: { x: 6, y: 6, z: 1 },
      type: "portableBlock",
    },
    pr2: {
      config: { style: "drum" },
      position: { x: 6, y: 8, z: 1 },
      type: "portableBlock",
    },
    sg: { config: {}, position: { x: 6, y: 7, z: 1 }, type: "spring" },
    w: {
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
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "left",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
      },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 10 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["wall"] },
      position: { x: 16, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["wall"] },
      position: { x: 16, y: 3, z: 0 },
      type: "wall",
    },
    w7: {
      config: { direction: "towards", times: { x: 11 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w8: {
      config: { direction: "away", tiles: ["wall", "window", "wall"] },
      position: { x: 5, y: 10, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 8, y: 0 }, to: { x: 16, y: 4 } },
      },
      middle: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 4 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 4 }, to: { x: 8, y: 10 } },
      },
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
