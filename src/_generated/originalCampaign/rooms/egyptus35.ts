import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  height: 12,
  id: "egyptus35",
  items: {
    b: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 1, y: 2, z: 4 },
      type: "block",
    },
    b1: {
      config: { style: "artificial" },
      position: { x: 1, y: 4, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "artificial" },
      position: { x: 1, y: 5, z: 2 },
      type: "block",
    },
    b3: {
      config: { style: "artificial" },
      position: { x: 1, y: 6, z: 1 },
      type: "block",
    },
    b4: {
      config: { style: "artificial" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { y: 2, z: 4 } },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "egyptus34fish" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 2 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster" },
      position: { x: 1, y: 5, z: 5 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "toaster" },
      position: { x: 1, y: 6, z: 4 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "toaster" },
      position: { x: 1, y: 7, z: 3 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 2, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 0, y: 2, z: 0 },
      type: "portableBlock",
    },
    sg: { config: {}, position: { x: 1, y: 2, z: 5 }, type: "spring" },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "away", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
          "hieroglyphics",
        ],
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus36",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
