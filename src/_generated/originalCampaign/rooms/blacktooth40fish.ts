import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth40fish",
  items: {
    b: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 3, y: 15, z: 0 },
      type: "block",
    },
    co: {
      config: { direction: "left" },
      position: { x: 0, y: 1, z: 0 },
      type: "conveyor",
    },
    co1: {
      config: { direction: "away" },
      position: { x: 0, y: 10, z: 0 },
      type: "conveyor",
    },
    co10: {
      config: { direction: "away", times: { y: 6 } },
      position: { x: 4, y: 4, z: 0 },
      type: "conveyor",
    },
    co2: {
      config: { direction: "left" },
      position: { x: 0, y: 12, z: 0 },
      type: "conveyor",
    },
    co3: {
      config: { direction: "left", times: { x: 4 } },
      position: { x: 0, y: 14, z: 0 },
      type: "conveyor",
    },
    co4: {
      config: { direction: "left" },
      position: { x: 0, y: 3, z: 0 },
      type: "conveyor",
    },
    co5: {
      config: { direction: "right" },
      position: { x: 0, y: 4, z: 0 },
      type: "conveyor",
    },
    co6: {
      config: { direction: "right" },
      position: { x: 2, y: 1, z: 0 },
      type: "conveyor",
    },
    co7: {
      config: { direction: "left" },
      position: { x: 2, y: 10, z: 0 },
      type: "conveyor",
    },
    co8: {
      config: { direction: "right" },
      position: { x: 2, y: 4, z: 0 },
      type: "conveyor",
    },
    co9: {
      config: { direction: "left" },
      position: { x: 4, y: 10, z: 0 },
      type: "conveyor",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth39" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 6, y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: { gives: "extra-life" },
      position: { x: 3, y: 15, z: 1 },
      type: "pickup",
    },
    pi1: {
      config: { gives: "shield" },
      position: { x: 4, y: 15, z: 1 },
      type: "pickup",
    },
    pi2: {
      config: { gives: "reincarnation" },
      position: { x: 5, y: 15, z: 1 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
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
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 8 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 6, y: 16 } },
      },
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
