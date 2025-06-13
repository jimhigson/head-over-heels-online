import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "egyptus36",
  items: {
    "block@1,0,0": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 2, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "lift@0,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 0, z: 0 },
      type: "lift",
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
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { x: 2 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@2,0,0": {
      config: {
        direction: "left",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
        ],
        times: { y: 8 },
      },
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus37",
  roomBelow: "egyptus35",
  size: { x: 2, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
