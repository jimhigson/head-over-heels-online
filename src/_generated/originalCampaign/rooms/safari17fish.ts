import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "safari17fish",
  items: {
    b: {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 1, y: 0, z: 3 },
      type: "block",
    },
    b1: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "safari16" },
      position: { x: 1, y: 0, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "safari30" },
      position: { x: 5, y: 8, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "safari31" },
      position: { x: 8, y: 2, z: 0 },
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
    h: {
      config: { times: { y: 3 } },
      position: { x: 0, y: 2, z: 0 },
      type: "hushPuppy",
    },
    h1: {
      config: { times: { y: 2 } },
      position: { x: 0, y: 3, z: 1 },
      type: "hushPuppy",
    },
    h2: { config: {}, position: { x: 0, y: 4, z: 2 }, type: "hushPuppy" },
    pi: {
      config: { gives: "reincarnation" },
      position: { x: 1, y: 7, z: 4 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 1 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["wall", "wall", "wall", "shield", "wall"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 5 } },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 7, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["wall", "wall"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: {
        direction: "left",
        tiles: ["wall", "window", "window", "wall"],
      },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
