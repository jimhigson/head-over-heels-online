import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth67",
  items: {
    b: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 0, y: 0, z: 4 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 1, z: 1 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 2 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth69" },
      position: { x: 0, y: 3, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth70" },
      position: { x: 6, y: 8, z: 4 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "blacktooth66" },
      position: { x: 8, y: 1, z: 4 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    sg: { config: {}, position: { x: 0, y: 0, z: 5 }, type: "spring" },
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
        tiles: ["plain", "plain", "plain", "plain", "plain", "plain"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "armour", "shield", "plain"],
      },
      position: { x: 8, y: 3, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
