import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth79fish",
  items: {
    b: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "reincarnation" },
      position: { x: 7, y: 0, z: 1 },
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomBelow: "blacktooth78",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
