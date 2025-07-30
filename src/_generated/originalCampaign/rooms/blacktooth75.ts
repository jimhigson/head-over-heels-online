import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth75",
  items: {
    "deadlyBlock@0,1,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,4,0": {
      config: { style: "volcano" },
      position: { x: 1, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0": {
      config: { style: "volcano", times: { y: 2 } },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0": {
      config: { style: "volcano", times: { y: 3 } },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth76" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "door@2,8,2": {
      config: { direction: "away", toRoom: "blacktooth74" },
      position: { x: 2, y: 8, z: 2 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@1,3,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 1, y: 3, z: 0 },
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
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["plain", "shield"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,8,0": {
      config: { direction: "away", tiles: ["shield", "plain"] },
      position: { x: 4, y: 8, z: 0 },
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
        ],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
