import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth82",
  items: {
    d: {
      config: { direction: "right", toRoom: "blacktooth81" },
      position: { x: 0, y: 4, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth83tofreedom" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano" },
      position: { x: 3, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "volcano" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db6: {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db7: {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 1 },
      type: "deadlyBlock",
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
    m: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "towards",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "towards",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 5, y: 3, z: 0 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 4 } },
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["plain", "shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["shield", "plain"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
