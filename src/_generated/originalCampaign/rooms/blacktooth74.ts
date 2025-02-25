import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth74",
  items: {
    "block@0,2,4": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 2, z: 4 },
      type: "block",
    },
    "block@1,3,4": {
      config: { style: "organic", times: { x: 5 } },
      position: { x: 1, y: 3, z: 4 },
      type: "block",
    },
    "door@0,2,5": {
      config: { direction: "right", toRoom: "blacktooth73" },
      position: { x: 0, y: 2, z: 5 },
      type: "door",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth75" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    "monster@3,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-xy4",
        which: "monkey",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    "pickup@5,3,5": {
      config: { gives: "doughnuts" },
      position: { x: 5, y: 3, z: 5 },
      type: "pickup",
    },
    "portableBlock@0,2,0": {
      config: { style: "cube" },
      position: { x: 0, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,5,0": {
      config: { style: "cube" },
      position: { x: 4, y: 5, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@5,0,0": {
      config: { style: "cube" },
      position: { x: 5, y: 0, z: 0 },
      type: "portableBlock",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
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
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
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
  size: { x: 6, y: 6 },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
