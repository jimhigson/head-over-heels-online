import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "egyptus37",
  items: {
    "block@0,0,0": {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@1,3,0": {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 1, y: 3, z: 0 },
      type: "block",
    },
    "block@1,4,0": {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "door@2,3,2": {
      config: { direction: "left", toRoom: "egyptus38" },
      position: { x: 2, y: 3, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 2, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
    "wall@2,5,0": {
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
