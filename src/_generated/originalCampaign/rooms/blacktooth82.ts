import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth82",
  items: {
    "deadlyBlock@2,0,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,1": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,5,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,3,0": {
      config: { style: "volcano" },
      position: { x: 3, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0": {
      config: { style: "volcano" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,1": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth81" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@8,2,0": {
      config: { direction: "left", toRoom: "blacktooth83tofreedom" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    "monster@2,2,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "towards",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "monster",
    },
    "monster@5,3,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "towards",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 5, y: 3, z: 0 },
      type: "monster",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
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
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield"],
        times: { y: 2 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,4,0": {
      config: {
        direction: "left",
        tiles: ["shield", "plain"],
        times: { y: 2 },
      },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
