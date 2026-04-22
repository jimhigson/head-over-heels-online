import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth31",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic" },
      position: { x: 5, y: 2, z: 1 },
      type: "block",
    },
    d: {
      config: { direction: "away", toRoom: "blacktooth11" },
      position: { x: 2, y: 12, z: 3 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth30" },
      position: { x: 6, y: 2, z: 3 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 0, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    db10: {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db11: {
      config: { style: "volcano" },
      position: { x: 5, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    db12: {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db13: {
      config: { style: "volcano" },
      position: { x: 5, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "volcano" },
      position: { x: 1, y: 11, z: 0 },
      type: "deadlyBlock",
    },
    db6: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    db7: {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db8: {
      config: { style: "volcano" },
      position: { x: 4, y: 11, z: 0 },
      type: "deadlyBlock",
    },
    db9: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 12 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 2, y: 8, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "drum" },
      position: { x: 3, y: 9, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["plain", "shield"] },
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["shield", "plain"] },
      position: { x: 4, y: 12, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain", "shield"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "shield",
          "plain",
          "plain",
          "armour",
          "shield",
          "shield",
          "armour",
          "plain",
        ],
      },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 6 }, to: { x: 6, y: 12 } },
      },
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
