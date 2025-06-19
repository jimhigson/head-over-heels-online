import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "blacktooth62fish",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "organic", times: { y: 9 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@1,12,0": {
      config: { style: "organic" },
      position: { x: 1, y: 12, z: 0 },
      type: "block",
    },
    "block@5,15,0": {
      config: { style: "organic" },
      position: { x: 5, y: 15, z: 0 },
      type: "block",
    },
    "block@5,9,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 5, y: 9, z: 0 },
      type: "block",
    },
    "conveyor@5,4,0": {
      config: { direction: "away", times: { y: 5 } },
      position: { x: 5, y: 4, z: 0 },
      type: "conveyor",
    },
    "door@0,11,1": {
      config: { direction: "right", toRoom: "blacktooth63" },
      position: { x: 0, y: 7, z: 1 },
      type: "door",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth61" },
      position: { x: 1, y: 0, z: 1 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 6, y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "pickup@5,15,1": {
      config: { gives: "reincarnation" },
      position: { x: 5, y: 15, z: 1 },
      type: "pickup",
    },
    "portableBlock@0,1,0": {
      config: { style: "cube" },
      position: { x: 0, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@0,2,0": {
      config: { style: "cube" },
      position: { x: 0, y: 2, z: 0 },
      type: "portableBlock",
    },
    "spring@0,6,0": {
      config: {},
      position: { x: 0, y: 6, z: 0 },
      type: "spring",
    },
    "spring@4,15,0": {
      config: {},
      position: { x: 4, y: 15, z: 0 },
      type: "spring",
    },
    "spring@5,12,0": {
      config: {},
      position: { x: 5, y: 12, z: 0 },
      type: "spring",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 7 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,13,0": {
      config: { direction: "right", times: { y: 7 } },
      position: { x: 0, y: 9, z: 0 },
      type: "wall",
    },
    "wall@0,16,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
        times: { x: 6 },
      },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: [
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
          "bars",
        ],
        times: { y: 16 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 6 }, to: { x: 6, y: 16 } },
      },
    },
  },
  planet: "jail",
  size: { x: 6, y: 16 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
