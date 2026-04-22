import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "safari37crown",
  items: {
    b: {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "artificial", times: { z: 6 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 2, y: 4, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "safari33" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
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
    m: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 7, y: 2, z: 1 },
      type: "monster",
    },
    pi: {
      config: { gives: "crown", planet: "safari" },
      position: { x: 0, y: 7, z: 7 },
      type: "pickup",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 7, y: 3, z: 1 },
      type: "portableBlock",
    },
    pu: { config: {}, position: { x: 0, y: 7, z: 6 }, type: "pushableBlock" },
    pu1: { config: {}, position: { x: 3, y: 5, z: 0 }, type: "pushableBlock" },
    pu2: { config: {}, position: { x: 5, y: 1, z: 0 }, type: "pushableBlock" },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 2, y: 0, z: 0 },
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
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
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
