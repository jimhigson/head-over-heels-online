import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "blacktooth76",
  items: {
    d: {
      config: { direction: "right", toRoom: "blacktooth68" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth75" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db10: {
      config: { style: "volcano" },
      position: { x: 7, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 2, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano" },
      position: { x: 2, y: 7, z: 1 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "volcano" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    db6: {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db7: {
      config: { style: "volcano" },
      position: { x: 5, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    db8: {
      config: { style: "volcano", times: { z: 2 } },
      position: { x: 6, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db9: {
      config: { style: "volcano" },
      position: { x: 6, y: 5, z: 0 },
      type: "deadlyBlock",
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
    m: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "right",
        which: "turtle",
      },
      position: { x: 2, y: 7, z: 0 },
      type: "monster",
    },
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
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 5, y: 8, z: 0 },
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
