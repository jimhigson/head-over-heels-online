import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth19",
  items: {
    b: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 2, y: 2, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 4 } },
      position: { x: 2, y: 2, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    co: {
      config: { direction: "away" },
      position: { x: 6, y: 2, z: 3 },
      type: "conveyor",
    },
    d: {
      config: {
        direction: "right",
        meta: { toSubRoom: "left" },
        toRoom: "blacktooth17triple",
      },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth20" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
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
    l: {
      config: { bottom: 0, top: 7 },
      position: { x: 1, y: 2, z: 0 },
      type: "lift",
    },
    pu: { config: {}, position: { x: 3, y: 2, z: 4 }, type: "pushableBlock" },
    pu1: { config: {}, position: { x: 4, y: 2, z: 4 }, type: "pushableBlock" },
    pu2: { config: {}, position: { x: 5, y: 2, z: 4 }, type: "pushableBlock" },
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
