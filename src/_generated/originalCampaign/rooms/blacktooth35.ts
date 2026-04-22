import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "blacktooth35",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 10, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic" },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    b4: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic" },
      position: { x: 1, y: 8, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "organic" },
      position: { x: 3, y: 12, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth34" },
      position: { x: 1, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth36" },
      position: { x: 4, y: 11, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 4, y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    sg: { config: {}, position: { x: 1, y: 2, z: 0 }, type: "spring" },
    sg1: { config: {}, position: { x: 1, y: 4, z: 0 }, type: "spring" },
    w: {
      config: { direction: "right", times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["plain", "shield", "shield", "plain"],
      },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
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
          "shield",
          "plain",
        ],
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 4, y: 13, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 4, y: 8 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 4, y: 16 } },
      },
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
