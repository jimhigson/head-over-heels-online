import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "egyptus37",
  items: {
    b: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: {
        disappearing: { on: "stand" },
        style: "artificial",
        times: { y: 2 },
      },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "left", toRoom: "egyptus38" },
      position: { x: 2, y: 3, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 2, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
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
      config: { direction: "away", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 2, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus36",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
