import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "egyptus24",
  items: {
    d: {
      config: { direction: "right", toRoom: "egyptus25" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "egyptus23" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "volcano" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    db4: {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    db5: {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    db6: {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    db7: {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
        ],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
