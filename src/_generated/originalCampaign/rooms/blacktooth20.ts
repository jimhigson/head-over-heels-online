import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth20",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth18" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "blacktooth19" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,6,0": {
      config: { direction: "away", toRoom: "blacktooth21fish" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield"],
        times: { x: 2 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: {
        direction: "away",
        tiles: ["shield", "plain"],
        times: { x: 2 },
      },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
