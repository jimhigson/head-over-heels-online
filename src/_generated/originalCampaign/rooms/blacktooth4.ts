import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth4",
  items: {
    b: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 1, z: 0 },
      type: "block",
    },
    b2: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 3, y: 2, z: 0 },
      type: "block",
    },
    b3: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth5" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 3, y: 5, z: 0 },
      type: "lift",
    },
    l1: {
      config: { bottom: 0, top: 11 },
      position: { x: 4, y: 5, z: 11 },
      type: "lift",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
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
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
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
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth3",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
