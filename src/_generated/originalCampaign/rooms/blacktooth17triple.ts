import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth17triple",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 1, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth16" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth19" },
      position: { x: 12, y: 2, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "blacktooth18" },
      position: { x: 6, y: 8, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 1, y: 8, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 10, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db10: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 8, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    db6: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db7: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 4, y: 8, z: 0 },
      type: "deadlyBlock",
    },
    db8: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 7, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db9: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 8, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 12, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    f1: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 3, y: 0, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "shield" },
      position: { x: 3, y: 9, z: 0 },
      type: "pickup",
    },
    w: {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "left", tiles: ["plain", "shield"] },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 12 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 0, y: 12, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["plain", "shield"] },
      position: { x: 12, y: 0, z: 0 },
      type: "wall",
    },
    w7: {
      config: { direction: "left", tiles: ["shield", "plain"] },
      position: { x: 12, y: 4, z: 0 },
      type: "wall",
    },
    w8: {
      config: { direction: "left", tiles: ["shield", "plain"] },
      position: { x: 6, y: 10, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 12, y: 6 } },
      },
      middle: {
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
