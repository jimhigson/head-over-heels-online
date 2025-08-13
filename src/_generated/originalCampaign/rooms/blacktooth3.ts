import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth3",
  items: {
    "block@3,5,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 5, z: 0 },
      type: "block",
    },
    "door@3,6,2": {
      config: { direction: "away", toRoom: "blacktooth2" },
      position: { x: 3, y: 6, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 8, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    scroll: {
      config: { gives: "scroll", page: "hintsAndTips", source: "manual" },
      position: { x: 7, y: 5, z: 1 },
      type: "pickup",
    },
    scrollBlock: {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: { direction: "away", tiles: ["bars", "bars", "bars"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,6,0": {
      config: { direction: "away", tiles: ["bars", "bars", "bars"] },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth4",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
