import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth59",
  items: {
    b: {
      config: { style: "book", times: { x: 2 } },
      position: { x: 0, y: 1, z: 2 },
      type: "block",
    },
    b1: {
      config: { style: "book", times: { x: 2, z: 2 } },
      position: { x: 0, y: 1, z: 4 },
      type: "block",
    },
    b2: {
      config: { style: "book" },
      position: { x: 0, y: 2, z: 1 },
      type: "block",
    },
    b3: {
      config: { style: "book" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 1, y: 0, z: 3 },
      type: "block",
    },
    b5: {
      config: { style: "book", times: { z: 2 } },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "book" },
      position: { x: 1, y: 1, z: 3 },
      type: "block",
    },
    d: {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "blacktooth58triple",
      },
      position: { x: 5, y: 0, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth60" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "left", toRoom: "blacktooth63" },
      position: { x: 8, y: 5, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 0, y: 1, z: 6 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 5 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["bars", "bars", "bars"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 1 } },
      position: { x: 7, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["bars", "bars", "bars"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["bars"] },
      position: { x: 8, y: 7, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
