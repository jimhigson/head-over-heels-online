import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth75",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth76" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth74" },
      position: { x: 2, y: 8, z: 2 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 1, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano", times: { y: 3 } },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 1, y: 3, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["plain", "shield"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["shield", "plain"] },
      position: { x: 4, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
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
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
