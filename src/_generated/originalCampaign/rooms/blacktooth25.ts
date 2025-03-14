import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth25",
  items: {
    "conveyor@1,5,1": {
      config: { direction: "right" },
      position: { x: 1, y: 5, z: 1 },
      type: "conveyor",
    },
    "deadlyBlock@0,5,0": {
      config: { style: "volcano" },
      position: { x: 0, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth24" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "lift@5,0,7": {
      config: { bottom: 0, top: 11 },
      position: { x: 5, y: 0, z: 7 },
      type: "lift",
    },
    scroll: {
      config: { gives: "scroll", page: "conveyorBelts" },
      position: { x: 3, y: 5, z: 0 },
      type: "pickup",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
        times: { x: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
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
  roomAbove: "blacktooth26",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
