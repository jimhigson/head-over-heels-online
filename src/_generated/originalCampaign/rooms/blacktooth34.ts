import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth34",
  items: {
    b: {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 2, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "blacktooth35",
      },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 6 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    pi: {
      config: { gives: "scroll", page: "springs", source: "manual" },
      position: { x: 2, y: 7, z: 1 },
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
      config: { direction: "away", tiles: ["bars", "bars", "bars"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["bars", "bars", "bars"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth33",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
