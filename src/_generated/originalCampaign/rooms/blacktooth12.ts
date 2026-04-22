import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth12",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    b1: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { y: 2 },
      },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth11" },
      position: { x: 0, y: 0, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth13" },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
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
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
