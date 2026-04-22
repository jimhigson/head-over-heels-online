import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth11",
  items: {
    b: {
      config: { style: "organic", times: { y: 8, z: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 3, y: 0, z: 2 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { y: 8, z: 2 } },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: {
        direction: "right",
        meta: { toSubRoom: "left" },
        toRoom: "blacktooth10",
      },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: {
        direction: "towards",
        meta: { toSubRoom: "right" },
        toRoom: "blacktooth31",
      },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "away", toRoom: "blacktooth32" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    d3: {
      config: { direction: "left", toRoom: "blacktooth12" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "market",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["bars", "bars", "bars"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "away", tiles: ["bars", "bars", "bars"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["bars", "bars", "bars"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w7: {
      config: { direction: "left", tiles: ["bars", "bars", "bars"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
