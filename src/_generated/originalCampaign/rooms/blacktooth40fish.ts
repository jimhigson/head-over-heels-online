import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth40fish",
  items: {
    "block@2,0,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@3,15,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 3, y: 15, z: 0 },
      type: "block",
    },
    "conveyor@0,1,0": {
      config: { direction: "left" },
      position: { x: 0, y: 1, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,10,0": {
      config: { direction: "away" },
      position: { x: 0, y: 10, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,12,0": {
      config: { direction: "left" },
      position: { x: 0, y: 12, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,14,0": {
      config: { direction: "left", times: { x: 4 } },
      position: { x: 0, y: 14, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,3,0": {
      config: { direction: "left" },
      position: { x: 0, y: 3, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,4,0": {
      config: { direction: "right" },
      position: { x: 0, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,1,0": {
      config: { direction: "right" },
      position: { x: 2, y: 1, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,10,0": {
      config: { direction: "left" },
      position: { x: 2, y: 10, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,4,0": {
      config: { direction: "right" },
      position: { x: 2, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,10,0": {
      config: { direction: "left" },
      position: { x: 4, y: 10, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,4,0": {
      config: { direction: "away", times: { y: 6 } },
      position: { x: 4, y: 4, z: 0 },
      type: "conveyor",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth39" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 6, y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "pickup@3,15,1": {
      config: { gives: "extra-life" },
      position: { x: 3, y: 15, z: 1 },
      type: "pickup",
    },
    "pickup@4,15,1": {
      config: { gives: "shield" },
      position: { x: 4, y: 15, z: 1 },
      type: "pickup",
    },
    "pickup@5,15,1": {
      config: { gives: "reincarnation" },
      position: { x: 5, y: 15, z: 1 },
      type: "pickup",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,16,0": {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
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
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 8 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 6, y: 16 } },
      },
    },
  },
  planet: "blacktooth",
  size: { x: 6, y: 16 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
