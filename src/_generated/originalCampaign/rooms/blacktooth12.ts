import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth12",
  items: {
    "block@0,0,3": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "block@4,0,3": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "block@4,1,3": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 4, y: 1, z: 3 },
      type: "block",
    },
    "block@7,0,3": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    "door@0,0,5": {
      config: { direction: "right", toRoom: "blacktooth11" },
      position: { x: 0, y: 0, z: 5 },
      type: "door",
    },
    "door@8,0,5": {
      config: { direction: "left", toRoom: "blacktooth13" },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 8, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
