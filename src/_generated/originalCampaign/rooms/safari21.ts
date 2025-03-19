import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "safari",
  id: "safari21",
  items: {
    "block@0,7,4": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    "block@1,7,3": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 7, z: 3 },
      type: "block",
    },
    "block@4,7,2": {
      config: { style: "organic" },
      position: { x: 4, y: 7, z: 2 },
      type: "block",
    },
    "block@7,7,1": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "monster@2,5,0": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 2, y: 5, z: 0 },
      type: "monster",
    },
    "monster@3,2,0": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 3, y: 2, z: 0 },
      type: "monster",
    },
    "monster@4,4,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    "monster@5,4,0": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 5, y: 4, z: 0 },
      type: "monster",
    },
    "pickup@0,7,5": {
      config: { gives: "doughnuts" },
      position: { x: 0, y: 7, z: 5 },
      type: "pickup",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
