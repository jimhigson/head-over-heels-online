import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "safari15",
  items: {
    "deadlyBlock@3,2,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,6,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "safari13" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,16,0": {
      config: { direction: "away", toRoom: "safari16" },
      position: { x: 1, y: 16, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 4, y: 16 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@0,6,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 0, y: 6, z: 0 },
      type: "monster",
    },
    "monster@1,4,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 1, y: 4, z: 0 },
      type: "monster",
    },
    "monster@2,12,1": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 12, z: 1 },
      type: "monster",
    },
    "monster@2,2,0": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "monster",
    },
    monsterpen: {
      config: { axis: "x" },
      position: { x: 1, y: 9, z: 0 },
      type: "barrier",
    },
    "spikes@0,13,0": {
      config: {},
      position: { x: 0, y: 13, z: 0 },
      type: "spikes",
    },
    "spikes@0,9,0": {
      config: {},
      position: { x: 0, y: 9, z: 0 },
      type: "spikes",
    },
    "spikes@1,11,0": {
      config: {},
      position: { x: 1, y: 11, z: 0 },
      type: "spikes",
    },
    "spikes@2,12,0": {
      config: {},
      position: { x: 2, y: 12, z: 0 },
      type: "spikes",
    },
    "spikes@2,9,0": {
      config: {},
      position: { x: 2, y: 9, z: 0 },
      type: "spikes",
    },
    "spikes@3,10,0": {
      config: {},
      position: { x: 3, y: 10, z: 0 },
      type: "spikes",
    },
    "spikes@3,14,0": {
      config: {},
      position: { x: 3, y: 14, z: 0 },
      type: "spikes",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,16,0": {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,16,0": {
      config: { direction: "away", tiles: ["wall"] },
      position: { x: 3, y: 16, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
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
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
        times: { y: 16 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 4, y: 8 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 4, y: 16 } },
      },
    },
  },
  planet: "safari",
  size: { x: 4, y: 16 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
