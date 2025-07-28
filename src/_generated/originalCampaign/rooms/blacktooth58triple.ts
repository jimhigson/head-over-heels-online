import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  id: "blacktooth58triple",
  items: {
    "block@0,11,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 0, y: 11, z: 0 },
      type: "block",
    },
    "block@0,13,0": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 13, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@13,3,0": {
      config: { disappearing: { on: "stand" }, style: "organic" },
      position: { x: 13, y: 3, z: 0 },
      type: "block",
    },
    "block@2,0,0": {
      config: { style: "organic", times: { x: 5 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "block@8,0,0": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 8, y: 0, z: 0 },
      type: "block",
    },
    "block@8,5,0": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 8, y: 5, z: 0 },
      type: "block",
    },
    "conveyor@5,5,0": {
      config: { direction: "away", times: { y: 2 } },
      position: { x: 5, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@6,5,0": {
      config: { direction: "left" },
      position: { x: 6, y: 5, z: 0 },
      type: "conveyor",
    },
    "deadlyBlock@7,0,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth57" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "door@2,14,2": {
      config: { direction: "away", toRoom: "blacktooth59" },
      position: { x: 2, y: 14, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: { floorType: "deadly", times: { x: 14, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    floorR: {
      config: { floorType: "deadly", times: { x: 6, y: 8 } },
      position: { x: 0, y: 6, z: 0 },
      type: "floor",
    },
    "monster@4,9,1": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 4, y: 9, z: 1 },
      type: "monster",
    },
    "monster@7,3,1": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 7, y: 3, z: 1 },
      type: "monster",
    },
    "pickup@13,5,1": {
      config: { gives: "fast" },
      position: { x: 13, y: 5, z: 1 },
      type: "pickup",
    },
    "spikes@0,9,0": {
      config: { style: "organic" },
      position: { x: 0, y: 9, z: 0 },
      type: "block",
    },
    "spikes@0,9,1": {
      config: {},
      position: { x: 0, y: 9, z: 1 },
      type: "spikes",
    },
    "spikes@4,8,0": {
      config: { times: { y: 2 } },
      position: { x: 4, y: 8, z: 0 },
      type: "spikes",
    },
    "wall(away)@6,6,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall(left)@6,6,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 14 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,14,0": {
      config: { direction: "away", tiles: ["bars", "bars"] },
      position: { x: 0, y: 14, z: 0 },
      type: "wall",
    },
    "wall@14,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 14, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 10 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,14,0": {
      config: { direction: "away", tiles: ["bars", "bars"] },
      position: { x: 4, y: 14, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 1, y: 0 },
        physicalPosition: { from: { x: 6, y: 0 }, to: { x: 14, y: 6 } },
      },
      middle: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 6, y: 6 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 6 }, to: { x: 6, y: 14 } },
      },
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
