import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth45market",
  items: {
    b: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    b5: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "blacktooth46market" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth44market" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 7, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "market",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "extra-life" },
      position: { x: 0, y: 0, z: 0 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
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
        tiles: ["passage", "more-fruits", "fruits"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: ["more-fruits", "fruits", "passage"],
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["passage", "more-fruits", "fruits"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["more-fruits", "fruits", "passage"],
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
