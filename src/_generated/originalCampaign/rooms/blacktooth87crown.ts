import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth87crown",
  items: {
    d: {
      config: { direction: "away", toRoom: "blacktooth86" },
      position: { x: 3, y: 8, z: 1 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 6, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano" },
      position: { x: 6, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano" },
      position: { x: 6, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 6, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 2 },
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
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "towards-analogue",
        which: "emperor",
      },
      position: { x: 6, y: 3, z: 1 },
      type: "monster",
    },
    pi: {
      config: { gives: "crown", planet: "blacktooth" },
      position: { x: 7, y: 3, z: 0 },
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
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["plain", "shield", "plain"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "plain",
          "shield",
          "armour",
          "plain",
          "armour",
          "shield",
          "plain",
          "plain",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
