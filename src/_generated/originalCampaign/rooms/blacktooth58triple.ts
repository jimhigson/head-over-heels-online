import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "deadly",
  id: "blacktooth58triple",
  items: {
    "block@0,11,0": {
      config: { disappearing: "onStand", style: "organic" },
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
      config: { disappearing: "onStand", style: "organic" },
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
    "deadlyBlock@0,9,0": {
      config: { style: "spikes", times: { z: 2 } },
      position: { x: 0, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,8,0": {
      config: { style: "spikes", times: { y: 2 } },
      position: { x: 4, y: 8, z: 0 },
      type: "deadlyBlock",
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
    "monster@4,9,1": {
      config: {
        activated: true,
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 4, y: 9, z: 1 },
      type: "monster",
    },
    "monster@7,3,1": {
      config: {
        activated: true,
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
    "wall@0,0,0:3gbr1": {
      config: { direction: "right", tiles: [], times: { y: 14 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,14,0": {
      config: { direction: "away", tiles: ["bars", "bars"], times: { x: 2 } },
      position: { x: 0, y: 14, z: 0 },
      type: "wall",
    },
    "wall@14,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
        times: { y: 6 },
      },
      position: { x: 14, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 10 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,14,0": {
      config: { direction: "away", tiles: ["bars", "bars"], times: { x: 2 } },
      position: { x: 4, y: 14, z: 0 },
      type: "wall",
    },
    "wall@6,6,0:13XOm9": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
        times: { x: 8 },
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,6,0:2e3jis": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
        times: { y: 8 },
      },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  size: { x: 14, y: 14 },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
