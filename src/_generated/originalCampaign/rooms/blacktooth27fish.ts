import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "blacktooth",
  id: "blacktooth27fish",
  items: {
    "door@0,3,0": {
      config: { direction: "right", toRoom: "blacktooth28" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "blacktooth26" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,3": {
      config: { direction: "away", toRoom: "blacktooth29" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    "pickup@2,3,1": {
      config: { gives: "reincarnation" },
      position: { x: 2, y: 3, z: 1 },
      type: "pickup",
    },
    "portableBlock@0,0,0": {
      config: { style: "drum" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    "pushableBlock@2,3,0": {
      config: { style: "stepStool" },
      position: { x: 2, y: 3, z: 0 },
      type: "pushableBlock",
    },
    scroll: {
      config: { gives: "scroll", page: "reincarnationFish" },
      position: { x: 0, y: 7, z: 0 },
      type: "pickup",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1fRqC7": {
      config: { direction: "towards", tiles: [] },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards", tiles: [] },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
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
        times: { y: 8 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
